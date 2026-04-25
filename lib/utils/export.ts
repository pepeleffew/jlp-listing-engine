'use client'

import { Listing } from '@/types'
import { listingSlug, downloadBlob } from '@/lib/utils/helpers'
import { generateId } from '@/lib/utils/helpers'

export type ExportFormat = 'png' | 'jpg' | 'pdf'

export interface ExportOptions {
  listing: Listing
  templateId: string
  templateName: string
  format: ExportFormat
  elementId: string       // DOM id of the preview element to capture
  scale?: number          // pixel ratio, default 2 for retina
  quality?: number        // jpg quality 0-1
  onProgress?: (pct: number) => void
}

// ── Core export function ──────────────────────────────────────────────────
export async function exportTemplate({
  listing,
  templateId,
  templateName,
  format,
  elementId,
  scale = 2,
  quality = 0.95,
  onProgress,
}: ExportOptions): Promise<{ filename: string; blob: Blob }> {
  const el = document.getElementById(elementId)
  if (!el) throw new Error(`Element #${elementId} not found`)

  onProgress?.(10)

  // Dynamic import to keep SSR clean
  const html2canvas = (await import('html2canvas')).default
  onProgress?.(30)

  const canvas = await html2canvas(el, {
    scale,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false,
    imageTimeout: 15000,
  })
  onProgress?.(70)

  const slug = listingSlug(listing)
  const tplSlug = templateId.replace(/-/g, '-')
  const base = `${slug}-${tplSlug}`

  let blob: Blob
  let filename: string

  if (format === 'pdf') {
    const { jsPDF } = await import('jspdf')
    const imgData = canvas.toDataURL('image/jpeg', quality)
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [canvas.width / scale, canvas.height / scale],
    })
    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width / scale, canvas.height / scale)
    blob = pdf.output('blob')
    filename = `${base}.pdf`
  } else {
    const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png'
    blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Canvas toBlob failed'))), mimeType, quality)
    })
    filename = `${base}.${format}`
  }

  onProgress?.(90)
  downloadBlob(blob, filename)
  onProgress?.(100)

  return { filename, blob }
}

// ── Batch ZIP export ────────────────────────────────────────────────────────
export async function exportAllAsZip(
  listing: Listing,
  elementIds: { elementId: string; templateId: string; templateName: string }[],
  format: ExportFormat = 'jpg',
  onProgress?: (label: string, pct: number) => void
): Promise<void> {
  const JSZip = (await import('jszip')).default
  const html2canvas = (await import('html2canvas')).default

  const zip = new JSZip()
  const folder = zip.folder(listingSlug(listing)) || zip

  for (let i = 0; i < elementIds.length; i++) {
    const { elementId, templateId, templateName } = elementIds[i]
    const el = document.getElementById(elementId)
    if (!el) continue

    onProgress?.(templateName, Math.round((i / elementIds.length) * 90))

    const canvas = await html2canvas(el, {
      scale: 2, useCORS: true, allowTaint: true, backgroundColor: '#ffffff', logging: false,
    })

    const slug = listingSlug(listing)
    const tplSlug = templateId.replace(/-/g, '-')
    const filename = `${slug}-${tplSlug}.${format}`

    const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png'
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Blob failed'))), mimeType, 0.95)
    })

    folder.file(filename, blob)
  }

  onProgress?.('Zipping…', 95)
  const zipBlob = await zip.generateAsync({ type: 'blob' })
  downloadBlob(zipBlob, `${listingSlug(listing)}-assets.zip`)
  onProgress?.('Done', 100)
}
