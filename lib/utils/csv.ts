import Papa from 'papaparse'
import { Listing, CSVRow, ColumnMapping } from '@/types'
import { autoDetectMapping, parsePrice, generateId } from '@/lib/utils/helpers'

// ── Parse a CSV File ──────────────────────────────────────────────────────
export function parseCSVFile(file: File): Promise<{ rows: CSVRow[]; columns: string[] }> {
  return new Promise((resolve, reject) => {
    Papa.parse<CSVRow>(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      complete: (results) => {
        if (results.errors.length > 0 && results.data.length === 0) {
          reject(new Error(results.errors[0].message))
          return
        }
        const columns = results.meta.fields || []
        resolve({ rows: results.data, columns })
      },
      error: (err) => reject(new Error(err.message)),
    })
  })
}

// ── Parse a CSV String (for sample/paste) ───────────────────────────────
export function parseCSVString(text: string): { rows: CSVRow[]; columns: string[] } {
  const results = Papa.parse<CSVRow>(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  })
  return { rows: results.data, columns: results.meta.fields || [] }
}

// ── Auto-detect column mappings ────────────────────────────────────────
export function detectMappings(columns: string[]): ColumnMapping[] {
  return columns.map((col) => ({
    csvColumn: col,
    listingField: autoDetectMapping(col) as keyof Listing | '',
  }))
}

// ── Convert a CSV row → partial Listing ────────────────────────────────
export function rowToListing(row: CSVRow, mappings: ColumnMapping[]): Partial<Listing> {
  const partial: Partial<Listing> & { [key: string]: unknown } = {}

  for (const mapping of mappings) {
    if (!mapping.listingField) continue
    const rawValue = row[mapping.csvColumn] || ''
    const field = mapping.listingField as string

    // Special handling per field type
    if (field === 'priceRaw') {
      partial.priceRaw = parsePrice(rawValue)
    } else if (field === 'price') {
      partial.price = rawValue
      // Also set priceRaw from price field if not separately mapped
      if (!partial.priceRaw) {
        partial.priceRaw = parsePrice(rawValue)
      }
    } else if (field === 'features') {
      // Support pipe-delimited or newline-delimited features
      partial.features = rawValue
        .split(/[|\n]/)
        .map((s) => s.trim())
        .filter(Boolean)
    } else {
      partial[field] = rawValue
    }
  }

  // Defaults
  const now = new Date().toISOString()
  return {
    id: generateId(),
    createdAt: now,
    updatedAt: now,
    status: 'active' as const,
    favorited: false,
    photos: [],
    primaryPhotoId: '',
    exports: [],
    templateOverrides: {},
    agentName: 'Joey Leffew',
    brokerageName: 'Keller Williams',
    agentPhone: '423.432.6869',
    agentEmail: 'joeleffew@kw.com',
    agentWebsite: 'joeleffew.com',
    ctaText: 'Schedule Your Private Showing Today',
    disclaimer: 'Information deemed reliable but not guaranteed. © 2026 Joe Leffew Properties | Keller Williams. Equal Housing Opportunity.',
    features: [],
    ...partial,
  }
}

// ── Validate a row has minimum required fields ──────────────────────────
export function validateRow(listing: Partial<Listing>): string[] {
  const errors: string[] = []
  if (!listing.address) errors.push('Missing address')
  if (!listing.price && !listing.priceRaw) errors.push('Missing price')
  return errors
}

// ── Convert all rows ────────────────────────────────────────────────────
export function convertAllRows(
  rows: CSVRow[],
  mappings: ColumnMapping[]
): { listing: Partial<Listing>; errors: string[]; rowIndex: number }[] {
  return rows.map((row, i) => {
    const listing = rowToListing(row, mappings)
    const errors = validateRow(listing)
    return { listing, errors, rowIndex: i }
  })
}

// ── Mapping quality score (0–100) ──────────────────────────────────────
export function mappingScore(mappings: ColumnMapping[]): number {
  const critical = ['address', 'city', 'state', 'price', 'beds', 'baths']
  const mapped = mappings.filter((m) => m.listingField).map((m) => m.listingField)
  const covered = critical.filter((f) => mapped.includes(f as keyof Listing)).length
  return Math.round((covered / critical.length) * 100)
}
