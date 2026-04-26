'use client'
import React from 'react'
import { Listing } from '@/types'
import { BRAND, TYPE, WEIGHT, M, FONT, ZONES } from '@/lib/templates/brand'
import { PhotoBg, StatRow, TemplateWrapper, Logo } from '@/components/templates/shared'

// ─────────────────────────────────────────────────────────────────────────────
//  OPEN HOUSE — 1080 × 1080
//
//  A: Photo-First (bold-gold) — event info anchored at bottom, photo as hero
//  B: Clean Navy (clean-navy) — photo fills top 60%, structured info band below
// ─────────────────────────────────────────────────────────────────────────────

const W = 1080, H = 1080

interface Props {
  listing: Listing
  variant?: 'bold-gold' | 'clean-navy'
  scale?: number
  id?: string
}

// ── Variant A: Photo-First — event info floats in bottom third ────────────────
function PhotoDate({ listing }: { listing: Listing }) {
  const E = M.social.edge
  const hasDate = !!(listing.openHouseDate || listing.openHouseTime)

  return (
    <>
      {/* Steel-blue tint to bind photo to brand palette */}
      <PhotoBg listing={listing} overlay="rgba(26,56,82,0.12)" />

      {/* Deep navy shelf — hard bottom, photo visible in top ~27% */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(26,56,82,0.99) 0%, rgba(26,56,82,0.99) 18%, rgba(26,56,82,0.88) 38%, rgba(26,56,82,0.30) 58%, transparent 73%)',
      }} />

      {/* Gold top accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: BRAND.accentWarm, zIndex: 10 }} />

      {/* Top: Logo left, Open House pill right */}
      <div style={{
        position: 'absolute', top: 5 + E, left: E, right: E,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 10,
      }}>
        <Logo variant="white" height={36} />
        <div style={{
          background: BRAND.navyMid,
          borderRadius: 100, padding: '10px 24px',
          fontSize: 17, fontWeight: WEIGHT.black, color: BRAND.white,
          letterSpacing: '0.16em', textTransform: 'uppercase' as const,
        }}>
          Open House
        </div>
      </div>

      {/* Event info — bottom-anchored, no card box */}
      <div style={{ position: 'absolute', bottom: E + 80, left: E, right: E, zIndex: 10 }}>
        {hasDate ? (
          <>
            <div style={{
              fontSize: TYPE.s_2xl,
              fontWeight: WEIGHT.black,
              color: BRAND.white,
              lineHeight: 1.0,
              letterSpacing: '-0.035em',
              marginBottom: 10,
              fontFamily: FONT.display,
              textShadow: '0 4px 32px rgba(26,56,82,0.92), 0 1px 8px rgba(26,56,82,0.65)',
            }}>
              {listing.openHouseDate || 'Open House'}
            </div>
            {listing.openHouseTime && (
              <div style={{
                fontSize: TYPE.s_xl,
                fontWeight: WEIGHT.bold,
                color: BRAND.navyLight,
                letterSpacing: '-0.02em',
                marginBottom: 22,
                textShadow: '0 2px 22px rgba(26,56,82,0.85)',
              }}>
                {listing.openHouseTime}
                {listing.openHouseEndTime ? ` – ${listing.openHouseEndTime}` : ''}
              </div>
            )}
          </>
        ) : (
          <div style={{
            fontSize: TYPE.s_2xl,
            fontWeight: WEIGHT.black,
            color: BRAND.white,
            lineHeight: 1.0,
            letterSpacing: '-0.035em',
            fontFamily: FONT.display,
            marginBottom: 22,
            textShadow: '0 4px 32px rgba(26,56,82,0.92), 0 1px 8px rgba(26,56,82,0.65)',
          }}>
            Open House
          </div>
        )}

        {/* Divider */}
        <div style={{ height: 1.5, background: 'rgba(255,255,255,0.52)', marginBottom: 18 }} />

        {/* Address + price */}
        <div style={{
          fontSize: TYPE.s_sm,
          fontWeight: WEIGHT.semibold,
          color: 'rgba(255,255,255,0.88)',
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
          fontFamily: FONT.display,
          marginBottom: 10,
          textShadow: '0 1px 14px rgba(26,56,82,0.80)',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {listing.address}
        </div>
        {listing.price && (
          <div style={{
            fontSize: TYPE.s_xl,
            fontWeight: WEIGHT.black,
            color: BRAND.white,
            letterSpacing: '-0.025em',
            lineHeight: 1.0,
            textShadow: '0 2px 24px rgba(26,56,82,0.88)',
          }}>
            {listing.price}
          </div>
        )}
      </div>

      {/* Stats + phone — bottom */}
      <div style={{ position: 'absolute', bottom: E, left: E, right: E, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <StatRow listing={listing} dark size="sm" />
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.80)', letterSpacing: '0.04em' }}>
            {listing.agentPhone}
          </div>
        </div>
      </div>
    </>
  )
}

// ── Variant B: Clean Navy — photo fills top 60%, structured info band below ───
function NavySplit({ listing }: { listing: Listing }) {
  const E = M.social.edge
  // INFO_H must be >= ZONES.social.BOTTOM_H (240) to hold all bottom-zone content.
  // 440 comfortably exceeds that, giving room for date/time above the address+stats block.
  const INFO_H = 440
  const photo = listing.photos.find(p => p.id === listing.primaryPhotoId) || listing.photos[0]

  return (
    <div style={{ position: 'absolute', inset: 0, background: BRAND.navyDeep }}>

      {/* Photo — top portion, clearly visible */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: H - INFO_H,
        overflow: 'hidden',
      }}>
        {photo?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: BRAND.navyMid }} />
        )}
        {/* Logo + badge overlay on photo */}
        <div style={{ position: 'absolute', top: E, left: E }}>
          <Logo variant="white" height={36} />
        </div>
        <div style={{
          position: 'absolute', top: E, right: E,
          background: BRAND.navyMid,
          borderRadius: 100, padding: '10px 22px',
          fontSize: 17, fontWeight: WEIGHT.black, color: BRAND.white,
          letterSpacing: '0.16em', textTransform: 'uppercase' as const,
        }}>
          Open House
        </div>
        {/* Smooth fade into navy panel */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 72,
          background: 'linear-gradient(to top, rgba(26,56,82,1) 0%, transparent 100%)',
        }} />
      </div>

      {/* Gold accent line at junction */}
      <div style={{ position: 'absolute', top: H - INFO_H, left: 0, right: 0, height: 4, background: BRAND.accentWarm, zIndex: 5 }} />

      {/* Info band — fixed height INFO_H, overflow: hidden enforces zone boundary */}
      <div style={{
        position: 'absolute',
        top: H - INFO_H + 4, left: 0, right: 0, bottom: 0,
        padding: `24px ${E}px ${E}px`,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        overflow: 'hidden',
      }}>
        <div>
          {listing.openHouseDate && (
            <div style={{
              fontSize: TYPE.s_xl,
              fontWeight: WEIGHT.black,
              color: BRAND.white,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              marginBottom: 4,
              fontFamily: FONT.display,
            }}>
              {listing.openHouseDate}
            </div>
          )}
          {listing.openHouseTime && (
            <div style={{
              fontSize: TYPE.s_lg,
              fontWeight: WEIGHT.bold,
              color: BRAND.navyLight,
              letterSpacing: '-0.02em',
              marginBottom: 14,
            }}>
              {listing.openHouseTime}
              {listing.openHouseEndTime ? ` – ${listing.openHouseEndTime}` : ''}
            </div>
          )}
          <div style={{ height: 1.5, background: 'rgba(255,255,255,0.40)', marginBottom: 14 }} />
          <div style={{
            fontSize: TYPE.s_sm,
            fontWeight: WEIGHT.semibold,
            color: BRAND.white,
            letterSpacing: '-0.01em',
            fontFamily: FONT.display,
            marginBottom: 4,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {listing.address}
          </div>
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.78)', marginBottom: 12 }}>
            {listing.city}, {listing.state}
          </div>
          {listing.price && (
            <div style={{
              fontSize: TYPE.s_xl,
              fontWeight: WEIGHT.black,
              color: BRAND.white,
              letterSpacing: '-0.025em',
              lineHeight: 1.0,
            }}>
              {listing.price}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <StatRow listing={listing} dark size="sm" />
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.78)', letterSpacing: '0.02em' }}>
            {listing.agentPhone}
          </div>
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
      {variant === 'clean-navy' && <NavySplit  listing={listing} />}
    </TemplateWrapper>
  )
}
