import React from 'react'
import { Listing } from '@/types'
import { BRAND, OVERLAY, TYPE, WEIGHT, M } from '@/lib/templates/brand'
import { PhotoBg, StatusLabel, Rule, StatRow, AgentLine, PriceDisplay, FeatureList, TemplateWrapper } from '@/components/templates/shared'

const E = M.social.edge

// ════════════════════════════════════════════════════════════════════════════
//  OPEN HOUSE STORY — 1080 × 1920
//
//  Old: gold header bar + frosted center card + gold CTA button + footer band.
//  New: Date/time is the dominant typographic element.
//       Everything else recedes. Photo provides atmosphere.
// ════════════════════════════════════════════════════════════════════════════
interface OpenHouseStoryProps { listing: Listing; scale?: number; id?: string }

export function OpenHouseStory({ listing, scale = 1, id }: OpenHouseStoryProps) {
  const elementId = id || 'tpl-open-house-story-default'

  return (
    <TemplateWrapper id={elementId} width={1080} height={1920} scale={scale}>
      <PhotoBg listing={listing} overlay={OVERLAY.navy} />

      {/* Status — top */}
      <div style={{ position: 'absolute', top: E, left: E }}>
        <StatusLabel text="Open House" dark />
      </div>
      <div style={{ position: 'absolute', top: E, right: E }}>
        <div style={{ fontSize: TYPE.s_xs - 4, color: 'rgba(255,255,255,0.40)', letterSpacing: '0.04em' }}>
          {listing.agentWebsite}
        </div>
      </div>

      {/* Center: date as the singular design element */}
      <div style={{
        position: 'absolute',
        top: '50%', left: E, right: E,
        transform: 'translateY(-50%)',
      }}>
        <Rule width={48} dark style={{ marginBottom: 36 }} />

        {listing.openHouseDate && (
          <div style={{
            fontSize: TYPE.s_2xl + 8,
            fontWeight: WEIGHT.black,
            color: BRAND.white,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            marginBottom: 20,
          }}>
            {listing.openHouseDate}
          </div>
        )}
        {listing.openHouseTime && (
          <div style={{
            fontSize: TYPE.s_xl,
            fontWeight: WEIGHT.light,
            color: BRAND.accentWarm,
            letterSpacing: '-0.02em',
            marginBottom: 36,
          }}>
            {listing.openHouseTime}
            {listing.openHouseEndTime ? ` – ${listing.openHouseEndTime}` : ''}
          </div>
        )}

        <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 32 }} />

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
        <div style={{ fontSize: TYPE.s_xs - 4, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.01em' }}>
          {listing.city}, {listing.state}
          {listing.price ? `  ·  ${listing.price}` : ''}
        </div>
      </div>

      {/* Bottom */}
      <div style={{ position: 'absolute', bottom: E, left: E, right: E }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <StatRow listing={listing} dark size="sm" />
          <AgentLine listing={listing} dark align="right" />
        </div>
      </div>
    </TemplateWrapper>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  FEATURE CAROUSEL SLIDES — 1080 × 1080
//
//  Old: gold circle number badges, colored dot navigation, busy layout.
//  New: Each slide is a single idea. Feature number as ambient background text.
//       Feature text dominates. Everything else is minimal.
// ════════════════════════════════════════════════════════════════════════════
interface CarouselSlideProps {
  listing: Listing
  slideIndex: number
  totalSlides?: number
  dark?: boolean
  scale?: number
  id?: string
}

export function FeatureCarouselSlide({ listing, slideIndex, totalSlides = 5, dark = true, scale = 1, id }: CarouselSlideProps) {
  const elementId = id || `tpl-features-carousel-${dark ? 'dark' : 'light'}-slide-${slideIndex}`

  const bg        = dark ? BRAND.navy    : BRAND.offWhite
  const headColor = dark ? BRAND.white   : BRAND.navy
  const subColor  = dark ? 'rgba(255,255,255,0.50)' : BRAND.gray
  const ruleColor = dark ? 'rgba(255,255,255,0.15)' : BRAND.grayLight

  // ── Slide 0: Intro ─────────────────────────────────────────────────────
  if (slideIndex === 0) {
    const photo = listing.photos.find(p => p.id === listing.primaryPhotoId) || listing.photos[0]

    return (
      <TemplateWrapper id={elementId} width={1080} height={1080} scale={scale}>
        {dark
          ? <PhotoBg listing={listing} overlay={OVERLAY.fadeBottomNavy} />
          : <div style={{ position: 'absolute', inset: 0, background: bg }} />
        }

        {!dark && photo?.url && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 560, overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 50%, ${bg} 100%)` }} />
          </div>
        )}

        {/* Slide counter — ambient, top right */}
        <div style={{ position: 'absolute', top: E, right: E }}>
          <div style={{ fontSize: TYPE.s_xs - 4, color: dark ? 'rgba(255,255,255,0.35)' : BRAND.grayMid, letterSpacing: '0.08em' }}>
            1 / {totalSlides}
          </div>
        </div>

        {/* Content — bottom third */}
        <div style={{ position: 'absolute', bottom: E, left: E, right: E }}>
          <div style={{ fontSize: TYPE.s_xs - 4, color: dark ? 'rgba(255,255,255,0.50)' : BRAND.gray, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
            Property Highlights
          </div>
          <Rule width={40} dark={dark} style={{ marginBottom: 24 }} />
          <div style={{
            fontSize: TYPE.s_xl,
            fontWeight: WEIGHT.black,
            color: headColor,
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
            marginBottom: 12,
          }}>
            {listing.headline || listing.address}
          </div>
          <div style={{ fontSize: TYPE.s_xs - 4, color: subColor, marginBottom: 24, letterSpacing: '0.01em' }}>
            {listing.address} · {listing.city}, {listing.state}
          </div>
          <StatRow listing={listing} dark={dark} size="sm" />
        </div>

        {/* Slide pip navigation */}
        <SlidePips total={totalSlides} current={0} dark={dark} />
      </TemplateWrapper>
    )
  }

  // ── Feature slides (1–N) ────────────────────────────────────────────────
  const featureIdx = slideIndex - 1
  const feature    = listing.features[featureIdx] || `Feature ${slideIndex}`

  return (
    <TemplateWrapper id={elementId} width={1080} height={1080} scale={scale}>
      {dark
        ? <div style={{ position: 'absolute', inset: 0, background: BRAND.navy }} />
        : <div style={{ position: 'absolute', inset: 0, background: bg }} />
      }

      {/* Ambient slide number — large, background, not interactive */}
      <div style={{
        position: 'absolute',
        top: -20, left: E - 10,
        fontSize: 320,
        fontWeight: WEIGHT.black,
        color: dark ? 'rgba(255,255,255,0.04)' : 'rgba(17,31,53,0.04)',
        lineHeight: 1,
        letterSpacing: '-0.08em',
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        {slideIndex}
      </div>

      {/* Slide counter */}
      <div style={{ position: 'absolute', top: E, right: E }}>
        <div style={{ fontSize: TYPE.s_xs - 4, color: dark ? 'rgba(255,255,255,0.35)' : BRAND.grayMid, letterSpacing: '0.08em' }}>
          {slideIndex} / {totalSlides - 1}
        </div>
      </div>

      {/* Feature text — center stage, no box, no circle badge */}
      <div style={{
        position: 'absolute',
        top: '50%', left: E, right: E,
        transform: 'translateY(-50%)',
      }}>
        {/* Slide label — plain text */}
        <div style={{ fontSize: TYPE.s_xs - 4, color: dark ? 'rgba(255,255,255,0.45)' : BRAND.grayMid, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20 }}>
          Highlight {slideIndex}
        </div>

        <Rule width={40} dark={dark} style={{ marginBottom: 28 }} />

        {/* The feature itself — large, confident */}
        <div style={{
          fontSize: TYPE.s_xl + 4,
          fontWeight: WEIGHT.black,
          color: headColor,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
        }}>
          {feature}
        </div>
      </div>

      {/* Bottom: address + agent */}
      <div style={{ position: 'absolute', bottom: E, left: E, right: E }}>
        <div style={{ height: 1, background: ruleColor, marginBottom: 20 }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: TYPE.s_xs - 4, color: subColor, letterSpacing: '0.01em' }}>
            {listing.address} · {listing.city}, {listing.state}
          </div>
          <div style={{ fontSize: TYPE.s_xs - 6, color: dark ? 'rgba(255,255,255,0.40)' : BRAND.grayMid }}>
            {listing.agentName}
          </div>
        </div>
      </div>

      <SlidePips total={totalSlides} current={slideIndex} dark={dark} />
    </TemplateWrapper>
  )
}

// ── Slide pip navigation ──────────────────────────────────────────────────────
function SlidePips({ total, current, dark }: { total: number; current: number; dark: boolean }) {
  return (
    <div style={{
      position: 'absolute', bottom: E + 60, left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex', gap: 6, alignItems: 'center',
    }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: i === current ? 20 : 6,
          height: 2,
          borderRadius: 1,
          background: i === current
            ? (dark ? BRAND.white : BRAND.navy)
            : (dark ? 'rgba(255,255,255,0.25)' : BRAND.grayLight),
          transition: 'width 0.2s',
        }} />
      ))}
    </div>
  )
}

// ── Convenience wrapper: all slides ──────────────────────────────────────────
export function FeatureCarousel({ listing, dark = true, scale = 1 }: { listing: Listing; dark?: boolean; scale?: number }) {
  const totalSlides = Math.min(listing.features.length, 4) + 1
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {Array.from({ length: totalSlides }).map((_, i) => (
        <FeatureCarouselSlide
          key={i}
          listing={listing}
          slideIndex={i}
          totalSlides={totalSlides}
          dark={dark}
          scale={scale}
          id={`tpl-features-carousel-${dark ? 'dark' : 'light'}-slide-${i}`}
        />
      ))}
    </div>
  )
}
