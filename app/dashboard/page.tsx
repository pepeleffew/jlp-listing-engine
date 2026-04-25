'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Plus, Upload, FileText, TrendingUp, Home, Archive,
  Star, Clock, ChevronRight, ArrowRight, Zap
} from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import { useListingStore } from '@/lib/store/listingStore'
import { relativeTime, cn } from '@/lib/utils/helpers'

export default function DashboardPage() {
  const { listings, createListing } = useListingStore()
  const router = useRouter()

  const stats = useMemo(() => ({
    total:    listings.length,
    active:   listings.filter((l) => l.status === 'active').length,
    archived: listings.filter((l) => l.status === 'archived').length,
    starred:  listings.filter((l) => l.favorited).length,
  }), [listings])

  const recent = listings.slice(0, 5)

  const handleNewListing = () => {
    const l = createListing()
    router.push(`/listings/${l.id}`)
  }

  return (
    <AppShell>
      <div className="p-8 max-w-6xl mx-auto">
        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-brand-navy">Good morning, Joey 👋</h1>
            <p className="text-sm text-gray-500 mt-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/import" className="btn-secondary">
              <Upload size={15} />
              Import CSV
            </Link>
            <button onClick={handleNewListing} className="btn-primary">
              <Plus size={15} />
              New Listing
            </button>
          </div>
        </div>

        {/* ── Stats Row ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Listings', value: stats.total,    icon: Home,       color: 'text-brand-navy' },
            { label: 'Active',         value: stats.active,   icon: TrendingUp, color: 'text-emerald-600' },
            { label: 'Archived',       value: stats.archived, icon: Archive,    color: 'text-gray-400' },
            { label: 'Starred',        value: stats.starred,  icon: Star,       color: 'text-brand-gold' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-500">{label}</span>
                <Icon size={16} className={color} />
              </div>
              <p className="text-3xl font-bold text-brand-navy">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* ── Recent Listings ─────────────────────────────────────── */}
          <div className="col-span-2 card">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-brand-navy">Recent Listings</h2>
              <Link href="/listings" className="text-xs text-brand-blue hover:underline flex items-center gap-1">
                View all <ChevronRight size={12} />
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {recent.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <FileText size={32} className="text-gray-200 mx-auto mb-3" />
                  <p className="text-sm text-gray-400">No listings yet</p>
                  <button onClick={handleNewListing} className="btn-primary mt-4 btn-sm">
                    Create your first listing
                  </button>
                </div>
              ) : (
                recent.map((listing) => (
                  <Link
                    key={listing.id}
                    href={`/listings/${listing.id}`}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-surface-1 transition-colors group"
                  >
                    {/* Photo thumbnail or placeholder */}
                    <div className="w-12 h-12 rounded-lg bg-surface-2 flex-shrink-0 overflow-hidden">
                      {listing.primaryPhotoId && listing.photos.length > 0 ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={listing.photos.find(p => p.id === listing.primaryPhotoId)?.url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Home size={16} className="text-gray-300" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{listing.address}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {listing.city}, {listing.state} · {listing.beds}bd {listing.baths}ba · {listing.price}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <StatusBadge status={listing.status} />
                      <span className="text-xs text-gray-400">{relativeTime(listing.updatedAt)}</span>
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* ── Quick Actions ────────────────────────────────────────── */}
          <div className="space-y-4">
            <div className="card p-5">
              <h2 className="text-sm font-semibold text-brand-navy mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <QuickAction
                  icon={<Plus size={15} />}
                  label="New Listing"
                  sub="Enter manually"
                  onClick={handleNewListing}
                  accent
                />
                <QuickAction
                  icon={<Upload size={15} />}
                  label="Import CSV"
                  sub="From spreadsheet"
                  href="/import"
                />
                <QuickAction
                  icon={<Zap size={15} />}
                  label="Browse Templates"
                  sub="All 20 templates"
                  href="/templates"
                />
              </div>
            </div>

            {/* CSV tip card */}
            <div className="rounded-xl bg-brand-navy p-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Upload size={14} className="text-brand-gold" />
                <span className="text-xs font-semibold text-brand-gold uppercase tracking-wide">Pro Tip</span>
              </div>
              <p className="text-sm font-medium mb-1">Import from your MLS export</p>
              <p className="text-xs text-white/60 mb-4">
                Export a CSV from your MLS, upload it here, and generate all your marketing assets in under 2 minutes.
              </p>
              <Link href="/import" className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-gold hover:text-yellow-300 transition-colors">
                Set up import <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active:   'badge-green',
    archived: 'badge-gray',
    sold:     'badge-gold',
  }
  return <span className={map[status] || 'badge-gray'}>{status}</span>
}

function QuickAction({
  icon, label, sub, onClick, href, accent,
}: {
  icon: React.ReactNode
  label: string
  sub: string
  onClick?: () => void
  href?: string
  accent?: boolean
}) {
  const cls = cn(
    'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-all group',
    accent ? 'bg-brand-navy text-white hover:bg-[#162b47]' : 'hover:bg-surface-1 text-gray-700'
  )
  const inner = (
    <>
      <div className={cn('flex-shrink-0', accent ? 'text-brand-gold' : 'text-brand-blue')}>{icon}</div>
      <div className="flex-1 min-w-0">
        <p className={cn('text-xs font-semibold', accent ? 'text-white' : 'text-gray-800')}>{label}</p>
        <p className={cn('text-[10px]', accent ? 'text-white/60' : 'text-gray-400')}>{sub}</p>
      </div>
      <ArrowRight size={12} className={cn('flex-shrink-0 opacity-40 group-hover:opacity-80 transition-opacity', accent ? 'text-white' : 'text-gray-400')} />
    </>
  )
  if (href) return <Link href={href} className={cls}>{inner}</Link>
  return <button onClick={onClick} className={cls}>{inner}</button>
}
