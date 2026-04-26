import React, { CSSProperties } from 'react'
import { Listing } from '@/types'
import { BRAND, FONT, OVERLAY, WEIGHT, TYPE, M, ZONES } from '@/lib/templates/brand'

// ─────────────────────────────────────────────────────────────────────────────
//  DESIGN RULES (enforced here, not in templates):
//
//  1. Photo is the hero. Overlays exist only for text legibility.
//  2. Maximum 4–5 information items per design.
//  3. Agent attribution: small, confident, never dominant.
//  4. No decorative elements. Structure = decoration.
//  5. One accent color use per design. Use it or lose it.
// ─────────────────────────────────────────────────────────────────────────────

// ── Photo background ─────────────────────────────────────────────────────────
// Rule: pass ONE overlay string. Never chain multiple overlays in templates.
interface PhotoBgProps {
  listing: Listing
  overlay?: string   // single overlay — color OR gradient, not both
  style?: CSSProperties
  children?: React.ReactNode
}
export function PhotoBg({ listing, overlay, style, children }: PhotoBgProps) {
  const photo = listing.photos.find(p => p.id === listing.primaryPhotoId) || listing.photos[0]

  return (
    <div style={{ position: 'absolute', inset: 0, ...style }}>
      {photo?.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo.url}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        // No photo: clean navy — never a gradient placeholder
        <div style={{ width: '100%', height: '100%', background: BRAND.navy }} />
      )}
      {overlay && (
        <div style={{ position: 'absolute', inset: 0, background: overlay }} />
      )}
      {children}
    </div>
  )
}

// ── Specific photo (by index, not primary) ────────────────────────────────────
export function PhotoAt({ listing, index = 0, style }: { listing: Listing; index?: number; style?: CSSProperties }) {
  const photo = listing.photos[index] || listing.photos[0]
  return (
    <div style={{ position: 'relative', overflow: 'hidden', ...style }}>
      {photo?.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <div style={{ width: '100%', height: '100%', background: BRAND.navyMid }} />
      )}
    </div>
  )
}

// ── Status label — restrained, typographic ────────────────────────────────────
// Design rule: NO rounded rectangles with background fills.
// Status is communicated through type weight + tracking alone — or a thin rule.
// The `filled` prop exists for cases where the design truly requires a pill.
interface StatusProps {
  text: string
  dark?: boolean          // true = white text (on photo), false = navy text (on light bg)
  filled?: boolean        // false by default — use typography, not boxes
  style?: CSSProperties
}
export function StatusLabel({ text, dark = true, filled = false, style }: StatusProps) {
  if (filled) {
    // Minimal pill — only when absolutely needed (e.g. must be scannable over busy photo)
    return (
      <div style={{
        display: 'inline-block',
        background: dark ? 'rgba(255,255,255,0.15)' : BRAND.navy,
        backdropFilter: dark ? 'blur(12px)' : undefined,
        border: dark ? '1px solid rgba(255,255,255,0.25)' : 'none',
        color: dark ? BRAND.white : BRAND.white,
        fontSize: TYPE.s_xs,
        fontWeight: WEIGHT.semibold,
        letterSpacing: '0.14em',
        textTransform: 'uppercase' as const,
        padding: '14px 28px',
        borderRadius: 4,
        ...style,
      }}>
        {text}
      </div>
    )
  }

  // Default: pure typographic label — no box, no background
  return (
    <div style={{
      fontSize: TYPE.s_xs,
      fontWeight: WEIGHT.semibold,
      letterSpacing: '0.16em',
      textTransform: 'uppercase' as const,
      color: dark ? 'rgba(255,255,255,0.75)' : BRAND.gray,
      ...style,
    }}>
      {text}
    </div>
  )
}

// ── Thin rule — replaces GoldBar ─────────────────────────────────────────────
// Design rule: ONE thin horizontal rule per design as a structural divider.
// Width proportional to the column it lives in. Color matches text context.
export function Rule({ width = 40, dark = true, style }: { width?: number; dark?: boolean; style?: CSSProperties }) {
  return (
    <div style={{
      width,
      height: 1,
      background: dark ? 'rgba(255,255,255,0.35)' : BRAND.navy,
      ...style,
    }} />
  )
}

