import React from 'react'
import { Listing } from '@/types'
import { BRAND, OVERLAY, TYPE, WEIGHT, M } from '@/lib/templates/brand'
import { PhotoBg, StatusLabel, Rule, StatRow, AgentLine, PriceDisplay, TemplateWrapper } from '@/components/templates/shared'

const W = 1080, H = 1080
const E = M.social.edge

// ════════════════════════════════════════════════════════════════════════════
//  COMING SOON — 1080 × 1080
//
//  Old: 88px stacked "Coming/Soon" type + glowing gold blur orb + heavy shadow
//  New: Confident, typographic. The phrase is set in restrained type.
//      The word "Soon" is differentiated by weight, not color.
//      No glow effects. No decoration. The message is the design.
// ════════════════════════════════════════════════════════════════════════════
interface ComingSoonProps { listing: Listing; variant?: 'dark' | 'light'; scale?: number; id?: string }

export function ComingSoonSquare({ listing, variant = 'dark', scale = 1, id }: ComingSoonProps) {
  const elementId = id || `tpl-coming-soon-square-${variant}`
  const isDark = variant === 'dark'

  const bg          = isDark ? BRAND.navy   : BRAND.offWhite
  const headColor   = isDark ? BRAND.white  : BRAND.navy
  const subColor    = isDark ? 'rgba(255,255,255,0.50)' : BRAND.gray
  const ruleColor   = isDark ? 'rgba(255,255,255,0.20)' : BRAND.grayLight

  return (
    <TemplateWrapper id={elementId} width={W} height={H} scale={scale}>
      {isDark
        ? <PhotoBg listing={listing} overlay={OVERLAY.navyDeep} />
        : <div style={{ position: 'absolute', inset: 0, background: bg }} />
      }

      {/* Top: status label */}
      <div style={{ position: 'absolute', top: E, left: E }}>
        <StatusLabel text="Coming Soon" dark={isDark} />
      </div>

      {/* Center: the phrase — typographic restraint */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        padding: `0 ${E}px`,
        textAlign: 'left',
      }}>
        {/* "Coming" — light weight */}
        <div style={{
          fontSize: TYPE.s_3xl,
          fontWeight: WEIGHT.light,
          color: headColor,
          lineHeight: 0.95,
          letterSpacing: '-0.04em',
        }}>
          Coming
        </div>
        {/* "Soon" — bold weight, same color. Weight IS the accent. */}
        <div style={{
          fontSize: TYPE.s_3xl,
          fontWeight: WEIGHT.black,
          color: headColor,
          lineHeight: 0.95,
          letterSpacing: '-0.04em',
        }}>
          Soon.
        </div>
      </div>

      {/* Bottom: address + details */}
      <div style={{ position: 'absolute', bottom: E, left: E, right: E }}>
        <div style={{ height: 1, background: ruleColor, marginBottom: 24 }} />
        <div style={{
          fontSize: TYPE.s_md,
          fontWeight: WEIGHT.black,
          color: headColor,
          lineHeight: 1.02,
          letterSpacing: '-0.03em',
          marginBottom: 12,
        }}>
          {listing.address}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: TYPE.s_xs - 4, color: subColor, marginBottom: 14, letterSpacing: '0.01em' }}>
              {listing.city}, {listing.state}
              {listing.price ? `  ·  ${listing.price}` : ''}
            </div>
            <StatRow listing={listing} dark={isDark} size="sm" />
          </div>
          <AgentLine listing={listing} dark={isDark} align="right" />
        </div>
      </div>
    </TemplateWrapper>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  UNDER CONTRACT — 1080 × 1080
//
//  Old: Rotated gold diagonal banner with box-shadow. Carnival aesthetic.
//  New: A single large typographic statement. "Under Contract" in bold type,
//       set flush left across the canvas. The confidence is in the scale,
//       not in a decorative ribbon.
// ════════════════════════════════════════════════════════════════════════════
interface UnderContractProps { listing: Listing; scale?: number; id?: string }

