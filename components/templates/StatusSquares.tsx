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
//  COMING SOON — editorial typographic treatment
//  Giant "Coming / Soon." type contrast. Photo darkened nearly to black.
// ════════════════════════════════════════════════════════════════════════════
interface ComingSoonProps { listing: Listing; variant?: 'dark' | 'light'; scale?: number; id?: string }

export function ComingSoonSquare({ listing, variant = 'dark', scale = 1, id }: ComingSoonProps) {
  const elementId = id || `tpl-coming-soon-square-${variant}`

  return (
    <TemplateWrapper id={elementId} width={W} height={H} scale={scale}>
      {/* Minimal base tint — photo reads clearly across the full canvas */}
      <PhotoBg listing={listing} overlay="rgba(0,0,0,0.10)" />

      {/* Bottom gradient — dark zone confined to bottom 36%, photo clear above */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(8,14,22,0.84) 0%, rgba(8,14,22,0.62) 18%, rgba(8,14,22,0.16) 34%, transparent 50%)',
      }} />

      {/* Top: Logo left, premium "Coming Soon" label right */}
      <div style={{
        position: 'absolute', top: E, left: E, right: E,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 10,
      }}>
        <Logo variant="white" height={36} />
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ width: 18, height: 1.5, background: BRAND.accentWarm }} />
          <div style={{
            fontSize: 17,
            fontWeight: WEIGHT.semibold,
            color: BRAND.accentWarm,
            letterSpacing: '0.16em',
            textTransform: 'uppercase' as const,
          }}>
            Coming Soon
          </div>
        </div>
      </div>

      {/* Bottom block: all typography anchored to dark zone */}
      <div style={{ position: 'absolute', bottom: E, left: E, right: E, zIndex: 10 }}>
        {/* Gold accent dash */}
        <div style={{ width: 48, height: 3, background: BRAND.accentWarm, marginBottom: 28 }} />

        {/* "Coming" — large italic ghost, recessive but cinematic */}
        <div style={{
          fontSize: TYPE.s_2xl,
          fontWeight: WEIGHT.bold,
          color: 'rgba(255,255,255,0.42)',
          lineHeight: 0.90,
          letterSpacing: '-0.025em',
          fontFamily: FONT.display,
          fontStyle: 'italic',
          marginBottom: 8,
          textShadow: '0 2px 20px rgba(0,0,0,0.5)',
        }}>
          Coming
        </div>

        {/* "SOON." — dominant cinematic anchor */}
        <div style={{
          fontSize: 140,
          fontWeight: WEIGHT.black,
          color: BRAND.white,
          lineHeight: 0.85,
          letterSpacing: '-0.04em',
          fontFamily: FONT.display,
          marginBottom: 32,
          textShadow: '0 6px 52px rgba(0,0,0,0.70)',
        }}>
          Soon.
        </div>

        {/* Price: second dominant, gold */}
        {listing.price && (
          <div style={{
            fontSize: TYPE.s_xl,
            fontWeight: WEIGHT.black,
            color: BRAND.accentWarm,
            letterSpacing: '-0.025em',
            lineHeight: 1.0,
            marginBottom: 20,
          }}>
            {listing.price}
          </div>
        )}

        {/* Rule */}
        <div style={{ height: 1, background: 'rgba(200,169,110,0.24)', marginBottom: 20 }} />

        {/* Address + stats */}
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
      {/* Light overlay — photo reads clearly, diagonal band creates contrast */}
      <PhotoBg listing={listing} overlay="rgba(0,0,0,0.18)" />

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
        background: 'linear-gradient(to top, rgba(10,17,26,0.78) 0%, rgba(10,17,26,0.44) 32%, transparent 58%)',
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
      {/* Minimal base tint — photo is the primary element */}
      <PhotoBg listing={listing} overlay="rgba(0,0,0,0.12)" />

      {/* Bottom gradient — dark zone confined to bottom 38% */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(10,17,26,0.82) 0%, rgba(10,17,26,0.56) 18%, rgba(10,17,26,0.14) 36%, transparent 50%)',
      }} />

      {/* Top: Logo left, small gold "Just Sold" badge right */}
      <div style={{
        position: 'absolute', top: E, left: E, right: E,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 10,
      }}>
        <Logo variant="white" height={38} />
        <div style={{
          display: 'inline-flex', alignItems: 'center',
          background: BRAND.accentWarm,
          borderRadius: 100, padding: '10px 24px',
          fontSize: 18, fontWeight: WEIGHT.black, color: BRAND.white,
          letterSpacing: '0.14em', textTransform: 'uppercase' as const,
        }}>
          Just Sold
        </div>
      </div>

      {/* Mid: "Sold for" label + gold price — floating above the dark zone */}
      <div style={{
        position: 'absolute',
        bottom: 300, left: E, right: E,
        zIndex: 10,
      }}>
        <div style={{
          fontSize: 13,
          fontWeight: WEIGHT.semibold,
          color: 'rgba(255,255,255,0.52)',
          letterSpacing: '0.20em',
          textTransform: 'uppercase' as const,
          marginBottom: 12,
        }}>
          {variant === 'gold-celebration' ? 'Sold for' : 'Closed at'}
        </div>
        {listing.price ? (
          <div style={{
            fontSize: TYPE.s_3xl,
            fontWeight: WEIGHT.black,
            color: BRAND.accentWarm,
            lineHeight: 0.88,
            letterSpacing: '-0.04em',
            textShadow: '0 6px 44px rgba(0,0,0,0.65)',
          }}>
            {listing.price}
          </div>
        ) : (
          <div style={{
            fontSize: TYPE.s_2xl,
            fontWeight: WEIGHT.black,
            color: BRAND.accentWarm,
            lineHeight: 0.90,
            letterSpacing: '-0.035em',
            fontFamily: FONT.display,
          }}>
            Beautifully<br />Sold.
          </div>
        )}
      </div>

      {/* Bottom: rule + address + stats */}
      <div style={{ position: 'absolute', bottom: E, left: E, right: E, zIndex: 10 }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.14)', marginBottom: 22 }} />
        <div style={{
          fontSize: TYPE.s_md,
          fontWeight: WEIGHT.bold,
          color: BRAND.white,
          lineHeight: 1.05,
          letterSpacing: '-0.015em',
          fontFamily: FONT.display,
          marginBottom: 18,
        }}>
          {listing.address}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <StatRow listing={listing} dark size="md" />
          <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.52)', letterSpacing: '0.04em' }}>
            {listing.agentPhone}
          </div>
        </div>
      </div>
    </TemplateWrapper>
  )
}
