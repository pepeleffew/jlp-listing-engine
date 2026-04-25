'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Wand2, Filter, Search, ArrowRight, ChevronRight } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import { PageHeader } from '@/components/ui'
import { TEMPLATES, TEMPLATE_GROUPS } from '@/lib/templates/registry'
import { SAMPLE_LISTING, useListingStore } from '@/lib/store/listingStore'
import { renderTemplate } from '@/components/templates/TemplateRenderer'
import { TemplateDefinition } from '@/types'
import { cn } from '@/lib/utils/helpers'

const CATEGORY_LABELS: Record<string, string> = {
  'social-square':   'Social Square',
  'social-story':    'Stories',
  'social-carousel': 'Carousel',
  'flyer':           'Flyers',
  'print':           'Print',
  'email':           'Email',
  'web':             'Web',
}

export default function TemplatesPage() {
  const { listings } = useListingStore()
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [query, setQuery] = useState('')

  // Use the first real listing or sample for previews
  const previewListing = listings.find((l) => l.status === 'active') || SAMPLE_LISTING

  const filtered = TEMPLATES.filter((t) => {
    const matchCat = activeCategory === 'all' || t.category === activeCategory
    const matchQ = !query || t.name.toLowerCase().includes(query.toLowerCase()) || t.tags.some((tag) => tag.includes(query.toLowerCase()))
    return matchCat && matchQ
  })

  const allCategories = ['all', ...Array.from(new Set(TEMPLATES.map((t) => t.category)))]

  return (
    <AppShell>
      <div className="p-8">
        <PageHeader
          title="Template Library"
          description={`${TEMPLATES.length} professional templates — all brand-consistent, ready to export.`}
          actions={
            <Link href="/listings" className="btn-primary btn-sm">
              <Wand2 size={13} /> Generate for a Listing
            </Link>
          }
        />

        {/* Filter bar */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search templates…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input pl-9"
            />
          </div>

          <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-0.5 overflow-x-auto flex-wrap">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all',
                  activeCategory === cat ? 'bg-brand-navy text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'
                )}
              >
                {cat === 'all' ? `All (${TEMPLATES.length})` : CATEGORY_LABELS[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        {/* Template grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              previewListing={previewListing}
              listingId={listings[0]?.id}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm">No templates match your search.</p>
          </div>
        )}
      </div>
    </AppShell>
  )
}

function TemplateCard({
  template, previewListing, listingId,
}: {
  template: TemplateDefinition
  previewListing: typeof SAMPLE_LISTING
  listingId?: string
}) {
  const [activeVariant, setActiveVariant] = useState(template.variants[0].id)

  // Scale factor to fit templates in the card preview
  const previewW = 280
  const scale = previewW / template.size.width
  const previewH = template.size.height * scale

  return (
    <div className="card overflow-hidden hover:shadow-card-lg transition-all group">
      {/* Preview area */}
      <div
        className="relative overflow-hidden bg-surface-2 cursor-pointer"
        style={{ height: Math.min(previewH, 240) }}
        onClick={() => listingId && window.open(`/listings/${listingId}/generate`, '_blank')}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: template.size.width,
            height: template.size.height,
          }}
        >
          {renderTemplate({
            templateId: template.id,
            variant: activeVariant,
            listing: previewListing as never,
            scale: 1,
            id: `gallery-${template.id}-${activeVariant}`,
          })}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/10 transition-all flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-all">
            {listingId && (
              <Link
                href={`/listings/${listingId}/generate`}
                className="btn-primary btn-sm shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <Wand2 size={12} /> Use Template
              </Link>
            )}
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-2 left-2">
          <span className="badge badge-navy text-[10px]">{CATEGORY_LABELS[template.category] || template.category}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-sm font-semibold text-brand-navy">{template.name}</h3>
            <p className="text-xs text-gray-400">{template.size.label}</p>
          </div>
          {listingId && (
            <Link href={`/listings/${listingId}/generate`} className="text-gray-300 hover:text-brand-blue transition-colors">
              <ChevronRight size={16} />
            </Link>
          )}
        </div>

        {/* Variant selector */}
        {template.variants.length > 1 && (
          <div className="flex gap-1 flex-wrap mt-2">
            {template.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setActiveVariant(v.id)}
                className={cn(
                  'px-2 py-0.5 rounded-md text-[10px] font-medium transition-all',
                  activeVariant === v.id
                    ? 'bg-brand-navy text-white'
                    : 'bg-surface-1 text-gray-500 hover:bg-surface-2'
                )}
              >
                {v.name}
              </button>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {template.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="badge badge-gray text-[10px]">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
