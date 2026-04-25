import React from 'react'
import { Listing } from '@/types'
import { BRAND, OVERLAY, TYPE, WEIGHT, M } from '@/lib/templates/brand'
import { PhotoBg, StatusLabel, Rule, StatRow, AgentLine, PriceDisplay, TemplateWrapper } from '@/components/templates/shared'

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
  const subColor  = isDark ? 'rgba(255,255,255,0.50)' : BRAND.gray
  const itemColor = isDark ? 'rgba(255,255,255,0.85)' : BRAND.navy
  const numColor  = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(17,31,53,0.05)'
  const ruleColor = isDark ? 'rgba(255,255,255,0.10)' : BRAND.grayLight

  const features = listing.features.slice(0, 5)

  return (
    <TemplateWrapper id={elementId} width={1080} height={1080} scale={scale}>
      {isDark
        ? <PhotoBg listing={listing} overlay={OVERLAY.navyDeep} />
        : <div style={{ position: 'absolute', inset: 0, background: bg }} />
      }

      {/* Header */}
      <div style={{ position: 'absolute', top: E, left: E, right: E }}>
        <StatusLabel text="5 Reasons to Love This Home" dark={isDark} />
        <div style={{
          fontSize: TYPE.s_xl,
          fontWeight: WEIGHT.black,
          color: headColor,
          lineHeight: 1.02,
          letterSpacing: '-0.03em',
          marginTop: 20,
        }}>
          {listing.address}
        </div>
        <div style={{ fontSize: TYPE.s_xs - 4, color: subColor, marginTop: 8, letterSpacing: '0.01em' }}>
          {listing.city}, {listing.state}
          {listing.price ? `  ·  ${listing.price}` : ''}
        </div>
      </div>

      {/* Feature list */}
      <div style={{
        position: 'absolute',
        top: 280, left: E, right: E, bottom: E + 80,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-around',
      }}>
        {(features.length > 0 ? features : ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5']).map((feat, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 32,
            paddingBottom: 20,
            borderBottom: i < features.length - 1 ? `1px solid ${ruleColor}` : 'none',
          }}>
            {/* Ambient number */}
            <div style={{
              fontSize: 80, fontWeight: WEIGHT.black, color: numColor,
              lineHeight: 1, letterSpacing: '-0.05em', flexShrink: 0, width: 52,
              textAlign: 'right',
            }}>
              {i + 1}
            </div>
            <div style={{ fontSize: TYPE.s_sm - 2, fontWeight: WEIGHT.semibold, color: itemColor, lineHeight: 1.3, letterSpacing: '-0.01em' }}>
              {feat}
            </div>
          </div>
        ))}
      </div>

      {/* Agent line */}
      <div style={{ position: 'absolute', bottom: E, left: E, right: E, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <StatRow listing={listing} dark={isDark} size="sm" />
        <AgentLine listing={listing} dark={isDark} align="right" />
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
      <PhotoBg listing={listing} overlay="linear-gradient(to right, rgba(17,31,53,0.92) 0%, rgba(17,31,53,0.65) 45%, rgba(17,31,53,0.20) 75%, transparent 100%)" />

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
