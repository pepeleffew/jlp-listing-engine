'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { Listing, ListingPhoto, ImportSession, ExportRecord } from '@/types'
import { generateId, slugify } from '@/lib/utils/helpers'

// ─── Default / sample listing ─────────────────────────────────────────────
export const SAMPLE_LISTING: Listing = {
  id: 'sample-001',
  createdAt: new Date('2026-04-10').toISOString(),
  updatedAt: new Date('2026-04-10').toISOString(),
  status: 'active',
  favorited: false,
  address: '5820 Northshore Dr',
  city: 'Hixson',
  state: 'TN',
  zip: '37343',
  price: '$425,000',
  priceRaw: 425000,
  beds: '4',
  baths: '4',
  sqft: '2,400',
  lotSize: '0.42 acres',
  yearBuilt: '2005',
  subdivision: 'Northshore Estates',
  mlsNumber: 'MLS-2026-5820',
  headline: 'Charming Craftsman with Stunning Curb Appeal',
  description: 'Welcome home to this beautifully updated 4-bedroom, 4-bathroom craftsman nestled on a quiet Hixson street. Featuring vaulted ceilings, an open-concept kitchen with quartz countertops and gas range, gorgeous hardwood floors throughout, and a wraparound porch with mountain views. The primary suite includes a barn door entry, double vanity, and walk-in tiled shower. Minutes from Lake Chickamauga, top-rated schools, and all that Chattanooga has to offer.',
  features: [
    'Vaulted ceilings & open-concept layout',
    'Quartz countertops & gas range kitchen',
    'Hardwood floors throughout',
    'Primary suite with barn door & spa bath',
    'Covered front porch & mature landscaping',
    'Attached 2-car garage',
    'Minutes to Lake Chickamauga',
    'Top-rated Hamilton County schools',
  ],
  ctaText: 'Schedule Your Private Showing Today',
  disclaimer: 'Information deemed reliable but not guaranteed. © 2026 Joe Leffew Properties | Keller Williams Realty. Equal Housing Opportunity.',
  openHouseDate: 'Sunday, April 19, 2026',
  openHouseTime: '2:00 PM',
  openHouseEndTime: '4:00 PM',
  agentName: 'Joey Leffew',
  brokerageName: 'Keller Williams',
  agentPhone: '423.432.6869',
  agentEmail: 'joeleffew@kw.com',
  agentWebsite: 'joeleffew.com',
  agentLicense: '',
  socialHandle: '@joeleffew',
  qrCodeUrl: 'https://joeleffew.com',
  photos: [],
  primaryPhotoId: '',
  exports: [],
  templateOverrides: {},
}

// ─── Store interface ───────────────────────────────────────────────────────
interface ListingEngineStore {
  listings: Listing[]
  importSession: ImportSession | null
  recentExports: ExportRecord[]

  // Listing CRUD
  createListing: (data?: Partial<Listing>) => Listing
  updateListing: (id: string, data: Partial<Listing>) => void
  deleteListing: (id: string) => void
  duplicateListing: (id: string) => Listing
  archiveListing: (id: string) => void
  toggleFavorite: (id: string) => void
  getListing: (id: string) => Listing | undefined

  // Photos
  addPhotos: (listingId: string, photos: ListingPhoto[]) => void
  removePhoto: (listingId: string, photoId: string) => void
  setPrimaryPhoto: (listingId: string, photoId: string) => void
  reorderPhotos: (listingId: string, photos: ListingPhoto[]) => void

  // Import
  setImportSession: (session: ImportSession | null) => void
  importListings: (listings: Partial<Listing>[]) => Listing[]

  // Exports
  addExport: (listingId: string, record: ExportRecord) => void
}

// ─── Store implementation ──────────────────────────────────────────────────
export const useListingStore = create<ListingEngineStore>()(
  persist(
    immer((set, get) => ({
      listings: [SAMPLE_LISTING],
      importSession: null,
      recentExports: [],

      createListing: (data = {}) => {
        const now = new Date().toISOString()
        const listing: Listing = {
          ...SAMPLE_LISTING,
          ...data,
          id: generateId(),
          createdAt: now,
          updatedAt: now,
          status: 'active',
          favorited: false,
          photos: [],
          exports: [],
          templateOverrides: {},
          headline: data.headline || '',
          description: data.description || '',
          features: data.features || [],
          address: data.address || '',
          price: data.price || '',
          priceRaw: data.priceRaw || 0,
          agentName: data.agentName || 'Joey Leffew',
          brokerageName: data.brokerageName || 'Keller Williams',
          agentPhone: data.agentPhone || '423.432.6869',
          agentEmail: data.agentEmail || 'joeleffew@kw.com',
          agentWebsite: data.agentWebsite || 'joeleffew.com',
        }
        set((state) => { state.listings.unshift(listing) })
        return listing
      },

      updateListing: (id, data) => {
        set((state) => {
          const idx = state.listings.findIndex((l) => l.id === id)
          if (idx !== -1) {
            Object.assign(state.listings[idx], data, { updatedAt: new Date().toISOString() })
          }
        })
      },

      deleteListing: (id) => {
        set((state) => { state.listings = state.listings.filter((l) => l.id !== id) })
      },

      duplicateListing: (id) => {
        const original = get().listings.find((l) => l.id === id)
        if (!original) throw new Error('Listing not found')
        const now = new Date().toISOString()
        const copy: Listing = {
          ...original,
          id: generateId(),
          createdAt: now,
          updatedAt: now,
          address: `${original.address} (Copy)`,
          exports: [],
        }
        set((state) => { state.listings.unshift(copy) })
        return copy
      },

      archiveListing: (id) => {
        set((state) => {
          const l = state.listings.find((l) => l.id === id)
          if (l) l.status = l.status === 'archived' ? 'active' : 'archived'
        })
      },

      toggleFavorite: (id) => {
        set((state) => {
          const l = state.listings.find((l) => l.id === id)
          if (l) l.favorited = !l.favorited
        })
      },

      getListing: (id) => get().listings.find((l) => l.id === id),

      addPhotos: (listingId, photos) => {
        set((state) => {
          const l = state.listings.find((l) => l.id === listingId)
          if (!l) return
          l.photos = [...l.photos, ...photos]
          if (!l.primaryPhotoId && photos.length > 0) {
            l.primaryPhotoId = photos[0].id
          }
        })
      },

      removePhoto: (listingId, photoId) => {
        set((state) => {
          const l = state.listings.find((l) => l.id === listingId)
          if (!l) return
          l.photos = l.photos.filter((p) => p.id !== photoId)
          if (l.primaryPhotoId === photoId) {
            l.primaryPhotoId = l.photos[0]?.id || ''
          }
        })
      },

      setPrimaryPhoto: (listingId, photoId) => {
        set((state) => {
          const l = state.listings.find((l) => l.id === listingId)
          if (l) l.primaryPhotoId = photoId
        })
      },

      reorderPhotos: (listingId, photos) => {
        set((state) => {
          const l = state.listings.find((l) => l.id === listingId)
          if (l) l.photos = photos
        })
      },

      setImportSession: (session) => {
        set((state) => { state.importSession = session })
      },

      importListings: (partials) => {
        const created: Listing[] = []
        partials.forEach((data) => {
          const listing = get().createListing(data)
          created.push(listing)
        })
        return created
      },

      addExport: (listingId, record) => {
        set((state) => {
          const l = state.listings.find((l) => l.id === listingId)
          if (l) l.exports.unshift(record)
          state.recentExports.unshift(record)
          if (state.recentExports.length > 20) state.recentExports.pop()
        })
      },
    })),
    {
      name: 'jlp-listing-engine',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
