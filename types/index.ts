// ─────────────────────────────────────────────
//  JLP Listing Design Engine — Core Types
// ─────────────────────────────────────────────

export interface Listing {
  id: string
  createdAt: string
  updatedAt: string
  status: 'active' | 'archived' | 'sold'
  favorited: boolean

  // Property Info
  address: string
  city: string
  state: string
  zip: string
  price: string          // stored as formatted string e.g. "$425,000"
  priceRaw: number       // stored as number for sorting
  beds: string
  baths: string
  sqft: string
  lotSize: string
  yearBuilt: string
  subdivision: string
  mlsNumber: string

  // Marketing Copy
  headline: string       // short punchy headline
  description: string    // full listing description
  features: string[]     // bullet list of key features (up to 10)
  ctaText: string        // e.g. "Schedule a Showing Today"
  disclaimer: string     // brokerage footer / legal

  // Open House
  openHouseDate: string
  openHouseTime: string
  openHouseEndTime: string

  // Agent
  agentName: string
  brokerageName: string
  agentPhone: string
  agentEmail: string
  agentWebsite: string
  agentLicense: string
  socialHandle: string
  qrCodeUrl: string

  // Photos — stored as base64 or local paths
  photos: ListingPhoto[]
  primaryPhotoId: string

  // Generated Assets
  exports: ExportRecord[]

  // Template overrides
  templateOverrides: Record<string, TemplateOverride>
}

export interface ListingPhoto {
  id: string
  url: string          // base64 data URL or /api/photos/[id]
  name: string
  order: number
  isPrimary: boolean
}

export interface ExportRecord {
  id: string
  templateId: string
  templateName: string
  format: 'png' | 'jpg' | 'pdf'
  filename: string
  createdAt: string
}

export interface TemplateOverride {
  templateId: string
  headline?: string
  accentColor?: string
  overlayOpacity?: number
  showLogo?: boolean
  showPrice?: boolean
  showStats?: boolean
  cropX?: number
  cropY?: number
  cropScale?: number
  darkMode?: boolean
}

// Template Definition
export interface TemplateDefinition {
  id: string
  name: string
  category: TemplateCategory
  size: TemplateSize
  description: string
  tags: string[]
  variants: TemplateVariant[]
}

export type TemplateCategory =
  | 'social-square'
  | 'social-story'
  | 'social-carousel'
  | 'flyer'
  | 'email'
  | 'web'
  | 'print'

export interface TemplateSize {
  width: number
  height: number
  label: string      // e.g. "1080 × 1080"
  aspect: string     // e.g. "1:1"
}

export interface TemplateVariant {
  id: string
  name: string       // e.g. "Light", "Dark", "Minimal"
}

// CSV Import
export interface CSVRow {
  [key: string]: string
}

export interface ColumnMapping {
  csvColumn: string
  listingField: keyof Listing | ''
}

export interface ImportSession {
  id: string
  rows: CSVRow[]
  columns: string[]
  mappings: ColumnMapping[]
  previewRow: number
  confirmed: boolean
}

// Store / State
export interface AppStore {
  listings: Listing[]
  activeListing: Listing | null
  importSession: ImportSession | null
  recentExports: ExportRecord[]
}

// Dashboard stats
export interface DashboardStats {
  totalListings: number
  activeListings: number
  archivedListings: number
  totalExports: number
  recentActivity: ActivityItem[]
}

export interface ActivityItem {
  id: string
  type: 'created' | 'exported' | 'imported' | 'edited'
  listingAddress: string
  listingId: string
  detail: string
  timestamp: string
}

// Form state for listing editor
export type ListingFormData = Omit<Listing, 'id' | 'createdAt' | 'updatedAt' | 'exports' | 'photos' | 'templateOverrides'>
