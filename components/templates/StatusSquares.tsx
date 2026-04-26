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
      {/* Light base tint — photo reads clearly in upper 55% of canvas */}
      <PhotoBg listing={listing} overlay="rgba(0,0,0,0.25)" />

      {/* Bottom gradient — creates dark text zone, photo clear above */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(8,14,22,1.00) 0%, rgba(8,14,22,0.97) 28%, rgba(8,14,22,0.65) 48%, transparent 68%)',
      }} />

      {/* Top: Logo left, small gold label right — floats on clear photo */}
      <div style={{
        position: 'absolute', top: E, left: E, right: E,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 10,
      }}>
        <Logo variant="white" height={36} />
        <div style={{
          fontSize: 15,
          fontWeight: WEIGHT.semibold,
          color: BRAND.accentWarm,
          letterSpacing: '0.24em',
          textTransform: 'uppercase' as const,
        }}>
          Coming Soon
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
        }}>
          Coming
        </div>

        {/* "SOON." — the dominant cinematic anchor, oversized beyond scale */}
        <div style={{
          fontSize: 140,
          fontWeight: WEIGHT.black,
          color: BRAND.white,
          lineHeight: 0.85,
          letterSpacing: '-0.04em',
          fontFamily: FONT.display,
          marginBottom: 32,
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
  const PHOTO_H = 580
  const photo = listing.photos.find(p => p.id === listing.primaryPhotoId) || listing.photos[0]

  return (
    <TemplateWrapper id={elementId} width={W} height={H} scale={scale}>

      {/* Photo zone — top 580px, light overlay so photo is clearly visible */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: PHOTO_H, overflow: 'hidden' }}>
        {photo?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: BRAND.navyMid }} />
        )}
        {/* Light overlay — photo is the hero, warm bottom fade into gold panel */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.10) 55%, rgba(180,130,70,0.55) 100%)',
        }} />

        {/* Logo + pill badge float over photo */}
        <div style={{
          position: 'absolute', top: E, left: E, right: E,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          zIndex: 10,
        }}>
          <Logo variant="white" height={38} />
          <div style={{
            background: BRAND.navyDeep,
            borderRadius: 100, padding: '12px 28px',
            fontSize: 20, fontWeight: WEIGHT.black, color: BRAND.white,
            letterSpacing: '0.14em', textTransform: 'uppercase' as const,
          }}>
            Just Sold
          </div>
        </div>
      </div>

      {/* Gold celebration zone — bottom panel */}
      <div style={{
        position: 'absolute',
        top: PHOTO_H, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(160deg, #c8a96e 0%, #b8956a 55%, #a07c55 100%)',
        padding: `32px ${E}px ${E}px`,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div>
          {/* "Sold for" label */}
          <div style={{
            fontSize: 13,
            fontWeight: WEIGHT.semibold,
            color: 'rgba(17,31,53,0.60)',
            letterSpacing: '0.20em',
            textTransform: 'uppercase' as const,
            marginBottom: 10,
          }}>
            {variant === 'gold-celebration' ? 'Sold for' : 'Closed at'}
          </div>

          {/* Price — dominant navy on gold */}
          {listing.price ? (
            <div style={{
              fontSize: TYPE.s_3xl,
              fontWeight: WEIGHT.black,
              color: BRAND.navyDeep,
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              marginBottom: 20,
            }}>
              {listing.price}
            </div>
          ) : (
            <div style={{
              fontSize: TYPE.s_2xl,
              fontWeight: WEIGHT.black,
              color: BRAND.navyDeep,
              lineHeight: 0.90,
              letterSpacing: '-0.035em',
              fontFamily: FONT.display,
              marginBottom: 20,
            }}>
              Beautifully<br />Sold.
            </div>
          )}

          {/* Address */}
          <div style={{
            fontSize: TYPE.s_sm,
            fontWeight: WEIGHT.bold,
            color: BRAND.navyDeep,
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            fontFamily: FONT.display,
            opacity: 0.85,
          }}>
            {listing.address}
          </div>
        </div>

        {/* Stats row + phone — dark navy on gold */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <StatRow listing={listing} dark={false} size="md" />
          <div style={{ fontSize: 20, color: 'rgba(17,31,53,0.60)', letterSpacing: '0.04em' }}>
            {listing.agentPhone}
          </div>
        </div>
      </div>
    </TemplateWrapper>
  )
}
