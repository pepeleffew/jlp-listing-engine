import React from 'react'
import { Listing } from '@/types'
import { BRAND, OVERLAY, TYPE, WEIGHT, M, FONT } from '@/lib/templates/brand'
import { PhotoBg, StatusLabel, Rule, StatRow, AgentLine, PriceDisplay, TemplateWrapper, Logo } from '@/components/templates/shared'

// ─────────────────────────────────────────────────────────────────────────────
//  JUST LISTED — 1080 × 1080
//
//  Design audit results and what changed:
//
//  OLD problems:
//  - GoldBar decorative element (visual noise)
//  - Stacked overlay + gradient (redundant)
//  - AgentFooter colored band (fractures the photo)
//  - 8 information items competing (address + city + price + 3 stats + name + phone)
//  - Gold badge with heavy letterSpacing (looks aggressive)
//
//  NEW design principles applied:
//  1. PHOTO FIRST — overlay is a single bottom-fade, never stacked
//  2. MAX 4 INFO ITEMS — address, city/price, stats, agent attribution
//  3. AGENT AS FOOTNOTE — small, unobtrusive, no background band
//  4. NO DECORATIVE ELEMENTS — one thin rule provides structure
//  5. STATUS LABEL IS TYPOGRAPHIC — small caps tracking, not a pill badge
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
// The signature template. Full-bleed photo, single gradient, text at base.
// Inspired by: Compass listing posts, The Agency, Christie's International.
function DarkOverlay({ listing }: { listing: Listing }) {
  const E = M.social.edge

  return (
    <>
      {/* Full-bleed photo with single bottom-fade overlay — nothing else */}
      <PhotoBg listing={listing} overlay={OVERLAY.fadeBottom} />

      {/* Status — typographic, no box, top-left */}
      <div style={{ position: 'absolute', top: E, left: E }}>
        <StatusLabel text="Just Listed" dark />
      </div>

      {/* Agent website — top-right, minimal */}
      <div style={{ position: 'absolute', top: E, right: E }}>
        <div style={{
          fontSize: TYPE.s_xs - 4,
          fontWeight: WEIGHT.regular,
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.04em',
        }}>
          {listing.agentWebsite}
        </div>
      </div>

      {/* Bottom content — sits inside the fade, never needs its own background */}
      <div style={{ position: 'absolute', bottom: E, left: E, right: E }}>

        {/* Thin structural rule — the only non-typographic element */}
        <Rule width={48} dark style={{ marginBottom: 28 }} />

        {/* Address — the largest element, bold, tight tracking */}
        <div style={{
          fontSize: TYPE.s_xl,
          fontWeight: WEIGHT.black,
          color: BRAND.white,
          lineHeight: 1.02,
          letterSpacing: '-0.015em',
          marginBottom: 16,
          fontFamily: FONT.display,
        }}>
          {listing.address}
        </div>

        {/* City + price on one line — secondary hierarchy */}
        <div style={{
          fontSize: TYPE.s_sm,
          fontWeight: WEIGHT.regular,
          color: 'rgba(255,255,255,0.72)',
          letterSpacing: '0.01em',
          marginBottom: 32,
        }}>
          {listing.city}, {listing.state}
          {listing.price ? `  ·  ${listing.price}` : ''}
        </div>

        {/* Stats + logo/phone — balanced left/right */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <StatRow listing={listing} dark size="sm" />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
            <Logo variant="white" height={42} />
            <div style={{ fontSize: TYPE.s_xs - 4, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>
              {listing.agentPhone}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ── Variant B: Split Panel ────────────────────────────────────────────────────
// Photo top 58%, pure navy bottom 42%. Clean panel break — no gold seam.
// The seam IS the transition. Negative space is the accent.
function SplitPanel({ listing }: { listing: Listing }) {
  const PHOTO_PCT = 58
  const PANEL_H = H * (1 - PHOTO_PCT / 100)
  const E = M.social.edge

  return (
    <>
      {/* Photo — top portion, very subtle overlay for the seam transition */}
      <PhotoBg
        listing={listing}
        overlay={`linear-gradient(to bottom, transparent 60%, rgba(17,31,53,0.95) 100%)`}
        style={{ bottom: `${100 - PHOTO_PCT}%` }}
      />

      {/* Navy panel — bottom portion */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: PANEL_H,
        background: BRAND.navy,
        padding: `${M.social.section}px ${E}px ${E}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div>
          {/* Status — small, on the panel, no box */}
          <StatusLabel text="Just Listed" dark style={{ marginBottom: 18 }} />

          {/* Address */}
          <div style={{
            fontSize: TYPE.s_lg,
            fontWeight: WEIGHT.black,
            color: BRAND.white,
            lineHeight: 1.05,
            letterSpacing: '-0.015em',
            fontFamily: FONT.display,
          }}>
            {listing.address}
          </div>

          {/* City + State */}
          <div style={{
            fontSize: TYPE.s_xs,
            fontWeight: WEIGHT.regular,
            color: 'rgba(255,255,255,0.55)',
            marginTop: 12,
            letterSpacing: '0.02em',
          }}>
            {listing.city}, {listing.state}
          </div>
        </div>

        {/* Bottom row: price left, stats right */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <PriceDisplay price={listing.price} dark size="md" />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
            <StatRow listing={listing} dark size="sm" />
            <Logo variant="white" height={34} />
            <div style={{ fontSize: TYPE.s_xs - 6, color: 'rgba(255,255,255,0.50)', letterSpacing: '0.03em' }}>
              {listing.agentPhone}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ── Variant C: Minimal White ──────────────────────────────────────────────────
// Light-mode. Photo dominant top 62%. White panel below.
// Most appropriate for print-to-digital or editorial contexts.
function MinimalWhite({ listing }: { listing: Listing }) {
  const photo = listing.photos.find(p => p.id === listing.primaryPhotoId) || listing.photos[0]
  const PHOTO_H = 660
  const E = M.social.edge

  return (
    <div style={{ position: 'absolute', inset: 0, background: BRAND.offWhite }}>

      {/* Photo — full bleed top, no overlay needed (text is below) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: PHOTO_H, overflow: 'hidden' }}>
        {photo?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: BRAND.navy }} />
        )}

        {/* Status top-left — on photo, needs subtle fill for legibility */}
        <div style={{ position: 'absolute', top: E, left: E }}>
          <StatusLabel text="Just Listed" dark filled />
        </div>
      </div>

      {/* Hairline rule at photo/panel transition — structural, not decorative */}
      <div style={{
        position: 'absolute',
        top: PHOTO_H,
        left: 0, right: 0,
        height: 1,
        background: BRAND.grayLight,
      }} />

      {/* White info panel — below photo */}
      <div style={{
        position: 'absolute',
        top: PHOTO_H + 1,
        left: 0, right: 0, bottom: 0,
        padding: `${M.social.section}px ${E}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        {/* Address */}
        <div style={{
          fontSize: TYPE.s_md,
          fontWeight: WEIGHT.black,
          color: BRAND.navy,
          lineHeight: 1.05,
          letterSpacing: '-0.015em',
          fontFamily: FONT.display,
        }}>
          {listing.address}
        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{
              fontSize: TYPE.s_xs - 2,
              color: BRAND.gray,
              marginBottom: 10,
              letterSpacing: '0.01em',
            }}>
              {listing.city}, {listing.state}
              {listing.price ? `  ·  ${listing.price}` : ''}
            </div>
            <StatRow listing={listing} dark={false} size="sm" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
            <Logo variant="dark" height={38} />
            <div style={{ fontSize: TYPE.s_xs - 4, color: BRAND.gray, letterSpacing: '0.04em' }}>
              {listing.agentPhone}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
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
