'use client'
import React from 'react'
import { Listing } from '@/types'
import { BRAND, TYPE, WEIGHT, M, FONT } from '@/lib/templates/brand'
import { PhotoBg, StatRow, TemplateWrapper, Logo } from '@/components/templates/shared'

// ─────────────────────────────────────────────────────────────────────────────
//  JUST LISTED — 1080 × 1080
//
//  Each variant is a distinct design system:
//  A: Dark Overlay  — floating white price card on photo gradient
//  B: Split Panel   — left navy editorial strip, photo fills right
//  C: Minimal White — luxury print-ad with framed photo
// ─────────────────────────────────────────────────────────────────────────────

const W = 1080
const H = 1080

interface Props {
  listing: Listing
  variant?: 'dark-overlay' | 'split-panel' | 'minimal-white'
  scale?: number
  id?: string
}

// ── Variant A: Dark Overlay ───────────────────────────────────────────────────
// Photo clearly visible in top 60%. Distinct dark text zone at bottom.
// Two separate overlay layers: light global tint + heavy bottom gradient.
function DarkOverlay({ listing }: { listing: Listing }) {
  const E = M.social.edge

  return (
    <>
      {/* Near-invisible steel-blue tint */}
      <PhotoBg listing={listing} overlay="rgba(26,56,82,0.06)" />

      {/* Steel-blue bottom gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(26,56,82,0.92) 0%, rgba(26,56,82,0.70) 20%, rgba(26,56,82,0.24) 40%, transparent 58%)',
      }} />

      {/* Left vertical gold stripe — compositional anchor, asymmetric structure */}
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 6, background: BRAND.accentWarm, zIndex: 10 }} />

      {/* Top: small tracked label left, Logo right */}
      <div style={{
        position: 'absolute', top: E, left: E, right: E, zIndex: 10,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{
          fontSize: 13, fontWeight: WEIGHT.black, color: BRAND.accentWarm,
          letterSpacing: '0.22em', textTransform: 'uppercase' as const,
        }}>
          Just Listed
        </div>
        <Logo variant="white" height={38} />
      </div>

      {/* Price — its own focal layer, ~90px of white space separates it from the address block below */}
      <div style={{ position: 'absolute', bottom: 290, left: E, right: E, zIndex: 10 }}>
        {listing.price && (
          <>
            <div style={{
              fontSize: 12, fontWeight: WEIGHT.semibold, color: BRAND.accentWarm,
              letterSpacing: '0.22em', textTransform: 'uppercase' as const, marginBottom: 12,
            }}>
              Listed at
            </div>
            <div style={{
              fontSize: 122,
              fontWeight: WEIGHT.black,
              color: BRAND.white,
              lineHeight: 0.86,
              letterSpacing: '-0.045em',
              textShadow: '0 4px 40px rgba(0,0,0,0.65)',
            }}>
              {listing.price}
            </div>
          </>
        )}
      </div>

      {/* Address + stats — intentionally smaller than price, anchored at foot */}
      <div style={{ position: 'absolute', bottom: E, left: E, right: E, zIndex: 10 }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.16)', marginBottom: 20 }} />
        <div style={{
          fontSize: TYPE.s_md, fontWeight: WEIGHT.bold, color: BRAND.white,
          lineHeight: 1.02, letterSpacing: '-0.02em', fontFamily: FONT.display, marginBottom: 10,
          textShadow: '0 2px 18px rgba(0,0,0,0.50)',
        }}>
          {listing.address}
        </div>
        <div style={{ fontSize: TYPE.s_xs, color: 'rgba(255,255,255,0.52)', letterSpacing: '0.02em', marginBottom: 22 }}>
          {listing.city}, {listing.state}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <StatRow listing={listing} dark size="md" />
          <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.48)', letterSpacing: '0.04em' }}>
            {listing.agentPhone}
          </div>
        </div>
      </div>
    </>
  )
}

