import React from 'react'
import { Listing } from '@/types'
import { BRAND, OVERLAY, TYPE, WEIGHT, M } from '@/lib/templates/brand'
import { PhotoBg, StatusLabel, Rule, StatRow, AgentLine, PriceDisplay, TemplateWrapper } from '@/components/templates/shared'

const W = 1080, H = 1080

interface Props {
  listing: Listing
  variant?: 'bold-gold' | 'clean-navy'
  scale?: number
  id?: string
}

// ── Variant A: Photo + Date Card ──────────────────────────────────────────────
// Full-bleed photo. Date/time is the hero. Address is secondary.
// Previous version had: gold header bar + frosted glass card + gold footer = 3 competing elements.
// New version: one element is the hero. Everything else recedes.
function PhotoDate({ listing }: { listing: Listing }) {
  const E = M.social.edge
  const hasTime = !!(listing.openHouseDate || listing.openHouseTime)

  return (
    <>
      <PhotoBg listing={listing} overlay={OVERLAY.navy} />

      {/* Status — top-left, typographic */}
      <div style={{ position: 'absolute', top: E, left: E }}>
        <StatusLabel text="Open House" dark />
      </div>
      <div style={{ position: 'absolute', top: E, right: E }}>
        <div style={{ fontSize: TYPE.s_xs - 4, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em' }}>
          {listing.agentWebsite}
        </div>
      </div>

      {/* Center: date + time as the singular hero element */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        width: '100%',
        padding: `0 ${E}px`,
      }}>
        {hasTime ? (
          <>
            <div style={{
              fontSize: TYPE.s_3xl,
              fontWeight: WEIGHT.black,
              color: BRAND.white,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
            }}>
              {listing.openHouseDate || 'Open House'}
            </div>
            <div style={{
              fontSize: TYPE.s_2xl,
              fontWeight: WEIGHT.light,
              color: BRAND.accentWarm,
              letterSpacing: '-0.02em',
              marginTop: 16,
            }}>
              {listing.openHouseTime}
              {listing.openHouseEndTime ? ` – ${listing.openHouseEndTime}` : ''}
            </div>
          </>
        ) : (
          <div style={{
            fontSize: TYPE.s_3xl,
            fontWeight: WEIGHT.black,
            color: BRAND.white,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
          }}>
            Open House
          </div>
        )}
      </div>

      {/* Bottom: address + stats + agent */}
      <div style={{ position: 'absolute', bottom: E, left: E, right: E }}>
        <Rule width={48} dark style={{ marginBottom: 24 }} />
        <div style={{
          fontSize: TYPE.s_lg,
          fontWeight: WEIGHT.black,
          color: BRAND.white,
          lineHeight: 1.02,
          letterSpacing: '-0.03em',
          marginBottom: 12,
        }}>
          {listing.address}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: TYPE.s_xs - 4, color: 'rgba(255,255,255,0.55)', marginBottom: 14, letterSpacing: '0.01em' }}>
              {listing.city}, {listing.state}
              {listing.price ? `  ·  ${listing.price}` : ''}
            </div>
            <StatRow listing={listing} dark size="sm" />
          </div>
          <AgentLine listing={listing} dark align="right" />
        </div>
      </div>
    </>
  )
}

// ── Variant B: Navy Split ─────────────────────────────────────────────────────
// Navy top panel with open house date. Photo bottom half.
// Inverted hierarchy — text panel on top, photo provides context below.
function NavySplit({ listing }: { listing: Listing }) {
  const E = M.social.edge
  const PANEL_H = 440
  const photo = listing.photos.find(p => p.id === listing.primaryPhotoId) || listing.photos[0]

  return (
    <div style={{ position: 'absolute', inset: 0, background: BRAND.navy }}>
      {/* Navy top panel */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: PANEL_H,
        padding: `${E}px ${E}px`,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <StatusLabel text="Open House" dark />

        <div>
          {listing.openHouseDate && (
            <div style={{
              fontSize: TYPE.s_2xl,
              fontWeight: WEIGHT.black,
              color: BRAND.white,
              lineHeight: 1.0,
              letterSpacing: '-0.035em',
              marginBottom: 12,
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
              marginBottom: 24,
            }}>
              {listing.openHouseTime}
              {listing.openHouseEndTime ? ` – ${listing.openHouseEndTime}` : ''}
            </div>
          )}
          <Rule width={40} dark />
          <div style={{
            fontSize: TYPE.s_sm,
            fontWeight: WEIGHT.semibold,
            color: 'rgba(255,255,255,0.85)',
            marginTop: 20,
            letterSpacing: '-0.01em',
          }}>
            {listing.address}
          </div>
          <div style={{ fontSize: TYPE.s_xs - 4, color: 'rgba(255,255,255,0.45)', marginTop: 8, letterSpacing: '0.02em' }}>
            {listing.city}, {listing.state}
            {listing.price ? `  ·  ${listing.price}` : ''}
          </div>
        </div>
      </div>

      {/* Photo bottom half */}
      <div style={{ position: 'absolute', top: PANEL_H, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
        {photo?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: BRAND.navyMid }} />
        )}
        {/* Subtle top fade from navy panel */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(17,31,53,0.6) 0%, transparent 40%)' }} />

        {/* Agent line on photo */}
        <div style={{ position: 'absolute', bottom: E, left: E, right: E, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <StatRow listing={listing} dark size="sm" />
          <AgentLine listing={listing} dark align="right" />
        </div>
      </div>
    </div>
  )
}

export default function OpenHouseSquare({ listing, variant = 'bold-gold', scale = 1, id }: Props) {
  const elementId = id || `tpl-open-house-square-${variant}`
  return (
    <TemplateWrapper id={elementId} width={W} height={H} scale={scale}>
      {variant === 'bold-gold'  && <PhotoDate listing={listing} />}
      {variant === 'clean-navy' && <NavySplit listing={listing} />}
    </TemplateWrapper>
  )
}
