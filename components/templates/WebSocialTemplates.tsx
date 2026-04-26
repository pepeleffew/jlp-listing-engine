import React from 'react'
import { Listing } from '@/types'
import { BRAND, OVERLAY, TYPE, WEIGHT, M } from '@/lib/templates/brand'
import { PhotoBg, StatusLabel, Rule, StatRow, PriceDisplay, TemplateWrapper, Logo } from '@/components/templates/shared'

const E = M.social.edge

// ════════════════════════════════════════════════════════════════════════════
//  TOP 5 FEATURES — 1080 × 1080
//  Old: gold circles as number badges, colored card backgrounds, border-left accents.
//  New: numbered list as pure typography. Numbers as ambient background.
// ════════════════════════════════════════════════════════════════════════════
interface Top5Props { listing: Listing; variant?: 'dark' | 'light'; scale?: number; id?: string }

export function Top5FeaturesSquare({ listing, variant = 'dark', scale = 1, id }: Top5Props) {
  const elementId = id || `tpl-top5-features-${variant}`
  const isDark    = variant === 'dark'
  const bg        = isDark ? BRAND.navy    : BRAND.offWhite
  const headColor = isDark ? BRAND.white   : BRAND.navy
  const subColor  = isDark ? 'rgba(255,255,255,0.42)' : BRAND.gray
  const itemColor = isDark ? 'rgba(255,255,255,0.90)' : BRAND.navy
  const ruleColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(26,56,82,0.08)'

  // 3 max — generous breathing room per item
  const features = listing.features.slice(0, 3)
  const placeholders = ['Spacious open floor plan', 'Chef\'s kitchen with premium appliances', 'Primary suite with spa bath']
  const items = (features.length > 0 ? features : placeholders).map(f =>
    f.length > 52 ? f.slice(0, 52).trimEnd() + '…' : f
  )

  return (
    <TemplateWrapper id={elementId} width={1080} height={1080} scale={scale}>
      {isDark
        ? <PhotoBg listing={listing} overlay="rgba(26,56,82,0.18)" />
        : <PhotoBg listing={listing} overlay="rgba(249,249,251,0.84)" />
      }

      {/* Dark variant: gradient zones at top + bottom for readability, photo clear in middle */}
      {isDark && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(26,56,82,0.55) 0%, transparent 26%, transparent 72%, rgba(26,56,82,0.68) 100%)',
          zIndex: 1,
        }} />
      )}

      {/* Gold accent bar at top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: BRAND.accentWarm, zIndex: 10 }} />

      {/* Header: label + address + logo */}
      <div style={{ position: 'absolute', top: 5 + E, left: E, right: E, zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, paddingRight: 24 }}>
            <div style={{
              fontSize: 13,
              fontWeight: WEIGHT.semibold,
              color: BRAND.accentWarm,
              letterSpacing: '0.22em',
              textTransform: 'uppercase' as const,
              marginBottom: 16,
            }}>
              Property Highlights
            </div>
            <div style={{
              fontSize: TYPE.s_lg,
              fontWeight: WEIGHT.black,
              color: headColor,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              ...(isDark ? { textShadow: '0 2px 20px rgba(0,0,0,0.60)' } : {}),
            }}>
              {listing.address}
            </div>
            <div style={{ fontSize: 20, color: subColor, marginTop: 10, letterSpacing: '0.01em' }}>
              {listing.city}, {listing.state}
            </div>
            {listing.price && (
              <div style={{
                fontSize: TYPE.s_lg,
                fontWeight: WEIGHT.black,
                color: isDark ? BRAND.white : BRAND.navyMid,
                letterSpacing: '-0.02em',
                lineHeight: 1.0,
                marginTop: 14,
              }}>
                {listing.price}
              </div>
            )}
          </div>
          <Logo variant={isDark ? 'white' : 'dark'} height={34} style={{ marginTop: 2, flexShrink: 0 }} />
        </div>
      </div>

      {/* Feature list — 3 items, generous spacing */}
      <div style={{
        position: 'absolute',
        top: 340, left: E, right: E, bottom: E + 72,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 10,
      }}>
        {items.map((feat, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 28,
            paddingTop: 54, paddingBottom: 54,
            borderBottom: i < items.length - 1 ? `1px solid ${ruleColor}` : 'none',
          }}>
            {/* Number column */}
            <div style={{ flexShrink: 0, paddingTop: 2 }}>
              <div style={{
                fontSize: 13,
                fontWeight: WEIGHT.black,
                color: BRAND.accentWarm,
                letterSpacing: '0.10em',
                lineHeight: 1,
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ width: 24, height: 1.5, background: BRAND.accentWarm, marginTop: 7 }} />
            </div>
            <div style={{
              fontSize: 40,
              fontWeight: WEIGHT.semibold,
              color: itemColor,
              lineHeight: 1.40,
              letterSpacing: '-0.01em',
              ...(isDark ? { textShadow: '0 2px 18px rgba(0,0,0,0.65)' } : {}),
            }}>
              {feat}
            </div>
          </div>
        ))}
      </div>

      {/* Stats + phone bottom */}
      <div style={{ position: 'absolute', bottom: E, left: E, right: E, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <StatRow listing={listing} dark={isDark} size="sm" />
        <div style={{ fontSize: 18, color: isDark ? 'rgba(255,255,255,0.42)' : BRAND.gray, letterSpacing: '0.02em' }}>
          {listing.agentPhone}
        </div>
      </div>
    </TemplateWrapper>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  EMAIL HEADER — 600 × 300
// ════════════════════════════════════════════════════════════════════════════
interface EmailHeaderProps { listing: Listing; variant?: 'default'; scale?: number; id?: string }

export function EmailHeader({ listing, variant = 'default', scale = 1, id }: EmailHeaderProps) {
  const elementId = id || `tpl-email-header-${variant}`

  return (
    <TemplateWrapper id={elementId} width={600} height={300} scale={scale}>
      <PhotoBg listing={listing} overlay={OVERLAY.fadeLeft} />

      <div style={{ position: 'absolute', top: 32, left: 40 }}>
        <StatusLabel text="Just Listed" dark style={{ fontSize: 11 }} />
      </div>

      <div style={{ position: 'absolute', bottom: 32, left: 40, right: 180 }}>
        <div style={{ fontSize: 28, fontWeight: WEIGHT.black, color: BRAND.white, lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: 8 }}>
          {listing.address}
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.60)', letterSpacing: '0.02em' }}>
          {listing.city}, {listing.state}
          {listing.price ? `  ·  ${listing.price}` : ''}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 32, right: 32, textAlign: 'right' }}>
        <div style={{ fontSize: 12, fontWeight: WEIGHT.semibold, color: BRAND.white }}>{listing.agentName}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.50)', marginTop: 4 }}>{listing.agentPhone}</div>
      </div>
    </TemplateWrapper>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  FACEBOOK COVER — 1640 × 624
