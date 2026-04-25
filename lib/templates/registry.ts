import { TemplateDefinition } from '@/types'

export const TEMPLATES: TemplateDefinition[] = [
  // ── Social Squares ──────────────────────────────────────────────────────
  {
    id: 'just-listed-square',
    name: 'Just Listed',
    category: 'social-square',
    size: { width: 1080, height: 1080, label: '1080 × 1080', aspect: '1:1' },
    description: 'Hero listing announcement for Instagram & Facebook feeds.',
    tags: ['launch', 'social', 'instagram', 'facebook'],
    variants: [
      { id: 'dark-overlay',  name: 'Dark Overlay' },
      { id: 'split-panel',   name: 'Split Panel' },
      { id: 'minimal-white', name: 'Minimal White' },
    ],
  },
  {
    id: 'open-house-square',
    name: 'Open House',
    category: 'social-square',
    size: { width: 1080, height: 1080, label: '1080 × 1080', aspect: '1:1' },
    description: 'Open house announcement with date, time, and address.',
    tags: ['open-house', 'social', 'instagram'],
    variants: [
      { id: 'bold-gold',  name: 'Bold Gold' },
      { id: 'clean-navy', name: 'Clean Navy' },
    ],
  },
  {
    id: 'coming-soon-square',
    name: 'Coming Soon',
    category: 'social-square',
    size: { width: 1080, height: 1080, label: '1080 × 1080', aspect: '1:1' },
    description: 'Build anticipation before the official listing date.',
    tags: ['pre-market', 'social', 'teaser'],
    variants: [
      { id: 'dark',  name: 'Dark & Bold' },
      { id: 'light', name: 'Light & Airy' },
    ],
  },
  {
    id: 'under-contract-square',
    name: 'Under Contract',
    category: 'social-square',
    size: { width: 1080, height: 1080, label: '1080 × 1080', aspect: '1:1' },
    description: 'Celebrate going under contract. Shows market activity.',
    tags: ['milestone', 'social'],
    variants: [{ id: 'default', name: 'Standard' }],
  },
  {
    id: 'just-sold-square',
    name: 'Just Sold',
    category: 'social-square',
    size: { width: 1080, height: 1080, label: '1080 × 1080', aspect: '1:1' },
    description: 'Celebrate the closing. Build your track record.',
    tags: ['sold', 'social', 'achievement'],
    variants: [
      { id: 'gold-celebration', name: 'Gold Celebration' },
      { id: 'minimal',          name: 'Minimal' },
    ],
  },
  {
    id: 'top5-features',
    name: 'Top 5 Features',
    category: 'social-square',
    size: { width: 1080, height: 1080, label: '1080 × 1080', aspect: '1:1' },
    description: '"5 Reasons to Love This Home" — high-engagement format.',
    tags: ['features', 'social', 'engagement', 'carousel'],
    variants: [
      { id: 'dark',  name: 'Dark Navy' },
      { id: 'light', name: 'Clean White' },
    ],
  },
  {
    id: 'features-carousel',
    name: 'Feature Carousel',
    category: 'social-carousel',
    size: { width: 1080, height: 1080, label: '1080 × 1080', aspect: '1:1' },
    description: 'Multi-slide carousel spotlighting each property feature.',
    tags: ['carousel', 'features', 'instagram', 'multi-slide'],
    variants: [
      { id: 'dark',  name: 'Dark Theme' },
      { id: 'light', name: 'Light Theme' },
    ],
  },

  // ── Stories ──────────────────────────────────────────────────────────────
  {
    id: 'just-listed-story',
    name: 'Just Listed Story',
    category: 'social-story',
    size: { width: 1080, height: 1920, label: '1080 × 1920', aspect: '9:16' },
    description: 'Vertical story format for Instagram & Facebook Stories.',
    tags: ['story', 'instagram', 'vertical', 'launch'],
    variants: [
      { id: 'photo-full', name: 'Full Photo' },
      { id: 'split-info', name: 'Split Info Panel' },
    ],
  },
  {
    id: 'open-house-story',
    name: 'Open House Story',
    category: 'social-story',
    size: { width: 1080, height: 1920, label: '1080 × 1920', aspect: '9:16' },
    description: 'Vertical open house invite for Stories.',
    tags: ['story', 'open-house', 'vertical'],
    variants: [{ id: 'default', name: 'Standard' }],
  },

  // ── Flyers ───────────────────────────────────────────────────────────────
  {
    id: 'property-flyer',
    name: 'Property Flyer',
    category: 'flyer',
    size: { width: 816, height: 1056, label: '8.5 × 11 in', aspect: 'letter' },
    description: 'Full-page print-ready property flyer. PDF export optimized.',
    tags: ['flyer', 'print', 'pdf', 'letter'],
    variants: [
      { id: 'modern-hero', name: 'Modern Hero' },
      { id: 'grid-photos', name: 'Grid Photos' },
      { id: 'luxury',      name: 'Luxury Minimal' },
    ],
  },
  {
    id: 'open-house-flyer',
    name: 'Open House Flyer',
    category: 'flyer',
    size: { width: 816, height: 1056, label: '8.5 × 11 in', aspect: 'letter' },
    description: 'Print flyer designed for open house promotion.',
    tags: ['flyer', 'print', 'open-house'],
    variants: [{ id: 'default', name: 'Standard' }],
  },
  {
    id: 'feature-sheet',
    name: 'Feature Sheet',
    category: 'flyer',
    size: { width: 816, height: 1056, label: '8.5 × 11 in', aspect: 'letter' },
    description: 'Clean feature/spec sheet for showing packets.',
    tags: ['flyer', 'print', 'specs', 'showing'],
    variants: [{ id: 'default', name: 'Standard' }],
  },
  {
    id: 'luxury-brochure',
    name: 'Luxury Brochure',
    category: 'flyer',
    size: { width: 816, height: 1056, label: '8.5 × 11 in', aspect: 'letter' },
    description: 'Premium editorial-style layout for luxury listings.',
    tags: ['brochure', 'luxury', 'print', 'editorial', 'dark'],
    variants: [{ id: 'default', name: 'Luxury Dark' }],
  },

  // ── Email & Web ───────────────────────────────────────────────────────────
  {
    id: 'email-header',
    name: 'Email Header',
    category: 'email',
    size: { width: 600, height: 300, label: '600 × 300', aspect: '2:1' },
    description: 'Email newsletter / campaign header graphic.',
    tags: ['email', 'marketing', 'header'],
    variants: [{ id: 'default', name: 'Standard' }],
  },
  {
    id: 'facebook-cover',
    name: 'Facebook Cover',
    category: 'web',
    size: { width: 1640, height: 624, label: '1640 × 624', aspect: 'fb-cover' },
    description: 'Facebook Page cover photo — listing promo.',
    tags: ['facebook', 'cover', 'social', 'wide'],
    variants: [{ id: 'default', name: 'Standard' }],
  },
  {
    id: 'qr-card',
    name: 'QR Flyer Card',
    category: 'print',
    size: { width: 612, height: 396, label: '4.25 × 2.75 in', aspect: 'postcard' },
    description: 'Postcard-size QR scan card. Leave at showings.',
    tags: ['qr', 'print', 'card', 'postcard'],
    variants: [{ id: 'default', name: 'Standard' }],
  },
]

// ── Lookup helpers ────────────────────────────────────────────────────────
export const getTemplate = (id: string): TemplateDefinition | undefined =>
  TEMPLATES.find((t) => t.id === id)

export const TEMPLATE_GROUPS = [
  { label: 'Social — Square (1:1)',  categories: ['social-square']   as const },
  { label: 'Social — Stories (9:16)', categories: ['social-story']   as const },
  { label: 'Carousel',               categories: ['social-carousel'] as const },
  { label: 'Flyers & Print',         categories: ['flyer', 'print']  as const },
  { label: 'Email & Web',            categories: ['email', 'web']    as const },
]

export const getTemplatesByCategory = (category: string): TemplateDefinition[] =>
  TEMPLATES.filter((t) => t.category === category)

// Count templates by category for display
export const TEMPLATE_COUNTS = TEMPLATE_GROUPS.reduce((acc, group) => {
  const count = group.categories.reduce(
    (n, cat) => n + TEMPLATES.filter((t) => t.category === cat).length,
    0
  )
  acc[group.label] = count
  return acc
}, {} as Record<string, number>)
