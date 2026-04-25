'use client'
import React from 'react'
import { Listing } from '@/types'
import { BRAND, OVERLAY, TYPE, WEIGHT, M, FONT } from '@/lib/templates/brand'
import { PhotoBg, StatRow, TemplateWrapper, Logo } from '@/components/templates/shared'

// ─────────────────────────────────────────────────────────────────────────────
//  JUST LISTED — 1080 × 1080  (social-performance rebuild)
//
//  Hierarchy: HOOK BANNER → PRICE → ADDRESS → STATS
//  Price is now the second-largest element — the scroll-stopper.
//  Readability target: all key info legible in < 2 seconds on a phone.
// ─────────────────────────────────────────────────────────────────────────────

const W = 1080
const H = 1080

interface Props {
  listing: Listing
  variant?: 'dark-overlay' | 'split-panel' | 'minimal-white'
  scale?: number
  id?: string
}

// Shared hook banner — gold, full-width, immediately scannable
function HookBanner({ text, logo = true }: { text: string; logo?: boolean }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0,
      background: BRAND.accentWarm,
      padding: '20px 60px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      zIndex: 10,
    }}>
      <div style={{
        fontSize: 28,
        fontWeight: WEIGHT.black,
        color: BRAND.white,
        letterSpacing: '0.16em',
        textTransform: 'uppercase' as const,
      }}>
        {text}
      </div>
      {logo && <Logo variant="white" height={42} />}
    </div>
  )
}

// ── Variant A: Dark Overlay ───────────────────────────────────────────────────
// Full-bleed photo. Hook banner top. Price → Address → Stats bottom.
function DarkOverlay({ listing }: { listing: Listing }) {
  const E = M.social.edge

  return (
    <>
      <PhotoBg
        listing={listing}
        overlay="linear-gradient(to top, rgba(10,17,26,0.97) 0%, rgba(0,0,0,0.30) 52%, transparent 75%)"
      />

      <HookBanner text="Just Listed" />

      <div style={{ position: 'absolute', bottom: E, left: E, right: E }}>
        {/* Price — scroll-stopper */}
        {listing.price && (
          <div style={{
            fontSize: TYPE.s_2xl,
            fontWeight: WEIGHT.black,
            color: BRAND.white,
            lineHeight: 1.0,
            letterSpacing: '-0.025em',
            marginBottom: 18,
          }}>
            {listing.price}
          </div>
        )}

        {/* Address — large Playfair serif */}
        <div style={{
          fontSize: TYPE.s_lg,
          fontWeight: WEIGHT.bold,
          color: BRAND.white,
          lineHeight: 1.05,
          letterSpacing: '-0.015em',
          marginBottom: 14,
          fontFamily: FONT.display,
        }}>
          {listing.address}
        </div>

        {/* City, State */}
        <div style={{
          fontSize: TYPE.s_sm,
          fontWeight: WEIGHT.regular,
          color: 'rgba(255,255,255,0.60)',
          letterSpacing: '0.02em',
          marginBottom: 30,
        }}>
          {listing.city}, {listing.state}
        </div>

        {/* Stats + phone */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <StatRow listing={listing} dark size="md" />
          <div style={{ fontSize: 20, fontWeight: WEIGHT.medium, color: 'rgba(255,255,255,0.70)', letterSpacing: '0.04em' }}>
            {listing.agentPhone}
          </div>
        </div>
      </div>
    </>
  )
}

// ── Variant B: Split Panel ────────────────────────────────────────────────────
// Gold hook banner → photo → navy panel with price + address.
function SplitPanel({ listing }: { listing: Listing }) {
  const BANNER_H = 84
  const PHOTO_H  = 480
  const PANEL_TOP = BANNER_H + PHOTO_H
  const E = M.social.edge
  const photo = listing.photos.find(p => p.id === listing.primaryPhotoId) || listing.photos[0]

  return (
    <div style={{ position: 'absolute', inset: 0, background: BRAND.navyDeep }}>
      <HookBanner text="Just Listed" />

      {/* Photo */}
      <div style={{ position: 'absolute', top: BANNER_H, left: 0, right: 0, height: PHOTO_H, overflow: 'hidden' }}>
        {photo?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: BRAND.navyMid }} />
        )}
        {/* Bottom fade into navy panel */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, rgba(10,17,26,0.9) 100%)' }} />
      </div>

      {/* Navy content panel */}
      <div style={{
        position: 'absolute', top: PANEL_TOP, left: 0, right: 0, bottom: 0,
        padding: `28px ${E}px ${E}px`,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div>
          {listing.price && (
            <div style={{
              fontSize: TYPE.s_2xl,
              fontWeight: WEIGHT.black,
              color: BRAND.white,
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
              marginBottom: 14,
            }}>
              {listing.price}
            </div>
          )}
          <div style={{
            fontSize: TYPE.s_md,
            fontWeight: WEIGHT.bold,
            color: BRAND.white,
            lineHeight: 1.08,
            letterSpacing: '-0.015em',
            fontFamily: FONT.display,
            marginBottom: 10,
          }}>
            {listing.address}
          </div>
          <div style={{ fontSize: TYPE.s_xs, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.02em' }}>
            {listing.city}, {listing.state}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <StatRow listing={listing} dark size="sm" />
          <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>
            {listing.agentPhone}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Variant C: Minimal White ──────────────────────────────────────────────────
// Light mode. Gold hook banner → photo → clean white panel with big navy price.
function MinimalWhite({ listing }: { listing: Listing }) {
  const BANNER_H = 84
  const PHOTO_H  = 560
  const E = M.social.edge
  const photo = listing.photos.find(p => p.id === listing.primaryPhotoId) || listing.photos[0]

  return (
    <div style={{ position: 'absolute', inset: 0, background: BRAND.offWhite }}>
      <HookBanner text="Just Listed" />

      {/* Photo */}
      <div style={{ position: 'absolute', top: BANNER_H, left: 0, right: 0, height: PHOTO_H, overflow: 'hidden' }}>
        {photo?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: BRAND.navy }} />
        )}
      </div>

      {/* White info panel */}
      <div style={{
        position: 'absolute',
        top: BANNER_H + PHOTO_H,
        left: 0, right: 0, bottom: 0,
        padding: `26px ${E}px`,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div>
          {listing.price && (
            <div style={{
              fontSize: TYPE.s_xl,
              fontWeight: WEIGHT.black,
              color: BRAND.navy,
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
              marginBottom: 12,
            }}>
              {listing.price}
            </div>
          )}
          <div style={{
            fontSize: TYPE.s_md,
            fontWeight: WEIGHT.bold,
            color: BRAND.navy,
            lineHeight: 1.08,
            letterSpacing: '-0.015em',
            fontFamily: FONT.display,
            marginBottom: 8,
          }}>
            {listing.address}
          </div>
          <div style={{ fontSize: TYPE.s_xs, color: BRAND.gray, letterSpacing: '0.02em' }}>
            {listing.city}, {listing.state}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <StatRow listing={listing} dark={false} size="sm" />
          <div style={{ fontSize: 20, color: BRAND.gray, letterSpacing: '0.04em' }}>
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