// ════════════════════════════════════════════════════════════════════════════
interface FBCoverProps { listing: Listing; variant?: 'default'; scale?: number; id?: string }

export function FacebookCover({ listing, variant = 'default', scale = 1, id }: FBCoverProps) {
  const elementId = id || `tpl-facebook-cover-${variant}`

  return (
    <TemplateWrapper id={elementId} width={1640} height={624} scale={scale}>
      <PhotoBg listing={listing} overlay="linear-gradient(to right, rgba(26,56,82,0.92) 0%, rgba(26,56,82,0.62) 45%, rgba(26,56,82,0.18) 75%, transparent 100%)" />

      {/* Left content */}
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 740, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px' }}>
        <StatusLabel text="Just Listed" dark style={{ marginBottom: 28 }} />
        <div style={{
          fontSize: 64,
          fontWeight: WEIGHT.black,
          color: BRAND.white,
          lineHeight: 0.97,
          letterSpacing: '-0.035em',
          marginBottom: 20,
        }}>
          {listing.address}
        </div>
        <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.60)', letterSpacing: '0.01em', marginBottom: 36 }}>
          {listing.city}, {listing.state}
          {listing.price ? `  ·  ${listing.price}` : ''}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <StatRow listing={listing} dark size="md" />
        </div>
      </div>

      {/* Agent — bottom right */}
      <div style={{ position: 'absolute', bottom: 44, right: 64, textAlign: 'right' }}>
        <div style={{ fontSize: 18, fontWeight: WEIGHT.semibold, color: BRAND.white }}>{listing.agentName}</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.50)', marginTop: 6, letterSpacing: '0.02em' }}>
          {listing.agentPhone}  ·  {listing.agentWebsite}
        </div>
      </div>
    </TemplateWrapper>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  QR CARD — 612 × 396 (postcard)
