import { v4 as uuidv4 } from 'uuid'

export const generateId = () => uuidv4()

export const slugify = (str: string) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const formatPrice = (raw: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(raw)

export const parsePrice = (str: string): number => {
  const cleaned = str.replace(/[^0-9.]/g, '')
  return parseFloat(cleaned) || 0
}

export const formatAddress = (listing: { address: string; city: string; state: string; zip: string }) =>
  `${listing.address}, ${listing.city}, ${listing.state} ${listing.zip}`

export const shortAddress = (address: string, maxLen = 28) =>
  address.length > maxLen ? address.slice(0, maxLen - 1) + '…' : address

export const truncate = (str: string, max: number) =>
  str.length > max ? str.slice(0, max - 1) + '…' : str

export const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(' ')

export const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })

// Resize + compress an image file to max 2048px on longest side, 85% JPEG.
// Keeps photos fast to store and render without visible quality loss.
export function resizeImage(file: File, maxPx = 2048, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onerror = reject
    reader.onload = () => {
      const img = new Image()
      img.src = reader.result as string
      img.onerror = reject
      img.onload = () => {
        const { naturalWidth: w, naturalHeight: h } = img
        const scale = w > h ? maxPx / w : maxPx / h
        const width  = scale < 1 ? Math.round(w * scale) : w
        const height = scale < 1 ? Math.round(h * scale) : h

        const canvas = document.createElement('canvas')
        canvas.width  = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) { reject(new Error('Canvas not supported')); return }
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
    }
  })
}

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export const listingSlug = (listing: { address: string; id: string }) =>
  slugify(listing.address) || listing.id.slice(0, 8)

export const relativeTime = (iso: string): string => {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(iso).toLocaleDateString()
}

// CSV field mapping helpers
export const LISTING_FIELD_LABELS: Record<string, string> = {
  address:       'Property Address',
  city:          'City',
  state:         'State',
  zip:           'ZIP Code',
  price:         'List Price',
  priceRaw:      'Price (number)',
  beds:          'Bedrooms',
  baths:         'Bathrooms',
  sqft:          'Square Feet',
  lotSize:       'Lot Size',
  yearBuilt:     'Year Built',
  subdivision:   'Subdivision',
  mlsNumber:     'MLS Number',
  headline:      'Headline',
  description:   'Description',
  ctaText:       'CTA Text',
  disclaimer:    'Disclaimer',
  openHouseDate: 'Open House Date',
  openHouseTime: 'Open House Time',
  agentName:     'Agent Name',
  brokerageName: 'Brokerage',
  agentPhone:    'Phone',
  agentEmail:    'Email',
  agentWebsite:  'Website',
  socialHandle:  'Social Handle',
  qrCodeUrl:     'QR Code URL',
}

export const MAPPABLE_FIELDS = Object.keys(LISTING_FIELD_LABELS) as (keyof typeof LISTING_FIELD_LABELS)[]

// Smart column auto-detection
export const autoDetectMapping = (csvColumn: string): string => {
  const col = csvColumn.toLowerCase().replace(/[^a-z0-9]/g, '')
  const map: Record<string, string> = {
    address: 'address', streetaddress: 'address', propertyaddress: 'address',
    city: 'city',
    state: 'state', st: 'state',
    zip: 'zip', zipcode: 'zip', postalcode: 'zip',
    price: 'price', listprice: 'price', askingprice: 'price',
    beds: 'beds', bedrooms: 'beds', br: 'beds',
    baths: 'baths', bathrooms: 'baths', ba: 'baths',
    sqft: 'sqft', squarefeet: 'sqft', sf: 'sqft', size: 'sqft',
    lotsize: 'lotSize', lot: 'lotSize',
    yearbuilt: 'yearBuilt', built: 'yearBuilt', year: 'yearBuilt',
    subdivision: 'subdivision', sub: 'subdivision', community: 'subdivision',
    mls: 'mlsNumber', mlsnumber: 'mlsNumber', mlsid: 'mlsNumber',
    headline: 'headline', title: 'headline',
    description: 'description', desc: 'description', remarks: 'description',
    agent: 'agentName', agentname: 'agentName', listingagent: 'agentName',
    phone: 'agentPhone', agentphone: 'agentPhone',
    email: 'agentEmail', agentemail: 'agentEmail',
    website: 'agentWebsite', url: 'agentWebsite',
    openhouse: 'openHouseDate', openhousedate: 'openHouseDate',
    openhousetime: 'openHouseTime',
  }
  return map[col] || ''
}
