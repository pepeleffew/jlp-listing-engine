'use client'
import React from 'react'
import { Listing } from '@/types'
import { BRAND, TYPE, WEIGHT, M, FONT } from '@/lib/templates/brand'
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
//  COMING SOON — photo-first, price as the visual hero
//  Small outlined badge at top-right. Price dominates mid-canvas.
// ════════════════════════════════════════════════════════════════════════════
interface ComingSoonProps { listing: Listing; variant?: 'dark' | 'light'; scale?: number; id?: string }

export function ComingSoonSquare({ listing, variant = 'dark', scale = 1, id }: ComingSoonProps) {
  const elementId = id || `tpl-coming-soon-square-${variant}`

  return (
    <TemplateWrapper id={elementId} width={W} height={H} scale={scale}>
      {/* Minimal tint — keep photo crisp */}
      <PhotoBg listing={listing} overlay="rgba(26,56,82,0.05)" />

      {/* Deep navy shelf at bottom — sharp transition, not a soft haze */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(26,56,82,0.97) 0%, rgba(26,56,82,0.97) 10%, rgba(26,56,82,0.74) 28%, rgba(26,56,82,0.18) 46%, transparent 60%)',
      }} />

      {/* Top: Logo left, outlined "Coming Soon" badge right */}
      <div style={{
        position: 'absolute', top: E, left: E, right: E,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 10,
      }}>
        <Logo variant="white" height={36} />
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          border: '1.5px solid rgba(255,255,255,0.38)',
          borderRadius: 100,
          padding: '8px 18px',
        }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: BRAND.navyLight, flexShrink: 0 }} />
          <div style={{
            fontSize: 13,
            fontWeight: WEIGHT.semibold,
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase' as const,
          }}>
            Coming Soon
          </div>
        </div>
      </div>

      {/* Price — center-stage hero, mid-canvas */}
      <div style={{ position: 'absolute', bottom: 290, left: E, right: E, zIndex: 10 }}>
        <div style={{
          fontSize: 12,
          fontWeight: WEIGHT.semibold,
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase' as const,
          marginBottom: 14,
        }}>
          Listed at
        </div>
        {listing.price ? (
          <div style={{
            fontSize: TYPE.s_3xl,
            fontWeight: WEIGHT.black,
            color: BRAND.white,
            lineHeight: 0.88,
            letterSpacing: '-0.04em',
            textShadow: '0 6px 48px rgba(26,56,82,0.95), 0 2px 12px rgba(26,56,82,0.70)',
          }}>
            {listing.price}
          </div>
        ) : (
          <div style={{
            fontSize: TYPE.s_xl,
            fontWeight: WEIGHT.black,
            color: BRAND.white,
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            fontFamily: FONT.display,
            textShadow: '0 4px 36px rgba(26,56,82,0.90), 0 1px 10px rgba(26,56,82,0.65)',
          }}>
            Details<br />Coming.
          </div>
        )}
      </div>

      {/* Bottom block: address + stats */}
      <div style={{ position: 'absolute', bottom: E, left: E, right: E, zIndex: 10 }}>
        <div style={{ width: 40, height: 2.5, background: BRAND.navyLight, marginBottom: 16 }} />
        <div style={{
          fontSize: TYPE.s_sm,
          fontWeight: WEIGHT.bold,
          color: BRAND.white,
          lineHeight: 1.05,
          letterSpacing: '-0.01em',
          fontFamily: FONT.display,
          marginBottom: 6,
          textShadow: '0 1px 12px rgba(26,56,82,0.55)',
        }}>
          {listing.address || 'Details Coming Soon'}
        </div>
        <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.42)', marginBottom: 16, letterSpacing: '0.02em' }}>
          {listing.city}, {listing.state}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <StatRow listing={listing} dark size="sm" />
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.42)', letterSpacing: '0.04em' }}>
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
      {/* Minimal tint — keep photo crisp, band provides its own contrast */}
      <PhotoBg listing={listing} overlay="rgba(26,56,82,0.10)" />

      {/* Diagonal steel-blue band — clean brand-aligned status signal */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          top: '50%', left: '-20%', right: '-20%',
          transform: 'translateY(-50%) rotate(-12deg)',
          background: BRAND.navyMid,
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
        background: 'linear-gradient(to top, rgba(26,56,82,0.96) 0%, rgba(26,56,82,0.96) 8%, rgba(26,56,82,0.60) 32%, transparent 54%)',
        padding: `80px ${E}px ${E}px`,
        zIndex: 5,
      }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.30)', marginBottom: 22 }} />
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
      {/* Minimal tint — photo clarity is the hook */}
      <PhotoBg listing={listing} overlay="rgba(26,56,82,0.05)" />

      {/* Deep flat-bottom shelf — price sits on solid dark, fades hard above */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(26,56,82,0.98) 0%, rgba(26,56,82,0.98) 12%, rgba(26,56,82,0.72) 26%, rgba(26,56,82,0.14) 44%, transparent 58%)',
      }} />

      {/* Logo — top left */}
      <div style={{ position: 'absolute', top: E, left: E, zIndex: 10 }}>
        <Logo variant="white" height={38} />
      </div>

      {/* SOLD stamp — rotated badge, bold celebration accent */}
      <div style={{
        position: 'absolute',
        top: E - 4, right: E,
        transform: 'rotate(-8deg)',
        zIndex: 10,
        padding: '10px 24px',
        border: '3px solid rgba(255,255,255,0.90)',
        borderRadius: 4,
      }}>
        <div style={{
          fontSize: 58,
          fontWeight: WEIGHT.black,
          color: BRAND.white,
          letterSpacing: '0.20em',
          textTransform: 'uppercase' as const,
          lineHeight: 1,
          textShadow: '0 2px 28px rgba(26,56,82,0.95)',
        }}>
          SOLD
        </div>
      </div>

      {/* "Sold for" + gold price — mid-canvas hero */}
      <div style={{
        position: 'absolute',
        bottom: 262, left: E, right: E,
        zIndex: 10,
      }}>
        <div style={{
          fontSize: 12,
          fontWeight: WEIGHT.semibold,
          color: 'rgba(255,255,255,0.72)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase' as const,
          marginBottom: 14,
        }}>
          {variant === 'gold-celebration' ? 'Sold for' : 'Closed at'}
        </div>
        {listing.price ? (
          <div style={{
            fontSize: 126,
            fontWeight: WEIGHT.black,
            color: BRAND.white,
            lineHeight: 0.87,
            letterSpacing: '-0.04em',
            textShadow: '0 8px 56px rgba(26,56,82,0.95), 0 2px 16px rgba(26,56,82,0.70)',
          }}>
            {listing.price}
          </div>
        ) : (
          <div style={{
            fontSize: TYPE.s_2xl,
            fontWeight: WEIGHT.black,
            color: BRAND.white,
            lineHeight: 0.90,
            letterSpacing: '-0.035em',
            fontFamily: FONT.display,
          }}>
            Beautifully<br />Sold.
          </div>
        )}
      </div>

      {/* Steel-blue footer */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: 136,
        background: BRAND.navyDeep,
        padding: `0 ${E}px`,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14,
        zIndex: 10,
      }}>
        <div style={{
          fontSize: TYPE.s_sm,
          fontWeight: WEIGHT.black,
          color: BRAND.white,
          lineHeight: 1.0,
          letterSpacing: '-0.01em',
          fontFamily: FONT.display,
        }}>
          {listing.address}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <StatRow listing={listing} dark size="sm" />
          <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.50)', letterSpacing: '0.02em' }}>
            {listing.agentPhone}
          </div>
        </div>
      </div>
    </TemplateWrapper>
  )
}
