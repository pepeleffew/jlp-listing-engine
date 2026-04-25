'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Plus, Search, Filter, Star, Home, Archive, MoreHorizontal,
  Upload, Wand2, Copy, Trash2, ChevronDown, CheckCircle
} from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import { EmptyState, PageHeader } from '@/components/ui'
import { useListingStore } from '@/lib/store/listingStore'
import { relativeTime, cn } from '@/lib/utils/helpers'
import { Listing } from '@/types'

type FilterTab = 'all' | 'active' | 'archived' | 'starred'

export default function ListingsPage() {
  const router = useRouter()
  const { listings, createListing, duplicateListing, deleteListing, archiveListing, toggleFavorite } = useListingStore()

  const [query, setQuery] = useState('')
  const [tab, setTab] = useState<FilterTab>('all')
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let base = listings
    if (tab === 'active')   base = base.filter((l) => l.status === 'active')
    if (tab === 'archived') base = base.filter((l) => l.status === 'archived')
    if (tab === 'starred')  base = base.filter((l) => l.favorited)
    if (query) {
      const q = query.toLowerCase()
      base = base.filter((l) =>
        l.address.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.price.toLowerCase().includes(q) ||
        l.mlsNumber.toLowerCase().includes(q)
      )
    }
    return base
  }, [listings, tab, query])

  const handleNew = () => {
    const l = createListing()
    router.push(`/listings/${l.id}`)
  }

  const counts = useMemo(() => ({
    all:      listings.length,
    active:   listings.filter((l) => l.status === 'active').length,
    archived: listings.filter((l) => l.status === 'archived').length,
    starred:  listings.filter((l) => l.favorited).length,
  }), [listings])

  const TABS: { id: FilterTab; label: string }[] = [
    { id: 'all',      label: `All (${counts.all})` },
    { id: 'active',   label: `Active (${counts.active})` },
    { id: 'archived', label: `Archived (${counts.archived})` },
    { id: 'starred',  label: `★ Starred (${counts.starred})` },
  ]

  return (
    <AppShell>
      <div className="p-8 max-w-6xl mx-auto">
        <PageHeader
          title="Listings"
          description="Manage your listing projects and generate marketing assets."
          actions={
            <>
              <Link href="/import" className="btn-secondary">
                <Upload size={14} /> Import CSV
              </Link>
              <button onClick={handleNew} className="btn-primary">
                <Plus size={14} /> New Listing
              </button>
            </>
          }
        />

        {/* Filter bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by address, city, MLS…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input pl-9"
            />
          </div>

          <div className="flex items-center bg-white rounded-lg border border-gray-200 p-0.5">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                  tab === t.id
                    ? 'bg-brand-navy text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Listing grid */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Home size={28} />}
            title={query ? 'No listings match your search' : 'No listings yet'}
            description={query ? 'Try a different search term.' : 'Create your first listing or import from a CSV spreadsheet.'}
            action={
              !query && (
                <div className="flex gap-2">
                  <button onClick={handleNew} className="btn-primary btn-sm">
                    <Plus size={13} /> New Listing
                  </button>
                  <Link href="/import" className="btn-secondary btn-sm">
                    <Upload size={13} /> Import CSV
                  </Link>
                </div>
              )
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {filtered.map((listing) => (
              <ListingRow
                key={listing.id}
                listing={listing}
                menuOpen={openMenu === listing.id}
                onMenuToggle={() => setOpenMenu(openMenu === listing.id ? null : listing.id)}
                onMenuClose={() => setOpenMenu(null)}
                onFavorite={() => toggleFavorite(listing.id)}
                onDuplicate={() => { const l = duplicateListing(listing.id); router.push(`/listings/${l.id}`) }}
                onArchive={() => archiveListing(listing.id)}
                onDelete={() => { if (confirm('Delete this listing?')) deleteListing(listing.id) }}
              />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}

function ListingRow({
  listing, menuOpen, onMenuToggle, onMenuClose, onFavorite, onDuplicate, onArchive, onDelete,
}: {
  listing: Listing
  menuOpen: boolean
  onMenuToggle: () => void
  onMenuClose: () => void
  onFavorite: () => void
  onDuplicate: () => void
  onArchive: () => void
  onDelete: () => void
}) {
  const primaryPhoto = listing.photos.find((p) => p.id === listing.primaryPhotoId)

  return (
    <div className={cn(
      'card flex items-center gap-5 px-5 py-4 transition-all hover:shadow-card-md group',
      listing.status === 'archived' ? 'opacity-60' : ''
    )}>
      {/* Thumbnail */}
      <div className="w-16 h-12 rounded-lg bg-surface-2 flex-shrink-0 overflow-hidden">
        {primaryPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={primaryPhoto.url} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Home size={18} className="text-gray-300" />
          </div>
        )}
      </div>

      {/* Main info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <Link
            href={`/listings/${listing.id}`}
            className="text-sm font-semibold text-gray-900 hover:text-brand-blue transition-colors truncate"
          >
            {listing.address}
          </Link>
          {listing.favorited && <Star size={12} className="text-brand-gold fill-brand-gold flex-shrink-0" />}
          <StatusBadge status={listing.status} />
        </div>
        <p className="text-xs text-gray-400 truncate">
          {listing.city}, {listing.state} {listing.zip}
          {listing.mlsNumber && ` · MLS ${listing.mlsNumber}`}
        </p>
      </div>

      {/* Stats */}
      <div className="hidden lg:flex items-center gap-8 flex-shrink-0">
        <Stat label="Price"  value={listing.price || '—'} bold />
        <Stat label="Beds"   value={listing.beds  || '—'} />
        <Stat label="Baths"  value={listing.baths || '—'} />
        <Stat label="Sq Ft"  value={listing.sqft  || '—'} />
        <Stat label="Photos" value={String(listing.photos.length)} />
        <Stat label="Exports" value={String(listing.exports.length)} />
      </div>

      {/* Updated */}
      <div className="flex-shrink-0 text-xs text-gray-400 hidden xl:block w-20 text-right">
        {relativeTime(listing.updatedAt)}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <Link href={`/listings/${listing.id}/generate`} className="btn-ghost btn-sm text-gray-400 hover:text-brand-blue" title="Generate assets">
          <Wand2 size={14} />
        </Link>
        <button onClick={onFavorite} className="btn-ghost btn-sm text-gray-400 hover:text-brand-gold" title="Favorite">
          <Star size={14} className={listing.favorited ? 'fill-brand-gold text-brand-gold' : ''} />
        </button>
        <div className="relative">
          <button onClick={onMenuToggle} className="btn-ghost btn-sm text-gray-400">
            <MoreHorizontal size={14} />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={onMenuClose} />
              <div className="absolute right-0 top-8 z-20 w-44 bg-white rounded-xl shadow-card-lg border border-gray-100 py-1 animate-slide-up">
                <MenuItem icon={<Copy size={13} />}    label="Duplicate"            onClick={onDuplicate} />
                <MenuItem icon={<Archive size={13} />} label={listing.status === 'archived' ? 'Restore' : 'Archive'} onClick={onArchive} />
                <div className="border-t border-gray-100 my-1" />
                <MenuItem icon={<Trash2 size={13} />}  label="Delete"               onClick={onDelete} danger />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="text-center">
      <p className={cn('text-sm', bold ? 'font-semibold text-brand-navy' : 'text-gray-600')}>{value}</p>
      <p className="text-[10px] text-gray-400 uppercase tracking-wide">{label}</p>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn(
      'badge',
      status === 'active'   && 'badge-green',
      status === 'archived' && 'badge-gray',
      status === 'sold'     && 'badge-gold',
    )}>{status}</span>
  )
}

function MenuItem({ icon, label, onClick, danger }: { icon: React.ReactNode; label: string; onClick: () => void; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2.5 w-full px-3 py-2 text-xs transition-colors text-left',
        danger ? 'text-red-500 hover:bg-red-50' : 'text-gray-700 hover:bg-gray-50'
      )}
    >
      {icon}{label}
    </button>
  )
}
