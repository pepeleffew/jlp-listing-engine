'use client'
import React from 'react'
import { Listing } from '@/types'
import { BRAND, OVERLAY, TYPE, WEIGHT, M, FONT } from '@/lib/templates/brand'
import { PhotoBg, StatRow, TemplateWrapper, Logo } from '@/components/templates/shared'

// ─────────────────────────────────────────────────────────────────────────────
//  STATUS SQUARES — social performance rebuild
//
//  All three variants follow: HOOK BANNER → HERO TEXT → ADDRESS → STATS
//  Readability target: key info legible in < 2 seconds on a phone.
// ─────────────────────────────────────────────────────────────────────────────

const W = 1080, H = 1080
const E = M.social.edge

// Shared banner used by all status types
function Banner({ text, bg, textColor }: { text: string; bg: string; textColor: string }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0,
      background: bg,
      padding: '20px 60px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      zIndex: 10,
    }}>
      <div style={{
        fontSize: 28,
        fontWeight: WEIGHT.black,
        color: textColor,
        letterSpacing: '0.16em',
        textTransform: 'uppercase' as const,
      }}>
        {text}
      </div>
      <Logo variant={bg === BRAND.accentWarm ? 'white' : 'white'} height={42} />
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  COMING SOON
//  Navy banner builds suspense. Photo + overlay. No price (anticipation).
//  Large teaser text center. Address revealed, price hidden or shown.
// ════════════════════════════════════════════════════════════════════════════
interface ComingSoonProps { listing: Listing; variant?: 'dark' | 'light'; scale?: number; id?: string }