// ── Stat row — horizontal bed/bath/sqft ──────────────────────────────────────
// Design rule: stats appear as plain text with label below. No boxes or circles.
interface StatRowProps {
  listing: Listing
  dark?: boolean
  size?: 'sm' | 'md' | 'lg'
  separator?: boolean   // thin vertical rule between stats
  style?: CSSProperties
}
export function StatRow({ listing, dark = true, size = 'md', separator = true, style }: StatRowProps) {
  const stats = [
    listing.beds  && { val: listing.beds,  label: 'Bed' },
    listing.baths && { val: listing.baths, label: 'Bath' },
    listing.sqft  && { val: listing.sqft,  label: 'Sq Ft' },
  ].filter(Boolean) as { val: string; label: string }[]

  const sz = {
    sm: { val: TYPE.s_xs,  label: 18, gap: 28 },
    md: { val: TYPE.s_sm,  label: 20, gap: 36 },
    lg: { val: TYPE.s_base,label: 22, gap: 44 },
  }[size]

  const textColor  = dark ? BRAND.white                   : BRAND.navy
  const labelColor = dark ? 'rgba(255,255,255,0.55)'       : BRAND.gray
  const sepColor   = dark ? 'rgba(255,255,255,0.20)'       : BRAND.grayLight

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: sz.gap, ...style }}>
      {stats.map(({ val, label }, i) => (
        <React.Fragment key={i}>
          {separator && i > 0 && (
            <div style={{ width: 1, height: sz.val * 1.4, background: sepColor }} />
          )}
          <div>
            <div style={{ fontSize: sz.val, fontWeight: WEIGHT.semibold, color: textColor, lineHeight: 1 }}>
              {val}
            </div>
            <div style={{ fontSize: sz.label, fontWeight: WEIGHT.regular, color: labelColor, marginTop: 5, letterSpacing: '0.06em' }}>
              {label}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

// Alias for backward compatibility
export const StatBar = StatRow

// ── Agent attribution — small, confident ──────────────────────────────────────
// Design rule: agent info is the SMALLEST text on every social template.
// It should feel like a watermark, not a footer bar.
// NO colored background bands. Attribution sits directly on the surface.
interface AgentLineProps {
  listing: Listing
  dark?: boolean
  style?: CSSProperties
  align?: 'left' | 'right' | 'center'
}
export function AgentLine({ listing, dark = true, align = 'left', style }: AgentLineProps) {
  const textColor  = dark ? 'rgba(255,255,255,0.70)' : BRAND.gray
  const strongColor = dark ? 'rgba(255,255,255,0.90)' : BRAND.navy

  return (
    <div style={{ textAlign: align, ...style }}>
      <div style={{ fontSize: TYPE.s_xs, fontWeight: WEIGHT.medium, color: strongColor, letterSpacing: '0.02em' }}>
        {listing.agentName}
      </div>
      <div style={{ fontSize: TYPE.s_xs - 4, fontWeight: WEIGHT.regular, color: textColor, marginTop: 4, letterSpacing: '0.04em' }}>
        {listing.agentPhone}
        {listing.agentWebsite ? `  ·  ${listing.agentWebsite}` : ''}
      </div>
    </div>
  )
}

// ── Agent footer — for flyers only (not social) ────────────────────────────────
// Design rule: flyers may use a footer band because they're print documents.
// Social templates use AgentLine instead.
interface AgentFooterProps {
  listing: Listing
  bg?: string
  dark?: boolean
  style?: CSSProperties
}
export function AgentFooter({ listing, bg = BRAND.navy, dark = true, style }: AgentFooterProps) {
  const textColor  = dark ? BRAND.white                     : BRAND.navy
  const subColor   = dark ? 'rgba(255,255,255,0.55)'         : BRAND.gray

  return (
    <div style={{
      background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: `${M.flyer.item}px ${M.flyer.edge}px`,
      ...style,
    }}>
      <div>
        <div style={{ fontSize: TYPE.base, fontWeight: WEIGHT.semibold, color: textColor, letterSpacing: '0.01em' }}>
          {listing.agentName}
        </div>
        <div style={{ fontSize: TYPE.sm, color: subColor, marginTop: 3, letterSpacing: '0.04em' }}>
          {listing.brokerageName}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: TYPE.base, fontWeight: WEIGHT.medium, color: textColor }}>
          {listing.agentPhone}
        </div>
        <div style={{ fontSize: TYPE.sm, color: subColor, marginTop: 3 }}>
          {listing.agentWebsite}
        </div>
      </div>
    </div>
  )
}

// Keep StatusBadge alias for any templates still referencing it
export const StatusBadge = StatusLabel
export const GoldBar = Rule

// ── Price display ────────────────────────────────────────────────────────────
export function PriceDisplay({ price, dark = true, size = 'md', style }: {
  price: string
  dark?: boolean
  size?: 'sm' | 'md' | 'lg'
  style?: CSSProperties
}) {
  const sz = { sm: TYPE.s_sm, md: TYPE.s_md, lg: TYPE.s_xl }
  return (
    <div style={{
      fontSize: sz[size],
      fontWeight: WEIGHT.bold,
      color: dark ? BRAND.white : BRAND.navy,
      letterSpacing: '-0.025em',
      lineHeight: 1,
      ...style,
    }}>
      {price}
    </div>
  )
}
export const PriceTag = PriceDisplay

// ── Feature list ─────────────────────────────────────────────────────────────
export function FeatureList({ features, dark = false, max = 8, size = 'sm', style }: {
  features: string[]
  dark?: boolean
  max?: number
  size?: 'xs' | 'sm' | 'md'
  style?: CSSProperties
}) {
  const sz = { xs: TYPE.xs, sm: TYPE.sm, md: TYPE.base }
  const textColor = dark ? 'rgba(255,255,255,0.80)' : BRAND.gray

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}>
      {features.slice(0, max).map((f, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{
            width: 1, height: sz[size] * 1.1,
            background: dark ? 'rgba(255,255,255,0.25)' : BRAND.grayLight,
            flexShrink: 0, marginTop: 2,
          }} />
          <div style={{ fontSize: sz[size], color: textColor, lineHeight: 1.5, fontWeight: WEIGHT.regular }}>
            {f}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Logo ─────────────────────────────────────────────────────────────────────
// variant='dark' → full-color logo (for light backgrounds)
// variant='white' → all-white logo (for dark/photo backgrounds)
export function Logo({ variant = 'white', height = 40, style }: {
  variant?: 'white' | 'dark'
  height?: number
  style?: CSSProperties
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={variant === 'dark' ? '/logo-dark.png' : '/logo-white.png'}
      alt="Joe Leffew Properties | Keller Williams"
      crossOrigin="anonymous"
      style={{ height, width: 'auto', objectFit: 'contain', display: 'block', ...style }}
    />
  )
}

// ── Bottom zone — fixed address + stats + phone container ────────────────────
// Occupies the bottom ZONES.social.BOTTOM_H pixels. Always above bottom padding.
// Use `dark` for photo/navy backgrounds, `divider` for a rule at the top edge.
// Pass `style` to add background or other overrides (e.g. navyDeep for JustSold).
interface BottomZoneProps {
  listing: Listing
  dark?: boolean
  divider?: boolean
  zIndex?: number
  style?: CSSProperties
}
export function BottomZone({ listing, dark = true, divider = true, zIndex = 10, style }: BottomZoneProps) {
  const E = M.social.edge
  const textColor    = dark ? BRAND.white    : BRAND.navyDeep
  const subColor     = dark ? 'rgba(255,255,255,0.72)' : BRAND.navy
  const dividerColor = dark ? 'rgba(255,255,255,0.40)' : 'rgba(26,56,82,0.15)'
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: ZONES.social.BOTTOM_H,
      padding: `24px ${E}px ${E}px`,
      overflow: 'hidden',
      zIndex,
      ...style,
    }}>
      {divider && <div style={{ height: 1.5, background: dividerColor, marginBottom: 16 }} />}
      <div style={{
        fontSize: TYPE.s_sm, fontWeight: WEIGHT.bold, color: textColor,
        lineHeight: 1.02, letterSpacing: '-0.02em', fontFamily: FONT.display,
        marginBottom: 6, overflow: 'hidden',
      }}>
        {listing.address}
      </div>
      <div style={{ fontSize: TYPE.s_xs, color: subColor, letterSpacing: '0.02em', marginBottom: 20 }}>
        {listing.city}, {listing.state}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <StatRow listing={listing} dark={dark} size="sm" />
        <div style={{ fontSize: 18, color: subColor, letterSpacing: '0.04em' }}>
          {listing.agentPhone}
        </div>
      </div>
    </div>
  )
}

// ── Template wrapper ────────────────────────────────────────────────────────
interface TemplateWrapperProps {
  id: string
  width: number
  height: number
  scale?: number
  children: React.ReactNode
  style?: CSSProperties
}
export function TemplateWrapper({ id, width, height, scale = 1, children, style }: TemplateWrapperProps) {
  return (
    <div
      id={id}
      className="template-canvas"
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
        WebkitFontSmoothing: 'antialiased',
        flexShrink: 0,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