// ════════════════════════════════════════════════════════════════════════════
interface QRCardProps { listing: Listing; variant?: 'default'; scale?: number; id?: string }

export function QRCard({ listing, variant = 'default', scale = 1, id }: QRCardProps) {
  const elementId = id || `tpl-qr-card-${variant}`
  const photo = listing.photos.find(p => p.id === listing.primaryPhotoId) || listing.photos[0]

  return (
    <TemplateWrapper id={elementId} width={612} height={396} scale={scale}>
      <div style={{ position: 'absolute', inset: 0, background: BRAND.white, display: 'flex' }}>

        {/* Left: photo */}
        <div style={{ width: '42%', position: 'relative', overflow: 'hidden' }}>
          {photo?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: BRAND.navy }} />
          )}
          {/* Right edge fade */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, rgba(255,255,255,1) 100%)' }} />
        </div>

        {/* Right: content */}
        <div style={{ flex: 1, padding: '28px 24px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 9, color: BRAND.grayMid, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>
              Now Available
            </div>
            <div style={{ fontSize: 20, fontWeight: WEIGHT.black, color: BRAND.navy, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 6 }}>
              {listing.address}
            </div>
            <div style={{ fontSize: 11, color: BRAND.gray }}>
              {listing.city}, {listing.state}
            </div>
            <div style={{ fontSize: 18, fontWeight: WEIGHT.bold, color: BRAND.navy, marginTop: 12, letterSpacing: '-0.02em' }}>
              {listing.price}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            {/* QR placeholder */}
            <div>
              <div style={{ width: 64, height: 64, border: `1.5px solid ${BRAND.grayLight}`, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: 4 }}>
                <QRPattern />
              </div>
              <div style={{ fontSize: 8, color: BRAND.grayMid, textAlign: 'center' }}>Scan for tour</div>
            </div>

            {/* Contact */}
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, fontWeight: WEIGHT.bold, color: BRAND.navy }}>{listing.agentName}</div>
              <div style={{ fontSize: 11, color: BRAND.gray, marginTop: 2 }}>{listing.brokerageName}</div>
              <div style={{ fontSize: 12, fontWeight: WEIGHT.semibold, color: BRAND.navy, marginTop: 6 }}>{listing.agentPhone}</div>
              <div style={{ fontSize: 9, color: BRAND.grayMid, marginTop: 2 }}>{listing.agentWebsite}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top navy rule — one structural element */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: BRAND.navy }} />
    </TemplateWrapper>
  )
}

// Decorative QR pattern (replace with real QR lib if needed)
function QRPattern() {
  const cells = [
    [1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,1,1,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,1,1,0,0,1,0,1,1,0,1,0],
    [0,1,1,0,1,0,0,0,1,0,0,1,1,0,1,0,1],
    [0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,0],
    [1,1,1,1,1,1,1,0,0,0,1,0,1,1,0,0,1],
    [1,0,0,0,0,0,1,0,1,0,0,1,0,1,1,0,0],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,0,1,1,0],
    [1,0,1,1,1,0,1,0,1,0,0,1,0,1,0,0,1],
    [1,0,0,0,0,0,1,0,0,1,1,0,1,1,0,1,0],
    [1,1,1,1,1,1,1,0,1,0,0,1,0,0,1,0,1],
  ]
  const size = 60 / cells.length
  return (
    <div style={{ width: 60, height: 60, position: 'relative' }}>
      {cells.map((row, ri) =>
        row.map((cell, ci) =>
          cell ? (
            <div key={`${ri}-${ci}`} style={{
              position: 'absolute',
              left: ci * size, top: ri * size,
              width: size - 0.5, height: size - 0.5,
              background: BRAND.navy,
              borderRadius: 0.3,
            }} />
          ) : null
        )
      )}
    </div>
  )
}