export function UnderContractSquare({ listing, scale = 1, id }: UnderContractProps) {
  const elementId = id || 'tpl-under-contract-square-default'

  return (
    <TemplateWrapper id={elementId} width={W} height={H} scale={scale}>
      {/* Photo with strong overlay — text must dominate */}
      <PhotoBg listing={listing} overlay={OVERLAY.strong} />

      {/* Top: status */}
      <div style={{ position: 'absolute', top: E, left: E }}>
        <StatusLabel text="Status Update" dark />
      </div>

      {/* Center-left: the statement in large, confident type */}
      <div style={{
        position: 'absolute',
        top: '50%', left: E, right: E,
        transform: 'translateY(-55%)',
      }}>
        {/* "Under" — light */}
        <div style={{
          fontSize: TYPE.s_2xl,
          fontWeight: WEIGHT.light,
          color: BRAND.white,
          lineHeight: 0.92,
          letterSpacing: '-0.035em',
        }}>
          Under
        </div>
        {/* "Contract." — black, period for finality */}
        <div style={{
          fontSize: TYPE.s_2xl,
          fontWeight: WEIGHT.black,
          color: BRAND.white,
          lineHeight: 0.92,
          letterSpacing: '-0.035em',
        }}>
          Contract.
        </div>
      </div>

      {/* Bottom */}
      <div style={{ position: 'absolute', bottom: E, left: E, right: E }}>
        <Rule width={48} dark style={{ marginBottom: 24 }} />
        <div style={{
          fontSize: TYPE.s_md,
          fontWeight: WEIGHT.black,
          color: BRAND.white,
          lineHeight: 1.02,
          letterSpacing: '-0.03em',
          marginBottom: 12,
        }}>
          {listing.address}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: TYPE.s_xs - 4, color: 'rgba(255,255,255,0.55)', marginBottom: 14 }}>
              {listing.city}, {listing.state}
              {listing.price ? `  ·  ${listing.price}` : ''}
            </div>
            <StatRow listing={listing} dark size="sm" />
          </div>
          <AgentLine listing={listing} dark align="right" />
        </div>
      </div>
    </TemplateWrapper>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  JUST SOLD — 1080 × 1080
//
//  Old (gold-celebration): 130px glowing "SOLD" with textShadow glow. Garish.
//  Old (minimal): Bordered box around "SOLD" — unnecessary frame.
//  New: "Sold." as a typographic statement. Same pattern as Under Contract.
//       Weight contrast IS the design. No glow, no borders, no celebration.
//       The restraint is the sophistication.
// ════════════════════════════════════════════════════════════════════════════
interface JustSoldProps { listing: Listing; variant?: 'gold-celebration' | 'minimal'; scale?: number; id?: string }

export function JustSoldSquare({ listing, variant = 'gold-celebration', scale = 1, id }: JustSoldProps) {
  const elementId = id || `tpl-just-sold-square-${variant}`

  // Both variants use the same restrained approach — variant drives overlay darkness
  const overlayColor = variant === 'gold-celebration' ? OVERLAY.strong : OVERLAY.navy

  return (
    <TemplateWrapper id={elementId} width={W} height={H} scale={scale}>
      <PhotoBg listing={listing} overlay={overlayColor} />

      {/* Status */}
      <div style={{ position: 'absolute', top: E, left: E }}>
        <StatusLabel text="Just Sold" dark />
      </div>

      {/* The statement */}
      <div style={{
        position: 'absolute',
        top: '50%', left: E, right: E,
        transform: 'translateY(-55%)',
      }}>
        <div style={{
          fontSize: TYPE.s_2xl,
          fontWeight: WEIGHT.light,
          color: BRAND.white,
          lineHeight: 0.92,
          letterSpacing: '-0.035em',
        }}>
          {variant === 'gold-celebration' ? 'Beautifully' : 'Just'}
        </div>
        <div style={{
          fontSize: TYPE.s_2xl,
          fontWeight: WEIGHT.black,
          color: BRAND.white,
          lineHeight: 0.92,
          letterSpacing: '-0.035em',
        }}>
          {variant === 'gold-celebration' ? 'Sold.' : 'Sold.'}
        </div>
        {variant === 'gold-celebration' && (
          <div style={{
            fontSize: TYPE.s_xs,
            fontWeight: WEIGHT.regular,
            color: BRAND.accentWarm,
            letterSpacing: '0.06em',
            marginTop: 28,
          }}>
            Another client served.
          </div>
        )}
      </div>

      {/* Bottom */}
      <div style={{ position: 'absolute', bottom: E, left: E, right: E }}>
        <Rule width={48} dark style={{ marginBottom: 24 }} />
        <div style={{
          fontSize: TYPE.s_md,
          fontWeight: WEIGHT.black,
          color: BRAND.white,
          lineHeight: 1.02,
          letterSpacing: '-0.03em',
          marginBottom: 12,
        }}>
          {listing.address}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: TYPE.s_xs - 4, color: 'rgba(255,255,255,0.55)', marginBottom: 14 }}>
              {listing.city}, {listing.state}
              {listing.price ? `  ·  ${listing.price}` : ''}
            </div>
            <StatRow listing={listing} dark size="sm" />
          </div>
          <AgentLine listing={listing} dark align="right" />
        </div>
      </div>
    </TemplateWrapper>
  )
}
