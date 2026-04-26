import React from 'react'
import { Listing } from '@/types'
import { BRAND, OVERLAY, TYPE, WEIGHT, M } from '@/lib/templates/brand'
import { PhotoBg, StatusLabel, Rule, StatRow, AgentLine, PriceDisplay, FeatureList, TemplateWrapper } from '@/components/templates/shared'

const W = 1080, H = 1920
const E = M.social.edge

interface Props {
  listing: Listing
  variant?: 'photo-full' | 'split-info'
  scale?: number
  id?: string
}

// ── Variant A: Full Photo ─────────────────────────────────────────────────────
// Maximum 5 information elements. Photo breathes.
// Old version: feature block with panel background, CTA button, stat row,
//              price, agent footer band = too many elements, too much scaffolding.
// New: photo + one fade. Everything else is typography only.
function PhotoFull({ listing }: { listing: Listing }) {
  return (
    <>
      <PhotoBg listing={listing} overlay={OVERLAY.fadeBottom} />

      {/* Status — top left */}
      <div style={{ position: 'absolute', top: E, left: E }}>
        <StatusLabel text="Just Listed" dark />
      </div>
      <div style={{ position: 'absolute', top: E, right: E }}>
        <div style={{ fontSize: TYPE.s_xs - 4, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em' }}>
          {listing.agentWebsite}
        </div>
      </div>

      {/* Bottom content — all typography, no panels */}
      <div style={{ position: 'absolute', bottom: E, left: E, right: E }}>
        <Rule width={48} dark style={{ marginBottom: 28 }} />

        {/* Address — the hero */}
        <div style={{
          fontSize: TYPE.s_xl + 8,
          fontWeight: WEIGHT.black,
          color: BRAND.white,
          lineHeight: 1.0,
          letterSpacing: '-0.035em',
          marginBottom: 16,
        }}>
          {listing.address}
        </div>

        {/* City + price */}
        <div style={{
          fontSize: TYPE.s_xs,
          fontWeight: WEIGHT.regular,
          color: 'rgba(255,255,255,0.65)',
          letterSpacing: '0.01em',
          marginBottom: 32,
        }}>
          {listing.city}, {listing.state}
          {listing.price ? `  ·  ${listing.price}` : ''}
        </div>

        {/* Top features — plain list, no boxes */}
        {listing.features.length > 0 && (
          <FeatureList
            features={listing.features}
            dark
            max={4}
            size="sm"
            style={{ marginBottom: 36 }}
          />
        )}

        {/* Stats + agent — bottom row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <StatRow listing={listing} dark size="sm" />
          <AgentLine listing={listing} dark align="right" />
        </div>
      </div>
    </>
  )
}

// ── Variant B: Split Info ─────────────────────────────────────────────────────
// Photo top ~50%. Navy info panel bottom ~50%.
// Old version: had a CTA button + blue panel + gold seam + stat row + features.
// New: two zones. Photo zone. Info zone. One clear boundary.
function SplitInfo({ listing }: { listing: Listing }) {
  const PHOTO_H = 940   // ~49% of 1920

  const photo = listing.photos.find(p => p.id === listing.primaryPhotoId) || listing.photos[0]

  return (
    <div style={{ position: 'absolute', inset: 0, background: BRAND.navy }}>

      {/* Photo zone */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: PHOTO_H, overflow: 'hidden' }}>
        {photo?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: BRAND.navyMid }} />
        )}
        {/* Fade into navy panel — smooth transition without any seam element */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, rgba(26,56,82,1) 100%)' }} />

        <div style={{ position: 'absolute', top: E, left: E }}>
          <StatusLabel text="Just Listed" dark />
        </div>
      </div>

      {/* Info zone — no background needed, navy is the canvas */}
      <div style={{
        position: 'absolute',
        top: PHOTO_H,
        left: 0, right: 0, bottom: 0,
        padding: `${M.social.section}px ${E}px ${E}px`,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div>
          {/* Address — large, confident */}
          <div style={{
            fontSize: TYPE.s_xl + 4,
            fontWeight: WEIGHT.black,
            color: BRAND.white,
            lineHeight: 1.0,
            letterSpacing: '-0.035em',
            marginBottom: 14,
          }}>
            {listing.address}
          </div>
          <div style={{ fontSize: TYPE.s_xs - 4, color: 'rgba(255,255,255,0.50)', letterSpacing: '0.02em', marginBottom: 28 }}>
            {listing.city}, {listing.state}
          </div>

          <Rule width={40} dark style={{ marginBottom: 28 }} />

          {/* Price — single callout element */}
          <PriceDisplay price={listing.price} dark size="md" style={{ marginBottom: 28 }} />

          {/* Features */}
          {listing.features.length > 0 && (
            <FeatureList features={listing.features} dark max={4} size="sm" />
          )}
        </div>

        {/* Agent attribution */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)', paddingTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <StatRow listing={listing} dark size="sm" />
            <AgentLine listing={listing} dark align="right" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function JustListedStory({ listing, variant = 'photo-full', scale = 1, id }: Props) {
  const elementId = id || `tpl-just-listed-story-${variant}`
  return (
    <TemplateWrapper id={elementId} width={W} height={H} scale={scale}>
      {variant === 'photo-full' && <PhotoFull listing={listing} />}
      {variant === 'split-info' && <SplitInfo listing={listing} />}
    </TemplateWrapper>
  )
}
