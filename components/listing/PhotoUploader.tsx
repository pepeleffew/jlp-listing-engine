'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Star, GripVertical, Image as ImageIcon, AlertCircle } from 'lucide-react'
import { ListingPhoto } from '@/types'
import { toBase64, generateId, cn } from '@/lib/utils/helpers'
import { Spinner } from '@/components/ui'

interface PhotoUploaderProps {
  photos: ListingPhoto[]
  primaryPhotoId: string
  onPhotosChange: (photos: ListingPhoto[]) => void
  onPrimaryChange: (id: string) => void
}

export default function PhotoUploader({
  photos, primaryPhotoId, onPhotosChange, onPrimaryChange,
}: PhotoUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [dragOverId, setDragOverId] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true)
    setError(null)
    try {
      const newPhotos: ListingPhoto[] = await Promise.all(
        acceptedFiles.map(async (file, i) => ({
          id: generateId(),
          url: await toBase64(file),
          name: file.name,
          order: photos.length + i,
          isPrimary: photos.length === 0 && i === 0,
        }))
      )
      const updated = [...photos, ...newPhotos]
      onPhotosChange(updated)
      if (!primaryPhotoId && newPhotos.length > 0) {
        onPrimaryChange(newPhotos[0].id)
      }
    } catch {
      setError('Failed to process one or more images.')
    }
    setIsUploading(false)
  }, [photos, primaryPhotoId, onPhotosChange, onPrimaryChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxSize: 20 * 1024 * 1024, // 20MB
  })

  const removePhoto = (id: string) => {
    const updated = photos.filter((p) => p.id !== id)
    onPhotosChange(updated)
    if (primaryPhotoId === id && updated.length > 0) {
      onPrimaryChange(updated[0].id)
    }
  }

  // ── Drag-to-reorder logic ────────────────────────────────────────────
  const handleDragStart = (id: string) => setDraggingId(id)
  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault()
    if (id !== draggingId) setDragOverId(id)
  }
  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    if (!draggingId || draggingId === targetId) return

    const fromIdx = photos.findIndex((p) => p.id === draggingId)
    const toIdx = photos.findIndex((p) => p.id === targetId)
    const reordered = [...photos]
    const [moved] = reordered.splice(fromIdx, 1)
    reordered.splice(toIdx, 0, moved)
    onPhotosChange(reordered.map((p, i) => ({ ...p, order: i })))
    setDraggingId(null)
    setDragOverId(null)
  }
  const handleDragEnd = () => { setDraggingId(null); setDragOverId(null) }

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200',
          isDragActive || isUploading
            ? 'border-brand-blue bg-brand-blue/5'
            : 'border-gray-200 hover:border-brand-blue/40 hover:bg-surface-1'
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          {isUploading ? (
            <Spinner size={24} className="text-brand-blue" />
          ) : (
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', isDragActive ? 'bg-brand-blue' : 'bg-surface-2')}>
              <Upload size={18} className={isDragActive ? 'text-white' : 'text-gray-400'} />
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-700">
              {isUploading ? 'Processing…' : isDragActive ? 'Drop photos here' : 'Upload property photos'}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">JPG, PNG, WebP · up to 20MB each</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">
          <AlertCircle size={13} /> {error}
        </div>
      )}

      {/* Photo grid */}
      {photos.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-500">
              {photos.length} photo{photos.length !== 1 ? 's' : ''} · drag to reorder
            </p>
            <p className="text-xs text-gray-400">
              ★ = primary (used in templates)
            </p>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {photos.map((photo) => {
              const isPrimary = photo.id === primaryPhotoId
              return (
                <div
                  key={photo.id}
                  draggable
                  onDragStart={() => handleDragStart(photo.id)}
                  onDragOver={(e) => handleDragOver(e, photo.id)}
                  onDrop={(e) => handleDrop(e, photo.id)}
                  onDragEnd={handleDragEnd}
                  className={cn(
                    'relative group rounded-xl overflow-hidden aspect-[4/3] cursor-grab active:cursor-grabbing transition-all',
                    isPrimary ? 'ring-2 ring-brand-gold ring-offset-2' : 'ring-1 ring-gray-200',
                    draggingId === photo.id ? 'opacity-40 scale-95' : '',
                    dragOverId === photo.id ? 'ring-2 ring-brand-blue scale-[1.02]' : ''
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />

                  {/* Overlay controls */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-start justify-between p-2">
                    <button
                      onClick={() => onPrimaryChange(photo.id)}
                      title={isPrimary ? 'Primary photo' : 'Set as primary'}
                      className={cn(
                        'w-7 h-7 rounded-full flex items-center justify-center transition-all',
                        isPrimary
                          ? 'bg-brand-gold text-white'
                          : 'bg-white/80 text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-brand-gold hover:text-white'
                      )}
                    >
                      <Star size={12} className={isPrimary ? 'fill-white' : ''} />
                    </button>
                    <button
                      onClick={() => removePhoto(photo.id)}
                      className="w-7 h-7 rounded-full bg-white/80 text-gray-500 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <X size={12} />
                    </button>
                  </div>

                  {/* Primary badge */}
                  {isPrimary && (
                    <div className="absolute bottom-2 left-2">
                      <span className="text-[10px] font-bold bg-brand-gold text-white px-1.5 py-0.5 rounded-md">
                        PRIMARY
                      </span>
                    </div>
                  )}

                  {/* Drag handle indicator */}
                  <div className="absolute top-1/2 right-2 -translate-y-1/2 opacity-0 group-hover:opacity-60">
                    <GripVertical size={14} className="text-white" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {photos.length === 0 && (
        <div className="flex items-center gap-2 text-xs text-gray-400 bg-surface-1 rounded-lg px-4 py-3">
          <ImageIcon size={13} />
          No photos yet — upload images above to use in your marketing templates.
        </div>
      )}
    </div>
  )
}
