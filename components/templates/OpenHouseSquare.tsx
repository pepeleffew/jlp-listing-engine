'use client'
import React from 'react'
import { Listing } from '@/types'
import { BRAND, TYPE, WEIGHT, M, FONT } from '@/lib/templates/brand'
import { PhotoBg, StatRow, TemplateWrapper, Logo } from '@/components/templates/shared'

// ─────────────────────────────────────────────────────────────────────────────
//  OPEN HOUSE — 1080 × 1080
//
//  A: Bold Gold (photo-date) — floating frosted event invitation card
//  B: Clean Navy (navy-split) — gold bar + content panel + photo bottom
// ─────────────────────────────────────────────────────────────────────────────

const W = 1080, H = 1080

interface Props {
  listing: Listing
  variant?: 'bold-gold' | 'clean-navy'
  scale?: number
  id?: string
}

// ── Variant A: Bold Gold — floating event invitation card ─────────────────────
function PhotoDate({ listing }: { listing: Listing }) {
  const E = M.social.edge
  const hasDate = !!(listing.openHouseDate || listing.openHouseTime)

  return (
    <>
      {/* Photo with vignette — dark top+bottom, clear middle so photo pops */}
      <PhotoBg
        listing={listing}
        overlay="linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, transparent 26%, transparent 60%, rgba(10,17,26,0.58) 100%)"
      />

      {/* Top: Logo left, gold pill right */}
      <div style={{
        position: 'absolute', top: E, left: E, right: E,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 10,
      }}>
        <Logo variant="white" height={38} />
        <div style={{
          background: BRAND.accentWarm,
          borderRadius: 100, padding: '12px 28px',
          fontSize: 20, fontWeight: WEIGHT.black, color: BRAND.white,
          letterSpacing: '0.14em', textTransform: 'uppercase' as const,
        }}>
          Open House
        </div>
      </div>

      {/* Center: frosted event card — left-aligned, clear hierarchy */}
      <div style={{
        position: 'absolute',
        top: '50%', left: E, right: E,
        transform: 'translateY(-52%)',
        background: 'rgba(10,17,26,0.68)',
        borderRadius: 24,
        boxShadow: '0 16px 52px rgba(0,0,0,0.36)',
        border: '1px solid rgba(200,169,110,0.40)',
        padding: '36px 40px',
      }}>
        {/* 1. Date — dominant hero */}
        {hasDate ? (
          <>
            <div style={{
              fontSize: TYPE.s_2xl,
              fontWeight: WEIGHT.black,
              color: BRAND.white,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              marginBottom: 14,
              fontFamily: FONT.display,
            }}>
              {listing.openHouseDate || 'Open House'}
            </div>
            {/* 2. Time — secondary hero */}
            {listing.openHouseTime && (
              <div style={{
                fontSize: TYPE.s_xl,
                fontWeight: WEIGHT.bold,
                color: BRAND.accentWarm,
                letterSpacing: '-0.02em',
                marginBottom: 28,
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
            letterSpacing: '-0.03em',
            fontFamily: FONT.display,
            marginBottom: 28,
          }}>
            Open House
          </div>
        )}

        {/* Gold divider */}
        <div style={{ height: 1, background: 'rgba(200,169,110,0.28)', marginBottom: 22 }} />

        {/* 3. Address — info tier */}
        <div style={{
          fontSize: TYPE.s_sm,
          fontWeight: WEIGHT.semibold,
          color: 'rgba(255,255,255,0.75)',
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
          fontFamily: FONT.display,
          marginBottom: 12,
        }}>
          {listing.address}
        </div>

        {/* 4. Price — prominent info element (bigger than address, gold) */}
        {listing.price && (
          <div style={{
            fontSize: TYPE.s_lg,
            fontWeight: WEIGHT.black,
            color: BRAND.accentWarm,
            letterSpacing: '-0.025em',
            lineHeight: 1.0,
            marginBottom: 22,
          }}>
            {listing.price}
          </div>
        )}

        {/* 5. Utility label */}
        <div style={{
          fontSize: TYPE.s_xs - 4,
          fontWeight: WEIGHT.regular,
          color: 'rgba(255,255,255,0.32)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase' as const,
        }}>
          No appointment needed
        </div>
      </div>

      {/* Bottom: stats + phone outside card */}
      <div style={{ position: 'absolute', bottom: E, left: E, right: E }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <StatRow listing={listing} dark size="sm" />
          <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>
            {listing.agentPhone}
          </div>
        </div>
      </div>
    </>
  )
}

// ── Variant B: Clean Navy — gold bar + content panel + photo bottom ───────────
function NavySplit({ listing }: { listing: Listing }) {
  const E = M.social.edge
  const PANEL_H = 400
  const photo = listing.photos.find(p => p.id === listing.primaryPhotoId) || listing.photos[0]

  return (
    <div style={{ position: 'absolute', inset: 0, background: BRAND.navyDeep }}>

      {/* Gold top accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: BRAND.accentWarm, zIndex: 10 }} />

      {/* Navy content panel */}
      <div style={{
        position: 'absolute',
        top: 6, left: 0, right: 0,
        height: PANEL_H,
        padding: `${E}px ${E}px 32px`,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        zIndex: 5,
      }}>
        {/* Header: Logo + badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Logo variant="white" height={36} />
          <div style={{
            background: BRAND.accentWarm,
            borderRadius: 100, padding: '10px 22px',
            fontSize: 18, fontWeight: WEIGHT.black, color: BRAND.white,
            letterSpacing: '0.14em', textTransform: 'uppercase' as const,
          }}>
            Open House
          </div>
        </div>

        {/* Date → time → rule → address → price */}
        <div>
          {listing.openHouseDate && (
            <div style={{
              fontSize: TYPE.s_2xl,
              fontWeight: WEIGHT.black,
              color: BRAND.white,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              marginBottom: 14,
              fontFamily: FONT.display,
            }}>
              {listing.openHouseDate}
            </div>
          )}
          {listing.openHouseTime && (
            <div style={{
              fontSize: TYPE.s_xl,
              fontWeight: WEIGHT.bold,
              color: BRAND.accentWarm,
              letterSpacing: '-0.02em',
              marginBottom: 24,
            }}>
              {listing.openHouseTime}
              {listing.openHouseEndTime ? ` – ${listing.openHouseEndTime}` : ''}
            </div>
          )}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.10)', marginBottom: 16 }} />
          <div style={{
            fontSize: TYPE.s_sm,
            fontWeight: WEIGHT.semibold,
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: '-0.01em',
            fontFamily: FONT.display,
          }}>
            {listing.address}
          </div>
          <div style={{ fontSize: TYPE.s_xs - 4, color: 'rgba(255,255,255,0.42)', marginTop: 6 }}>
            {listing.city}, {listing.state}
          </div>
          {listing.price && (
            <div style={{
              fontSize: TYPE.s_lg,
              fontWeight: WEIGHT.black,
              color: BRAND.accentWarm,
              letterSpacing: '-0.025em',
              lineHeight: 1.0,
              marginTop: 18,
            }}>
              {listing.price}
            </div>
          )}
        </div>
      </div>

      {/* Photo bottom */}
      <div style={{
        position: 'absolute',
        top: 6 + PANEL_H,
        left: 0, right: 0, bottom: 0,
        overflow: 'hidden',
      }}>
        {photo?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: BRAND.navyMid }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(17,31,53,0.50) 0%, transparent 40%)' }} />

        <div style={{
          position: 'absolute', bottom: E, left: E, right: E,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        }}>
          <StatRow listing={listing} dark size="sm" />
          <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>
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