export function ComingSoonSquare({ listing, variant = 'dark', scale = 1, id }: ComingSoonProps) {
  const elementId = id || `tpl-coming-soon-square-${variant}`

  return (
    <TemplateWrapper id={elementId} width={W} height={H} scale={scale}>
      <PhotoBg listing={listing} overlay={OVERLAY.navyDeep} />

      {/* Navy banner — builds suspense, contrasts with gold Just Listed */}
      <Banner text="Coming Soon" bg={BRAND.navyDeep} textColor={BRAND.accentWarm} />

      {/* Center: teaser statement */}
      <div style={{
        position: 'absolute',
        top: '50%', left: E, right: E,
        transform: 'translateY(-58%)',
      }}>
        <div style={{
          fontSize: 20,
          fontWeight: WEIGHT.semibold,
          color: BRAND.accentWarm,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginBottom: 20,
        }}>
          Something special is coming
        </div>
        <div style={{
          fontSize: TYPE.s_3xl,
          fontWeight: WEIGHT.black,
          color: BRAND.white,
          lineHeight: 0.95,
          letterSpacing: '-0.03em',
          fontFamily: FONT.display,
        }}>
          {listing.city || 'Chattanooga'},{'\n'}
          {listing.state || 'TN'}
        </div>
        {listing.price && (
          <div style={{
            fontSize: TYPE.s_xl,
            fontWeight: WEIGHT.black,
            color: BRAND.accentWarm,
            letterSpacing: '-0.02em',
            marginTop: 24,
          }}>
            {listing.price}
          </div>
        )}
      </div>

      {/* Bottom: address + stats */}
      <div style={{ position: 'absolute', bottom: E, left: E, right: E }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.18)', marginBottom: 24 }} />
        <div style={{
          fontSize: TYPE.s_lg,
          fontWeight: WEIGHT.bold,
          color: BRAND.white,
          lineHeight: 1.05,
          letterSpacing: '-0.015em',
          marginBottom: 12,
          fontFamily: FONT.display,
        }}>
          {listing.address || 'Details Coming Soon'}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <StatRow listing={listing} dark size="md" />
          <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>
            {listing.agentPhone}
          </div>
        </div>
      </div>
    </TemplateWrapper>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  UNDER CONTRACT
//  Gold banner signals success. Strong overlay. Bold statement center.
//  Price shown — people always want to know what it went for.
// ════════════════════════════════════════════════════════════════════════════
interface UnderContractProps { listing: Listing; scale?: number; id?: string }

export function UnderContractSquare({ listing, scale = 1, id }: UnderContractProps) {
  const elementId = id || 'tpl-under-contract-square-default'

  return (
    <TemplateWrapper id={elementId} width={W} height={H} scale={scale}>
      <PhotoBg listing={listing} overlay={OVERLAY.strong} />

      <Banner text="Under Contract" bg={BRAND.accentWarm} textColor={BRAND.white} />

      {/* Center: large statement */}
      <div style={{
        position: 'absolute',
        top: '50%', left: E, right: E,
        transform: 'translateY(-58%)',
      }}>
        <div style={{ height: 3, background: BRAND.accentWarm, width: 60, marginBottom: 28 }} />
        <div style={{
          fontSize: TYPE.s_2xl,
          fontWeight: WEIGHT.black,
          color: BRAND.white,
          lineHeight: 0.95,
          letterSpacing: '-0.03em',
          fontFamily: FONT.display,
        }}>
          Under{'\n'}Contract.
        </div>
        <div style={{
          fontSize: TYPE.s_sm,
          fontWeight: WEIGHT.regular,
          color: 'rgba(255,255,255,0.65)',
          letterSpacing: '0.04em',
          marginTop: 24,
        }}>
          Another client's dream, delivered.
        </div>
      </div>

      {/* Bottom: address + price + stats */}
      <div style={{ position: 'absolute', bottom: E, left: E, right: E }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.18)', marginBottom: 24 }} />
        {listing.price && (
          <div style={{
            fontSize: TYPE.s_xl,
            fontWeight: WEIGHT.black,
            color: BRAND.white,
            letterSpacing: '-0.02em',
            marginBottom: 10,
          }}>
            {listing.price}
          </div>
        )}
        <div style={{
          fontSize: TYPE.s_md,
          fontWeight: WEIGHT.bold,
          color: BRAND.white,
          lineHeight: 1.05,
          letterSpacing: '-0.015em',
          marginBottom: 12,
          fontFamily: FONT.display,
        }}>
          {listing.address}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <StatRow listing={listing} dark size="sm" />
          <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>
            {listing.agentPhone}
          </div>
        </div>
      </div>
    </TemplateWrapper>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  JUST SOLD
//  Gold banner. "Sold for $X" is the hero — price is the entire center.
//  This is a celebration AND a proof-of-performance post.
// ════════════════════════════════════════════════════════════════════════════
interface JustSoldProps { listing: Listing; variant?: 'gold-celebration' | 'minimal'; scale?: number; id?: string }

export function JustSoldSquare({ listing, variant = 'gold-celebration', scale = 1, id }: JustSoldProps) {
  const elementId = id || `tpl-just-sold-square-${variant}`

  return (
    <TemplateWrapper id={elementId} width={W} height={H} scale={scale}>
      <PhotoBg listing={listing} overlay={OVERLAY.navyDeep} />

      <Banner text="Just Sold" bg={BRAND.accentWarm} textColor={BRAND.white} />

      {/* Center: sold price as the hero */}
      <div style={{
        position: 'absolute',
        top: '50%', left: E, right: E,
        transform: 'translateY(-58%)',
      }}>
        {listing.price ? (
          <>
            <div style={{
              fontSize: TYPE.s_sm,
              fontWeight: WEIGHT.semibold,
              color: 'rgba(255,255,255,0.65)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}>
              {variant === 'gold-celebration' ? 'Sold for' : 'Closed at'}
            </div>
            <div style={{
              fontSize: TYPE.s_3xl,
              fontWeight: WEIGHT.black,
              color: BRAND.accentWarm,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
            }}>
              {listing.price}
            </div>
          </>
        ) : (
          <>
            <div style={{ height: 3, background: BRAND.accentWarm, width: 60, marginBottom: 28 }} />
            <div style={{
              fontSize: TYPE.s_2xl,
              fontWeight: WEIGHT.black,
              color: BRAND.white,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              fontFamily: FONT.display,
            }}>
              {variant === 'gold-celebration' ? 'Beautifully\nSold.' : 'Just\nSold.'}
            </div>
          </>
        )}
        {variant === 'gold-celebration' && (
          <div style={{
            fontSize: TYPE.s_xs,
            fontWeight: WEIGHT.regular,
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '0.06em',
            marginTop: 28,
          }}>
            Another client served.
          </div>
        )}
      </div>

      {/* Bottom: address + stats */}
      <div style={{ position: 'absolute', bottom: E, left: E, right: E }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.18)', marginBottom: 24 }} />
        <div style={{
          fontSize: TYPE.s_lg,
          fontWeight: WEIGHT.bold,
          color: BRAND.white,
          lineHeight: 1.05,
          letterSpacing: '-0.015em',
          marginBottom: 12,
          fontFamily: FONT.display,
        }}>
          {listing.address}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <StatRow listing={listing} dark size="md" />
          <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>
            {listing.agentPhone}
          </div>
        </div>
      </div>
    </TemplateWrapper>
  )
}