// ── Variant B: Split Panel ────────────────────────────────────────────────────
// Left navy editorial strip. Right photo fills to edge. Magazine layout.
function SplitPanel({ listing }: { listing: Listing }) {
  const E = M.social.edge
  const photo = listing.photos.find(p => p.id === listing.primaryPhotoId) || listing.photos[0]

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>

      {/* Left navy strip */}
      <div style={{
        width: 340,
        flexShrink: 0,
        background: BRAND.navyDeep,
        padding: `${E}px 36px`,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        zIndex: 1,
      }}>
        {/* Logo + badge */}
        <div>
          <Logo variant="white" height={34} style={{ marginBottom: 28 }} />
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            background: BRAND.accentWarm,
            borderRadius: 100, padding: '10px 22px',
          }}>
            <div style={{
              fontSize: 18,
              fontWeight: WEIGHT.black,
              color: BRAND.white,
              letterSpacing: '0.14em',
              textTransform: 'uppercase' as const,
            }}>
              Just Listed
            </div>
          </div>
        </div>

        {/* Price + address */}
        <div>
          {listing.price && (
            <div style={{
              fontSize: TYPE.s_2xl,
              fontWeight: WEIGHT.black,
              color: BRAND.white,
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
              marginBottom: 22,
            }}>
              {listing.price}
            </div>
          )}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.10)', marginBottom: 22 }} />
          <div style={{
            fontSize: TYPE.s_sm,
            fontWeight: WEIGHT.bold,
            color: BRAND.white,
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            fontFamily: FONT.display,
            marginBottom: 10,
          }}>
            {listing.address}
          </div>
          <div style={{ fontSize: TYPE.s_xs - 4, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.02em' }}>
            {listing.city}, {listing.state}
          </div>
        </div>

        {/* Stats + phone */}
        <div>
          <StatRow listing={listing} dark size="sm" />
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.45)', marginTop: 14, letterSpacing: '0.02em' }}>
            {listing.agentPhone}
          </div>
        </div>
      </div>

      {/* Right: full-bleed photo */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {photo?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: BRAND.navyMid }} />
        )}
        {/* Subtle left fade into navy strip */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,56,82,0.45) 0%, transparent 28%)' }} />
      </div>
    </div>
  )
}

// ── Variant C: Minimal White ──────────────────────────────────────────────────
// Luxury print-ad aesthetic. Gold accent bar. Framed photo with shadow.
function MinimalWhite({ listing }: { listing: Listing }) {
  const E = M.social.edge
  const photo = listing.photos.find(p => p.id === listing.primaryPhotoId) || listing.photos[0]
  const PHOTO_TOP = 86
  const PHOTO_H   = 556

  return (
    <div style={{ position: 'absolute', inset: 0, background: BRAND.stone }}>

      {/* Gold accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: BRAND.accentWarm }} />

      {/* Header row */}
      <div style={{
        position: 'absolute', top: 6, left: E, right: E, height: 80,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{
          fontSize: 13,
          fontWeight: WEIGHT.black,
          color: BRAND.navy,
          letterSpacing: '0.22em',
          textTransform: 'uppercase' as const,
        }}>
          Just Listed
        </div>
        <Logo variant="dark" height={34} />
      </div>

      {/* Framed photo — rounded corners + deep shadow */}
      <div style={{
        position: 'absolute',
        top: PHOTO_TOP, left: 28, right: 28,
        height: PHOTO_H,
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 12px 52px rgba(26,56,82,0.22)',
      }}>
        {photo?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: BRAND.navy }} />
        )}
      </div>

      {/* Info panel */}
      <div style={{
        position: 'absolute',
        top: PHOTO_TOP + PHOTO_H + 24,
        left: E, right: E, bottom: E,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div>
          {/* Gold rule between photo and info */}
          <div style={{ width: 36, height: 2, background: BRAND.accentWarm, marginBottom: 18 }} />
          {listing.price && (
            <div style={{
              fontSize: TYPE.s_2xl,
              fontWeight: WEIGHT.black,
              color: BRAND.navy,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              marginBottom: 14,
            }}>
              {listing.price}
            </div>
          )}
          <div style={{
            fontSize: TYPE.s_sm,
            fontWeight: WEIGHT.bold,
            color: BRAND.navy,
            lineHeight: 1.05,
            letterSpacing: '-0.015em',
            fontFamily: FONT.display,
            marginBottom: 8,
          }}>
            {listing.address}
          </div>
          <div style={{ fontSize: TYPE.s_xs, color: BRAND.gray, letterSpacing: '0.03em' }}>
            {listing.city}, {listing.state}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <StatRow listing={listing} dark={false} size="sm" />
          <div style={{ fontSize: 18, color: BRAND.gray, letterSpacing: '0.04em' }}>
            {listing.agentPhone}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function JustListedSquare({ listing, variant = 'dark-overlay', scale = 1, id }: Props) {
  const elementId = id || `tpl-just-listed-square-${variant}`
  return (
    <TemplateWrapper id={elementId} width={W} height={H} scale={scale}>
      {variant === 'dark-overlay'  && <DarkOverlay  listing={listing} />}
      {variant === 'split-panel'   && <SplitPanel   listing={listing} />}
      {variant === 'minimal-white' && <MinimalWhite listing={listing} />}
    </TemplateWrapper>
  )
}
