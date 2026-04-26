// ── JLP Brand Design Tokens ───────────────────────────────────────────────
// Primary palette derived directly from the Joe Leffew Properties logo:
// steel-blue gradient (#3B7EA6 → #6AAFD4) + charcoal wordmark (#282c35).
// Gold is an accent only — never large panels or dominant zones.

export const BRAND = {
  // Steel-blue system — matched to logo gradient
  navy:       '#2c5a7c',   // steel mid-dark  (was deep navy #1d3557)
  navyDeep:   '#1a3852',   // dark steel blue  (was black-navy #111f35)
  navyMid:    '#3B7EA6',   // primary logo color — the dominant brand blue
  navyLight:  '#6AAFD4',   // light logo color
  blue:       '#3B7EA6',   // alias — same as navyMid
  blueLight:  '#6AAFD4',   // alias — same as navyLight
  charcoal:   '#282c35',   // matches JLP wordmark text
  // Neutrals
  white:      '#ffffff',
  offWhite:   '#f9f9fb',
  stone:      '#f4f2ef',
  grayLight:  '#e8e6e3',
  gray:       '#6b7280',
  grayMid:    '#9ca3af',
  // Accent — gold, small elements only
  accentWarm: '#c8a96e',
  black:      '#0d0d0d',
} as const

export const TYPE = {
  // Social canvas (1080px)
  s_xs:  22, s_sm:  28, s_base: 36, s_md:  44,
  s_lg:  56, s_xl:  72, s_2xl:  88, s_3xl: 110,
  // Print/flyer canvas (816px)
  xs:    10, sm:    12, base:   14, md:    16,
  lg:    20, xl:    26, '2xl':  34, '3xl': 44,
} as const

export const WEIGHT = {
  light: 300, regular: 400, medium: 500,
  semibold: 600, bold: 700, black: 900,
} as const

// Margins — consistent across all templates
export const M = {
  social: { edge: 60, section: 32, item: 16 },
  flyer:  { edge: 44, section: 24, item: 12 },
} as const

// Overlays — pick ONE per design, never stack
export const OVERLAY = {
  subtle:         'rgba(0,0,0,0.28)',
  medium:         'rgba(0,0,0,0.45)',
  strong:         'rgba(0,0,0,0.62)',
  navy:           'rgba(26,56,82,0.75)',           // steel-blue mid-dark
  navyDeep:       'rgba(26,56,82,0.90)',           // dark steel blue
  fadeBottom:     'linear-gradient(to top, rgba(22,50,80,0.88) 0%, rgba(22,50,80,0.40) 42%, transparent 72%)',
  fadeBottomNavy: 'linear-gradient(to top, rgba(26,56,82,0.92) 0%, rgba(26,56,82,0.50) 45%, transparent 75%)',
  fadeLeft:       'linear-gradient(to right, rgba(26,56,82,0.85) 0%, rgba(26,56,82,0.42) 50%, transparent 80%)',
  none:           'transparent',
} as const

// Keep GRADIENTS + OVERLAYS aliases for backward compat with any files still using them
export const GRADIENTS = {
  darkBottom:  OVERLAY.fadeBottom,
  navyBottom:  OVERLAY.fadeBottomNavy,
  darkLeft:    OVERLAY.fadeLeft,
  navyLeft:    'linear-gradient(to right, rgba(26,56,82,0.95) 0%, rgba(26,56,82,0.60) 55%, transparent 82%)',
  goldStreak:  `linear-gradient(135deg, #c8a96e 0%, #b8956a 100%)`,
} as const

export const FONT = {
  display: "'Playfair Display', Georgia, 'Times New Roman', serif",
  body:    "'Inter', 'Segoe UI', system-ui, sans-serif",
} as const

export const OVERLAYS = {
  darkLight:   OVERLAY.subtle,
  dark:        OVERLAY.medium,
  darkStrong:  OVERLAY.strong,
  navyMid:     OVERLAY.navy,
  navyLight:   'rgba(26,56,82,0.55)',
  none:        OVERLAY.none,
} as const
