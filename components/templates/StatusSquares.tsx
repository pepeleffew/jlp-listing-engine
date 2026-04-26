'use client'
import React from 'react'
import { Listing } from '@/types'
import { BRAND, OVERLAY, TYPE, WEIGHT, M, FONT } from '@/lib/templates/brand'
import { PhotoBg, StatRow, TemplateWrapper, Logo } from '@/components/templates/shared'

// ─────────────────────────────────────────────────────────────────────────────
//  STATUS SQUARES — distinct design systems per status
//
//  Coming Soon  — editorial typographic hero, near-black overlay
//  Under Contract — diagonal gold stamp band across full photo
//  Just Sold    — gold price as massive full-canvas hero element
// ─────────────────────────────────────────────────────────────────────────────

const W = 1080, H = 1080
const E = M.social.edge

// ════════════════════════════════════════════════════════════════════════════
//  COMING SOON — editorial typographic treatment
//  Giant "Coming / Soon." type contrast. Photo darkened nearly to black.
// ════════════════════════════════════════════════════════════════════════════
interface ComingSoonProps { listing: Listing; variant?: 'dark' | 'light'; scale?: number; id?: string }

export function ComingSoonSquare({ listing, variant = 'dark', scale = 1, id }: ComingSoonProps) {
  const elementId = id || `tpl-coming-soon-square-${variant}`

  return (
    <TemplateWrapper id={elementId} width={W} height={H} scale={scale}>
      {/* Lighter diagonal gradient — photo is visible, not buried */}
      <PhotoBg
        listing={listing}
        overlay="linear-gradient(155deg, rgba(11,18,28,0.58) 0%, rgba(11,18,28,0.72) 55%, rgba(11,18,28,0.88) 100%)"
      />

      {/* Top: Logo left, small gold label right */}
      <div style={{
        position: 'absolute', top: E, left: E, right: E,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 10,
      }}>
        <Logo variant="white" height={36} />
        <div style={{
          fontSize: 16,
          fontWeight: WEIGHT.semibold,
          color: BRAND.accentWarm,
          letterSpacing: '0.22em',
          textTransform: 'uppercase' as const,
        }}>
          Coming Soon
        </div>
      </div>

      {/* Center: dramatic type hierarchy */}
      <div style={{
        position: 'absolute',
        top: '50%', left: E, right: E,
        transform: 'translateY(-52%)',
      }}>
        {/* Gold accent dash */}
        <div style={{ width: 44, height: 2, background: BRAND.accentWarm, marginBottom: 32 }} />

        {/* "Coming" — italic, bold enough to read, still recessive vs "Soon." */}
        <div style={{
          fontSize: TYPE.s_3xl,
          fontWeight: WEIGHT.bold,
          color: 'rgba(255,255,255,0.38)',
          lineHeight: 0.88,
          letterSpacing: '-0.02em',
          fontFamily: FONT.display,
          fontStyle: 'italic',
        }}>
          Coming
        </div>

        {/* Spacer — preserves drama between words */}
        <div style={{ height: 18 }} />

        {/* "Soon." — the dominant anchor */}
        <div style={{
          fontSize: TYPE.s_3xl,
          fontWeight: WEIGHT.black,
          color: BRAND.white,
          lineHeight: 0.88,
          letterSpacing: '-0.03em',
          fontFamily: FONT.display,
          marginBottom: 32,
        }}>
          Soon.
        </div>

        {/* Price: second most dominant element, sits directly under headline */}
        {listing.price && (
          <div style={{
            fontSize: TYPE.s_2xl,
            fontWeight: WEIGHT.black,
            color: BRAND.accentWarm,
            letterSpacing: '-0.025em',
            lineHeight: 1.0,
            marginBottom: 16,
          }}>
            {listing.price}
          </div>
        )}

        {/* City/state: supporting context, visually secondary */}
        <div style={{
          fontSize: TYPE.s_sm,
          fontWeight: WEIGHT.medium,
          color: 'rgba(255,255,255,0.48)',
          letterSpacing: '0.01em',
        }}>
          {listing.city || 'Chattanooga'}, {listing.state || 'TN'}
        </div>
      </div>

      {/* Bottom: gold rule + address + stats */}
      <div style={{ position: 'absolute', bottom: E, left: E, right: E }}>
        <div style={{ height: 1, background: 'rgba(200,169,110,0.32)', marginBottom: 26 }} />
        <div style={{
          fontSize: TYPE.s_sm,
          fontWeight: WEIGHT.bold,
          color: BRAND.white,
          lineHeight: 1.05,
          letterSpacing: '-0.01em',
          fontFamily: FONT.display,
          marginBottom: 14,
        }}>
          {listing.address || 'Details Coming Soon'}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <StatRow listing={listing} dark size="sm" />
          <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.58)', letterSpacing: '0.04em' }}>
            {listing.agentPhone}
          </div>
        </div>
      </div>
    </TemplateWrapper>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  UNDER CONTRACT — diagonal gold stamp
//  Bold rotated band cuts across the photo. Unmistakable status signal.
// ════════════════════════════════════════════════════════════════════════════
interface UnderContractProps { listing: Listing; scale?: number; id?: string }

export function UnderContractSquare({ listing, scale = 1, id }: UnderContractProps) {
  const elementId = id || 'tpl-under-contract-square-default'

  return (
    <TemplateWrapper id={elementId} width={W} height={H} scale={scale}>
      {/* Soft overlay — photo is still the hero */}
      <PhotoBg listing={listing} overlay="rgba(0,0,0,0.28)" />

      {/* Diagonal gold band — signature design element */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          top: '50%', left: '-20%', right: '-20%',
          transform: 'translateY(-50%) rotate(-12deg)',
          background: BRAND.accentWarm,
          padding: '44px 0',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}>
          <div style={{
            fontSize: 54,
            fontWeight: WEIGHT.black,
            color: BRAND.white,
            letterSpacing: '0.18em',
            textTransform: 'uppercase' as const,
          }}>
            Under Contract
          </div>
        </div>
      </div>

      {/* Logo top-left */}
      <div style={{ position: 'absolute', top: E, left: E, zIndex: 10 }}>
        <Logo variant="white" height={38} />
      </div>

      {/* Bottom gradient fade + address + stats */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, rgba(10,17,26,0.90) 0%, rgba(10,17,26,0.60) 40%, transparent 100%)',
        padding: `80px ${E}px ${E}px`,
        zIndex: 5,
      }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 22 }} />
        {listing.price && (
          <div style={{
            fontSize: TYPE.s_xl,
            fontWeight: WEIGHT.black,
            color: BRAND.white,
            letterSpacing: '-0.025em',
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
          fontFamily: FONT.display,
          marginBottom: 12,
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
//  JUST SOLD — gold price as the full-canvas hero
//  The number IS the post. Logo + pill badge top. Address bottom.
// ════════════════════════════════════════════════════════════════════════════
interface JustSoldProps { listing: Listing; variant?: 'gold-celebration' | 'minimal'; scale?: number; id?: string }

export function JustSoldSquare({ listing, variant = 'gold-celebration', scale = 1, id }: JustSoldProps) {
  const elementId = id || `tpl-just-sold-square-${variant}`

  return (
    <TemplateWrapper id={elementId} width={W} height={H} scale={scale}>
      <PhotoBg listing={listing} overlay={OVERLAY.navyDeep} />

      {/* Top: Logo left, gold pill right */}
      <div style={{
        position: 'absolute', top: E, left: E, right: E,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 10,
      }}>
        <Logo variant="white" height={38} />
        <div style={{
          background: BRAND.accentWarm,
          borderRadius: 100, padding: '12px 28px',
          fontSize: 20, fontWeight: WEIGHT.black, color: BRAND.white,
          letterSpacing: '0.14em', textTransform: 'uppercase' as const,
        }}>
          Just Sold
        </div>
      </div>

      {/* Center: price as the hero element */}
      <div style={{
        position: 'absolute',
        top: '50%', left: E, right: E,
        transform: 'translateY(-52%)',
      }}>
        {listing.price ? (
          <>
            <div style={{
              fontSize: TYPE.s_xs,
              fontWeight: WEIGHT.semibold,
              color: 'rgba(255,255,255,0.50)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase' as const,
              marginBottom: 14,
            }}>
              {variant === 'gold-celebration' ? 'Sold for' : 'Closed at'}
            </div>
            <div style={{
              fontSize: TYPE.s_3xl,
              fontWeight: WEIGHT.black,
              color: BRAND.accentWarm,
              lineHeight: 0.90,
              letterSpacing: '-0.03em',
            }}>
              {listing.price}
            </div>
            {variant === 'gold-celebration' && (
              <div style={{
                fontSize: TYPE.s_xs,
                fontWeight: WEIGHT.regular,
                color: 'rgba(255,255,255,0.38)',
                letterSpacing: '0.08em',
                marginTop: 32,
              }}>
                Another client served.
              </div>
            )}
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
          fontFamily: FONT.display,
          marginBottom: 12,
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
