'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import {
  ChevronLeft, Download, Check, X, ChevronRight,
  Layers, Package, AlertCircle,
} from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import { Spinner } from '@/components/ui'
import { renderTemplate } from '@/components/templates/TemplateRenderer'
import { useListingStore } from '@/lib/store/listingStore'
import { TEMPLATES, TEMPLATE_GROUPS } from '@/lib/templates/registry'
import { exportTemplate } from '@/lib/utils/export'
import { TemplateDefinition } from '@/types'
import { cn, generateId } from '@/lib/utils/helpers'

type ExportFmt = 'png' | 'jpg' | 'pdf'

interface ActivePreview {
  templateId: string
  variant: string
}

const PREVIEW_MAX_W = 520

export default function GeneratePage({ params }: { params: { id: string } }) {
  const { id } = params
  const { getListing, addExport } = useListingStore()
  const listing = getListing(id)

  // ── All hooks declared before any early return ──────────────────────────
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set(['just-listed-square|dark-overlay'])
  )
  const [active, setActive] = useState<ActivePreview>({
    templateId: 'just-listed-square',
    variant: 'dark-overlay',
  })
  const [carouselSlide, setCarouselSlide] = useState(0)
  const [fmt, setFmt] = useState<ExportFmt>('jpg')
  const [exporting, setExporting] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState<Set<string>>(new Set())

  const handleExport = useCallback(async (templateId: string, variant: string, slideIdx = 0) => {
    if (!listing) return
    const key = `${templateId}|${variant}`
    const elemId = templateId === 'features-carousel'
      ? `export-canvas-${templateId}-${variant}-${slideIdx}`
      : `export-canvas-${templateId}-${variant}`

    setExporting(key)
    setProgress(0)

    try {
      const tpl = TEMPLATES.find(t => t.id === templateId)
      const { filename } = await exportTemplate({
        listing,
        templateId,
        templateName: tpl?.name || templateId,
        format: fmt,
        elementId: elemId,
        onProgress: setProgress,
      })

      addExport(id, {
        id: generateId(),
        templateId,
        templateName: tpl?.name || templateId,
        format: fmt,
        filename,
        createdAt: new Date().toISOString(),
      })

      setDone(prev => new Set([...prev, key]))
      setTimeout(() => setDone(prev => { const n = new Set(prev); n.delete(key); return n }), 3000)
    } catch (e) {
      console.error('Export failed:', e)
      alert('Export failed. Make sure you have photos uploaded for best results.')
    }

    setExporting(null)
    setProgress(0)
  }, [listing, fmt, id, addExport])

  // v1 behavior: carousel batch export always exports slide 0 (the intro slide).
  // To export a specific slide, use the single-export button with that slide active.
  const handleExportAll = useCallback(async () => {
    for (const key of Array.from(selectedKeys)) {
      const [tId, vId] = key.split('|')
      await handleExport(tId, vId, 0)
    }
  }, [selectedKeys, handleExport])

  // ── Early return — safe, all hooks are above ────────────────────────────
  if (!listing) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-3">
            <AlertCircle size={32} className="text-gray-200 mx-auto" />
            <p className="text-sm text-gray-500">Listing not found.</p>
            <Link href="/listings" className="btn-secondary btn-sm">Back to listings</Link>
          </div>
        </div>
      </AppShell>
    )
  }

  // ── Derived values — listing is guaranteed non-null below this line ──────
  const hasPhotos = listing.photos.length > 0
  const activeKey = `${active.templateId}|${active.variant}`
  const activeTpl = TEMPLATES.find(t => t.id === active.templateId)
  const isCarousel = active.templateId === 'features-carousel'
  const totalSlides = isCarousel ? Math.min(listing.features.length, 4) + 1 : 1

  const exportElemId = isCarousel
    ? `export-canvas-${active.templateId}-${active.variant}-${carouselSlide}`
    : `export-canvas-${active.templateId}-${active.variant}`

  const toggleKey = (tId: string, vId: string) => {
    const k = `${tId}|${vId}`
    setSelectedKeys(prev => {
      const n = new Set(prev)
      n.has(k) ? n.delete(k) : n.add(k)
      return n
    })
  }

  const tplW = activeTpl?.size.width  || 1080
  const tplH = activeTpl?.size.height || 1080
  const previewScale = Math.min(PREVIEW_MAX_W / tplW, 480 / tplH)
  const previewW = Math.round(tplW * previewScale)
  const previewH = Math.round(tplH * previewScale)

  return (
    <AppShell>
      <div className="flex flex-col h-full overflow-hidden">

        {/* Topbar */}
        <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Link href={`/listings/${id}`} className="btn-ghost btn-sm text-gray-400">
              <ChevronLeft size={14} /> Editor
            </Link>
            <div className="w-px h-4 bg-gray-200" />
            <div className="min-w-0">
              <span className="text-sm font-semibold text-brand-navy truncate">{listing.address}</span>
              <span className="text-xs text-gray-400 ml-2">· Generate</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-surface-1 rounded-lg border border-gray-200 p-0.5">
              {(['jpg', 'png', 'pdf'] as ExportFmt[]).map(f => (
                <button
                  key={f}
                  onClick={() => setFmt(f)}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide transition-all',
                    fmt === f ? 'bg-brand-navy text-white shadow-sm' : 'text-gray-400 hover:text-gray-700'
                  )}
                >{f}</button>
              ))}
            </div>
            <button
              onClick={handleExportAll}
              disabled={selectedKeys.size === 0 || !!exporting}
              className="btn-gold btn-sm"
            >
              {exporting ? <Spinner size={13} /> : <Package size={13} />}
              Export {selectedKeys.size} selected
            </button>
          </div>
        </div>

        {/* No photos warning */}
        {!hasPhotos && (
          <div className="px-6 py-2 bg-amber-50 border-b border-amber-100 flex items-center gap-2 flex-shrink-0">
            <AlertCircle size={13} className="text-amber-500 flex-shrink-0" />
            <p className="text-xs text-amber-700">
              No photos uploaded — templates will use a solid background.{' '}
              <Link href={`/listings/${id}`} className="underline font-semibold">Upload photos →</Link>
            </p>
          </div>
        )}

        <div className="flex flex-1 overflow-hidden">

          {/* Left: Template picker */}
          <aside className="w-56 flex-shrink-0 bg-surface-1 border-r border-gray-100 overflow-y-auto py-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-3">
              Templates
            </p>
            {TEMPLATE_GROUPS.map(group => {
              const groupTpls = TEMPLATES.filter(t =>
                (group.categories as readonly string[]).includes(t.category)
              )
              if (groupTpls.length === 0) return null
              return (
                <div key={group.label} className="mb-3">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-1">
                    {group.label}
                  </p>
                  {groupTpls.map(tpl => (
                    <TemplatePickerItem
                      key={tpl.id}
                      template={tpl}
                      activeVariant={active.templateId === tpl.id ? active.variant : null}
                      selectedVariants={Array.from(selectedKeys)
                        .filter(k => k.startsWith(tpl.id + '|'))
                        .map(k => k.split('|')[1])}
                      onSelect={(v) => { setActive({ templateId: tpl.id, variant: v }); setCarouselSlide(0) }}
                      onToggle={(v) => toggleKey(tpl.id, v)}
                    />
                  ))}
                </div>
              )
            })}
          </aside>

          {/* Center: Live preview */}
          <div className="flex-1 flex flex-col items-center overflow-y-auto bg-[#f0f2f5] py-8 px-6 gap-5">
            <div className="flex items-center justify-between w-full" style={{ maxWidth: previewW + 40 }}>
              <div>
                <h3 className="text-sm font-semibold text-brand-navy">{activeTpl?.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{activeTpl?.size.label} · {active.variant}</p>
              </div>
              <div className="flex items-center gap-2">
                {isCarousel && (
                  <div className="flex items-center bg-white rounded-lg border border-gray-200 px-2 py-1 gap-1.5">
                    <button
                      onClick={() => setCarouselSlide(s => Math.max(0, s - 1))}
                      disabled={carouselSlide === 0}
                      className="text-gray-400 hover:text-gray-700 disabled:opacity-30"
                    >
                      <ChevronLeft size={13} />
                    </button>
                    <span className="text-xs text-gray-600 font-medium min-w-[60px] text-center">
                      Slide {carouselSlide + 1}/{totalSlides}
                    </span>
                    <button
                      onClick={() => setCarouselSlide(s => Math.min(totalSlides - 1, s + 1))}
                      disabled={carouselSlide >= totalSlides - 1}
                      className="text-gray-400 hover:text-gray-700 disabled:opacity-30"
                    >
                      <ChevronRight size={13} />
                    </button>
                  </div>
                )}
                <button
                  onClick={() => handleExport(active.templateId, active.variant, carouselSlide)}
                  disabled={!!exporting}
                  className="btn-primary btn-sm"
                >
                  {exporting === activeKey
                    ? <Spinner size={12} />
                    : done.has(activeKey)
                      ? <><Check size={12} /> Saved!</>
                      : <><Download size={12} /> Export {fmt.toUpperCase()}</>
                  }
                </button>
              </div>
            </div>

            {/* Scaled visible preview */}
            <div
              className="rounded-xl overflow-hidden shadow-card-xl flex-shrink-0"
              style={{ width: previewW, height: previewH, background: '#fff' }}
            >
              <div style={{ transform: `scale(${previewScale})`, transformOrigin: 'top left', width: tplW, height: tplH }}>
                {renderTemplate({
                  templateId: active.templateId,
                  variant: active.variant,
                  listing,
                  scale: 1,
                  id: `preview-vis-${active.templateId}-${active.variant}`,
                  slideIndex: carouselSlide,
                })}
              </div>
            </div>

            {exporting === activeKey && (
              <div className="w-full" style={{ maxWidth: previewW }}>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Rendering…</span><span>{progress}%</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-blue rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            <p className="text-xs text-gray-400">
              {activeTpl?.size.label} · {activeTpl?.category} · {activeTpl?.variants.length} variant{activeTpl?.variants.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Right: Queue + listing metadata */}
          <aside className="w-56 flex-shrink-0 border-l border-gray-100 bg-white overflow-y-auto py-4 px-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Queue</p>
            {selectedKeys.size === 0 ? (
              <p className="text-xs text-gray-400">Check templates in the left panel to queue for export.</p>
            ) : (
              <div className="space-y-1.5 mb-4">
                {Array.from(selectedKeys).map(key => {
                  const [tId, vId] = key.split('|')
                  const tpl = TEMPLATES.find(t => t.id === tId)
                  const isExp = exporting === key
                  const isDone = done.has(key)
                  return (
                    <div key={key} className={cn(
                      'flex items-center gap-2 px-2.5 py-2 rounded-lg',
                      isDone ? 'bg-emerald-50' : 'bg-surface-1'
                    )}>
                      <div className={cn(
                        'w-5 h-5 rounded flex items-center justify-center flex-shrink-0',
                        isDone ? 'bg-emerald-500' : isExp ? 'bg-brand-blue' : 'bg-brand-navy/10'
                      )}>
                        {isDone
                          ? <Check size={10} className="text-white" />
                          : isExp
                            ? <Spinner size={9} className="text-white" />
                            : <Layers size={9} className="text-brand-navy" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-gray-800 truncate">{tpl?.name}</p>
                        <p className="text-[10px] text-gray-400 truncate">{vId}</p>
                      </div>
                      <button onClick={() => toggleKey(tId, vId)} className="text-gray-300 hover:text-gray-500">
                        <X size={10} />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}

            <div className="pt-4 border-t border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Listing</p>
              {[
                ['Address', listing.address],
                ['Price',   listing.price],
                ['Beds',    listing.beds],
                ['Baths',   listing.baths],
                ['Sq Ft',   listing.sqft],
                ['Photos',  String(listing.photos.length)],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-[10px] text-gray-400">{l}</span>
                  <span className="text-[10px] font-semibold text-gray-700 truncate max-w-[100px]">{v || '—'}</span>
                </div>
              ))}
            </div>

            {listing.exports.length > 0 && (
              <div className="pt-4 border-t border-gray-100 mt-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Past Exports</p>
                <div className="space-y-1">
                  {listing.exports.slice(0, 5).map(exp => (
                    <p key={exp.id} className="text-[10px] text-gray-400 truncate" title={exp.filename}>
                      {exp.filename}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Hidden off-screen canvases for export at full 1:1 resolution */}
        <div
          aria-hidden="true"
          style={{ position: 'fixed', top: '-99999px', left: '-99999px', pointerEvents: 'none', zIndex: -1 }}
        >
          {renderTemplate({
            templateId: active.templateId,
            variant: active.variant,
            listing,
            scale: 1,
            id: exportElemId,
            slideIndex: carouselSlide,
          })}

          {Array.from(selectedKeys)
            .filter(k => k !== activeKey)
            .map(key => {
              const [tId, vId] = key.split('|')
              const elemId = `export-canvas-${tId}-${vId}`
              return (
                <div key={key}>
                  {renderTemplate({ templateId: tId, variant: vId, listing, scale: 1, id: elemId })}
                </div>
              )
            })}
        </div>
      </div>
    </AppShell>
  )
}

// ── Template picker item ──────────────────────────────────────────────────
function TemplatePickerItem({
  template, activeVariant, selectedVariants, onSelect, onToggle,
}: {
  template: TemplateDefinition
  activeVariant: string | null
  selectedVariants: string[]
  onSelect: (v: string) => void
  onToggle: (v: string) => void
}) {
  const isActive = activeVariant !== null
  const selectedCount = selectedVariants.length
  const firstVariant = template.variants[0].id

  return (
    <div className="px-2 mb-0.5">
      <button
        onClick={() => onSelect(activeVariant || firstVariant)}
        className={cn(
          'flex items-center gap-2 w-full px-2.5 py-2 rounded-lg text-left transition-all',
          isActive ? 'bg-brand-navy text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        )}
      >
        <div className={cn(
          'w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-[8px] font-bold',
          isActive ? 'bg-brand-gold/30 text-brand-gold' : 'bg-gray-100 text-gray-400'
        )}>
          {template.size.aspect === '9:16' ? '9:16' : template.size.aspect === 'letter' ? 'A4' : '1:1'}
        </div>
        <span className="text-xs font-medium flex-1 truncate">{template.name}</span>
        {selectedCount > 0 && (
          <span className="w-4 h-4 rounded-full bg-brand-gold text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0">
            {selectedCount}
          </span>
        )}
      </button>

      {isActive && (
        <div className="ml-3 mt-0.5 space-y-0.5 pb-1">
          {template.variants.map(v => {
            const isSel = selectedVariants.includes(v.id)
            const isActivV = activeVariant === v.id
            return (
              <div key={v.id} className="flex items-center gap-1.5">
                <input
                  type="checkbox"
                  checked={isSel}
                  onChange={() => onToggle(v.id)}
                  onClick={e => e.stopPropagation()}
                  className="w-3 h-3 rounded border-gray-300 text-brand-blue flex-shrink-0"
                />
                <button
                  onClick={e => { e.stopPropagation(); onSelect(v.id) }}
                  className={cn(
                    'text-[11px] flex-1 text-left px-1.5 py-1 rounded transition-colors',
                    isActivV ? 'font-bold text-brand-blue' : 'text-gray-500 hover:text-gray-800'
                  )}
                >
                  {v.name}
                </button>
              </div>
            )
          })}
        </div>
      )}

      {!isActive && template.variants.length === 1 && (
        <div className="flex items-center gap-1.5 ml-2.5 pb-1">
          <input
            type="checkbox"
            checked={selectedVariants.includes(firstVariant)}
            onChange={() => onToggle(firstVariant)}
            className="w-3 h-3 rounded border-gray-300 text-brand-blue"
          />
          <span className="text-[10px] text-gray-400">Add to queue</span>
        </div>
      )}
    </div>
  )
}