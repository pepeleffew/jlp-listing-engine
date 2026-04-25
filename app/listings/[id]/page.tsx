'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ChevronLeft, Save, Wand2, Trash2, Copy, Star, CheckCircle,
  Home, User, Calendar, FileText, MapPin,
} from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import PhotoUploader from '@/components/listing/PhotoUploader'
import { SectionCard, Alert, Spinner } from '@/components/ui'
import { useListingStore } from '@/lib/store/listingStore'
import { ListingPhoto, Listing } from '@/types'
import { cn } from '@/lib/utils/helpers'

// ── Section tab navigation ────────────────────────────────────────────────
const SECTIONS = [
  { id: 'property', label: 'Property', icon: Home },
  { id: 'marketing', label: 'Marketing', icon: FileText },
  { id: 'openhouse', label: 'Open House', icon: Calendar },
  { id: 'agent', label: 'Agent', icon: User },
  { id: 'photos', label: 'Photos', icon: MapPin },
] as const

type SectionId = typeof SECTIONS[number]['id']

export default function ListingEditorPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const {
    getListing,
    updateListing,
    deleteListing,
    duplicateListing,
    toggleFavorite,
    setPrimaryPhoto,
  } = useListingStore()

  const listing = getListing(id)
  const [section, setSection] = useState<SectionId>('property')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState<Listing | null>(null)

  useEffect(() => {
    if (listing && !form) setForm({ ...listing })
  }, [listing, form])

  // ── Field updater ──────────────────────────────────────────────────────
  const set = (field: keyof Listing, value: unknown) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev))
    setSaved(false)
  }

  // ── Features list ──────────────────────────────────────────────────────
  const updateFeature = (i: number, value: string) => {
    if (!form) return
    const updated = [...form.features]
    updated[i] = value
    set('features', updated)
  }

  const addFeature = () => {
    if (!form) return
    set('features', [...form.features, ''])
  }

  const removeFeature = (i: number) => {
    if (!form) return
    set('features', form.features.filter((_, idx) => idx !== i))
  }

  // ── Save ───────────────────────────────────────────────────────────────
  const handleSave = useCallback(async () => {
    if (!listing || !form) return
    setSaving(true)
    updateListing(id, form)
    await new Promise((r) => setTimeout(r, 300))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }, [id, form, listing, updateListing])

  // Auto-save on tab switch
  const switchSection = (s: SectionId) => {
    if (!form) return
    updateListing(id, form)
    setSection(s)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  // ── Photos ─────────────────────────────────────────────────────────────
  const handlePhotosChange = (photos: ListingPhoto[]) => {
    updateListing(id, { photos })
    setForm((prev) => (prev ? { ...prev, photos } : prev))
  }

  const handlePrimaryChange = (photoId: string) => {
    setPrimaryPhoto(id, photoId)
    setForm((prev) => (prev ? { ...prev, primaryPhotoId: photoId } : prev))
  }

  // ── Early return AFTER hooks ───────────────────────────────────────────
  if (!listing || !form) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-4">Listing not found.</p>
            <Link href="/listings" className="btn-secondary btn-sm">
              Back to Listings
            </Link>
          </div>
        </div>
      </AppShell>
    )
  }

  const inputCls = 'input'
  const textareaCls = 'textarea'

  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/listings" className="btn-ghost btn-sm text-gray-400">
              <ChevronLeft size={14} /> Listings
            </Link>
            <div className="w-px h-5 bg-gray-200" />
            <div>
              <h1 className="text-sm font-semibold text-brand-navy leading-tight">
                {form.address || 'Untitled Listing'}
              </h1>
              <p className="text-xs text-gray-400">
                {form.city}
                {form.state ? `, ${form.state}` : ''}
                {form.price ? ` · ${form.price}` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(id)}
              className={cn('btn-ghost btn-sm', form.favorited ? 'text-brand-gold' : 'text-gray-400')}
              title="Star listing"
            >
              <Star size={14} className={form.favorited ? 'fill-brand-gold' : ''} />
            </button>

            <button
              onClick={() => {
                const l = duplicateListing(id)
                router.push(`/listings/${l.id}`)
              }}
              className="btn-ghost btn-sm text-gray-400"
              title="Duplicate"
            >
              <Copy size={14} />
            </button>

            <button
              onClick={() => {
                if (confirm('Delete this listing?')) {
                  deleteListing(id)
                  router.push('/listings')
                }
              }}
              className="btn-ghost btn-sm text-gray-400 hover:text-red-500"
              title="Delete"
            >
              <Trash2 size={14} />
            </button>

            <div className="w-px h-5 bg-gray-200" />

            <button onClick={handleSave} disabled={saving} className="btn-secondary btn-sm min-w-[80px]">
              {saving ? (
                <Spinner size={13} />
              ) : saved ? (
                <>
                  <CheckCircle size={13} className="text-emerald-500" /> Saved
                </>
              ) : (
                <>
                  <Save size={13} /> Save
                </>
              )}
            </button>

            <Link href={`/listings/${id}/generate`} className="btn-primary btn-sm">
              <Wand2 size={13} /> Generate Assets
            </Link>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-44 flex-shrink-0 border-r border-gray-100 bg-surface-1 py-4 px-2">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide px-3 mb-2">
              Sections
            </p>
            {SECTIONS.map(({ id: sid, label, icon: Icon }) => (
              <button
                key={sid}
                onClick={() => switchSection(sid)}
                className={cn(
                  'flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-xs font-medium transition-all mb-0.5 text-left',
                  section === sid
                    ? 'bg-brand-navy text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                )}
              >
                <Icon size={13} className={section === sid ? 'text-brand-gold' : ''} />
                {label}
              </button>
            ))}

            <div className="mt-4 pt-4 border-t border-gray-200 px-3">
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Changes auto-save when you switch sections.
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-8 max-w-3xl">
              {section === 'property' && (
                <div className="space-y-5 animate-fade-in">
                  <SectionCard title="Property Information" description="Core listing details — address, price, and specs.">
                    <div className="space-y-4">
                      <div>
                        <label className="label">Street Address *</label>
                        <input className={inputCls} value={form.address} onChange={(e) => set('address', e.target.value)} placeholder="123 Main Street" />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                          <label className="label">City *</label>
                          <input className={inputCls} value={form.city} onChange={(e) => set('city', e.target.value)} placeholder="Hixson" />
                        </div>
                        <div>
                          <label className="label">State</label>
                          <input className={inputCls} value={form.state} onChange={(e) => set('state', e.target.value)} placeholder="TN" />
                        </div>
                        <div>
                          <label className="label">ZIP</label>
                          <input className={inputCls} value={form.zip} onChange={(e) => set('zip', e.target.value)} placeholder="37343" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="label">List Price *</label>
                          <input className={inputCls} value={form.price} onChange={(e) => set('price', e.target.value)} placeholder="$425,000" />
                        </div>
                        <div>
                          <label className="label">MLS Number</label>
                          <input className={inputCls} value={form.mlsNumber} onChange={(e) => set('mlsNumber', e.target.value)} placeholder="MLS-2026-XXXX" />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <label className="label">Beds</label>
                          <input className={inputCls} value={form.beds} onChange={(e) => set('beds', e.target.value)} placeholder="4" />
                        </div>
                        <div>
                          <label className="label">Baths</label>
                          <input className={inputCls} value={form.baths} onChange={(e) => set('baths', e.target.value)} placeholder="3" />
                        </div>
                        <div>
                          <label className="label">Sq Ft</label>
                          <input className={inputCls} value={form.sqft} onChange={(e) => set('sqft', e.target.value)} placeholder="2,400" />
                        </div>
                        <div>
                          <label className="label">Year Built</label>
                          <input className={inputCls} value={form.yearBuilt} onChange={(e) => set('yearBuilt', e.target.value)} placeholder="2005" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="label">Lot Size</label>
                          <input className={inputCls} value={form.lotSize} onChange={(e) => set('lotSize', e.target.value)} placeholder="0.42 acres" />
                        </div>
                        <div>
                          <label className="label">Subdivision</label>
                          <input className={inputCls} value={form.subdivision} onChange={(e) => set('subdivision', e.target.value)} placeholder="Northshore Estates" />
                        </div>
                      </div>
                    </div>
                  </SectionCard>
                </div>
              )}

              {section === 'marketing' && (
                <div className="space-y-5 animate-fade-in">
                  <SectionCard title="Headline & Description" description="Copy that appears on your marketing assets.">
                    <div className="space-y-4">
                      <div>
                        <label className="label">Headline <span className="text-gray-400 font-normal">(short, punchy — appears large on graphics)</span></label>
                        <input
                          className={inputCls}
                          value={form.headline}
                          onChange={(e) => set('headline', e.target.value)}
                          placeholder="Charming Craftsman with Stunning Curb Appeal"
                          maxLength={80}
                        />
                        <p className="text-[10px] text-gray-400 mt-1">{form.headline.length}/80 characters</p>
                      </div>
                      <div>
                        <label className="label">Full Description</label>
                        <textarea
                          className={textareaCls}
                          rows={6}
                          value={form.description}
                          onChange={(e) => set('description', e.target.value)}
                          placeholder="Full property description for flyers and email campaigns…"
                        />
                      </div>
                      <div>
                        <label className="label">Call to Action Text</label>
                        <input
                          className={inputCls}
                          value={form.ctaText}
                          onChange={(e) => set('ctaText', e.target.value)}
                          placeholder="Schedule Your Private Showing Today"
                        />
                      </div>
                    </div>
                  </SectionCard>

                  <SectionCard title="Key Features" description="Up to 10 bullet points that appear on feature lists and flyers.">
                    <div className="space-y-2">
                      {form.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-brand-gold/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[9px] font-bold text-brand-gold">{i + 1}</span>
                          </div>
                          <input
                            className={cn(inputCls, 'flex-1')}
                            value={feat}
                            onChange={(e) => updateFeature(i, e.target.value)}
                            placeholder={`Feature ${i + 1}…`}
                          />
                          <button
                            onClick={() => removeFeature(i)}
                            className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {form.features.length < 10 && (
                        <button onClick={addFeature} className="btn-ghost btn-sm text-brand-blue mt-1">
                          + Add feature
                        </button>
                      )}
                    </div>
                  </SectionCard>

                  <SectionCard title="Footer & Legal" description="Disclaimer text for print flyers and email.">
                    <div>
                      <label className="label">Disclaimer / Footer Text</label>
                      <textarea
                        className={textareaCls}
                        rows={3}
                        value={form.disclaimer}
                        onChange={(e) => set('disclaimer', e.target.value)}
                        placeholder="Information deemed reliable but not guaranteed…"
                      />
                    </div>
                  </SectionCard>
                </div>
              )}

              {section === 'openhouse' && (
                <div className="space-y-5 animate-fade-in">
                  <SectionCard title="Open House Details" description="When left blank, open house templates will omit the date/time.">
                    <div className="space-y-4">
                      <div>
                        <label className="label">Date</label>
                        <input className={inputCls} value={form.openHouseDate} onChange={(e) => set('openHouseDate', e.target.value)} placeholder="Sunday, April 19, 2026" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="label">Start Time</label>
                          <input className={inputCls} value={form.openHouseTime} onChange={(e) => set('openHouseTime', e.target.value)} placeholder="2:00 PM" />
                        </div>
                        <div>
                          <label className="label">End Time</label>
                          <input className={inputCls} value={form.openHouseEndTime} onChange={(e) => set('openHouseEndTime', e.target.value)} placeholder="4:00 PM" />
                        </div>
                      </div>
                    </div>
                  </SectionCard>

                  {(form.openHouseDate || form.openHouseTime) && (
                    <Alert type="success">
                      Open house set for <strong>{form.openHouseDate}</strong>
                      {form.openHouseTime && ` · ${form.openHouseTime}`}
                      {form.openHouseEndTime && ` – ${form.openHouseEndTime}`}.
                      Open House templates will use this automatically.
                    </Alert>
                  )}
                </div>
              )}

              {section === 'agent' && (
                <div className="space-y-5 animate-fade-in">
                  <SectionCard title="Agent Information" description="Your contact info that appears on all generated assets.">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="label">Agent Name</label>
                          <input className={inputCls} value={form.agentName} onChange={(e) => set('agentName', e.target.value)} placeholder="Joey Leffew" />
                        </div>
                        <div>
                          <label className="label">Brokerage</label>
                          <input className={inputCls} value={form.brokerageName} onChange={(e) => set('brokerageName', e.target.value)} placeholder="Keller Williams" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="label">Phone</label>
                          <input className={inputCls} value={form.agentPhone} onChange={(e) => set('agentPhone', e.target.value)} placeholder="423.432.6869" />
                        </div>
                        <div>
                          <label className="label">Email</label>
                          <input className={inputCls} value={form.agentEmail} onChange={(e) => set('agentEmail', e.target.value)} placeholder="joeleffew@kw.com" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="label">Website</label>
                          <input className={inputCls} value={form.agentWebsite} onChange={(e) => set('agentWebsite', e.target.value)} placeholder="joeleffew.com" />
                        </div>
                        <div>
                          <label className="label">Social Handle</label>
                          <input className={inputCls} value={form.socialHandle} onChange={(e) => set('socialHandle', e.target.value)} placeholder="@joeleffew" />
                        </div>
                      </div>
                      <div>
                        <label className="label">QR Code URL</label>
                        <input className={inputCls} value={form.qrCodeUrl} onChange={(e) => set('qrCodeUrl', e.target.value)} placeholder="https://joeleffew.com" />
                      </div>
                    </div>
                  </SectionCard>
                </div>
              )}

              {section === 'photos' && (
                <div className="space-y-5 animate-fade-in">
                  <SectionCard
                    title="Property Photos"
                    description="Upload your listing photos. Drag to reorder. Star = primary photo used as hero image in templates."
                  >
                    <PhotoUploader
                      photos={form.photos}
                      primaryPhotoId={form.primaryPhotoId}
                      onPhotosChange={handlePhotosChange}
                      onPrimaryChange={handlePrimaryChange}
                    />
                  </SectionCard>

                  {form.photos.length > 0 && (
                    <Alert type="info">
                      <strong>{form.photos.length} photos uploaded.</strong> The ★ starred photo will be used as the hero image in all templates.
                      You can choose different photos per template in the Generate step.
                    </Alert>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  {saved ? '✓ Saved' : 'Unsaved changes'}
                </p>
                <div className="flex gap-2">
                  <button onClick={handleSave} disabled={saving} className="btn-secondary btn-sm">
                    {saving ? <Spinner size={12} /> : <Save size={12} />}
                    Save
                  </button>
                  <Link href={`/listings/${id}/generate`} className="btn-primary btn-sm">
                    <Wand2 size={12} /> Generate Assets
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}