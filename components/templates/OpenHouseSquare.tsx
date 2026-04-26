'use client'
import React from 'react'
import { Listing } from '@/types'
import { BRAND, TYPE, WEIGHT, M, FONT } from '@/lib/templates/brand'
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
      {/* Photo — near full strength, barely tinted */}
      <PhotoBg listing={listing} overlay="rgba(0,0,0,0.06)" />

      {/* Bottom gradient only — photo clear above 54% */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(22,50,80,0.94) 0%, rgba(22,50,80,0.62) 26%, rgba(22,50,80,0.10) 46%, transparent 60%)',
      }} />

      {/* Gold top accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: BRAND.accentWarm, zIndex: 10 }} />

      {/* Top: Logo left, Open House pill right */}
      <div style={{
        position: 'absolute', top: 5 + E, left: E, right: E,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 10,
      }}>
        <Logo variant="white" height={38} />
        <div style={{
          background: BRAND.accentWarm,
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
              textShadow: '0 4px 28px rgba(0,0,0,0.50)',
            }}>
              {listing.openHouseDate || 'Open House'}
            </div>
            {listing.openHouseTime && (
              <div style={{
                fontSize: TYPE.s_xl,
                fontWeight: WEIGHT.bold,
                color: BRAND.accentWarm,
                letterSpacing: '-0.02em',
                marginBottom: 22,
                textShadow: '0 2px 20px rgba(0,0,0,0.40)',
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
            textShadow: '0 4px 28px rgba(0,0,0,0.50)',
          }}>
            Open House
          </div>
        )}

        {/* Gold divider */}
        <div style={{ height: 1.5, background: BRAND.accentWarm, opacity: 0.50, marginBottom: 18 }} />

        {/* Address + price */}
        <div style={{
          fontSize: TYPE.s_sm,
          fontWeight: WEIGHT.semibold,
          color: 'rgba(255,255,255,0.88)',
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
          fontFamily: FONT.display,
          marginBottom: 10,
          textShadow: '0 1px 12px rgba(0,0,0,0.40)',
        }}>
          {listing.address}
        </div>
        {listing.price && (
          <div style={{
            fontSize: TYPE.s_lg,
            fontWeight: WEIGHT.black,
            color: BRAND.accentWarm,
            letterSpacing: '-0.025em',
            lineHeight: 1.0,
            textShadow: '0 2px 20px rgba(0,0,0,0.50)',
          }}>
            {listing.price}
          </div>
        )}
      </div>

      {/* Stats + phone — bottom */}
      <div style={{ position: 'absolute', bottom: E, left: E, right: E, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <StatRow listing={listing} dark size="sm" />
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.50)', letterSpacing: '0.04em' }}>
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
          background: BRAND.accentWarm,
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

      {/* Info band */}
      <div style={{
        position: 'absolute',
        top: H - INFO_H + 4, left: 0, right: 0, bottom: 0,
        padding: `24px ${E}px ${E}px`,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div>
          {listing.openHouseDate && (
            <div style={{
              fontSize: TYPE.s_2xl,
              fontWeight: WEIGHT.black,
              color: BRAND.white,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              marginBottom: 8,
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
              marginBottom: 16,
            }}>
              {listing.openHouseTime}
              {listing.openHouseEndTime ? ` – ${listing.openHouseEndTime}` : ''}
            </div>
          )}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.10)', marginBottom: 14 }} />
          <div style={{
            fontSize: TYPE.s_sm,
            fontWeight: WEIGHT.semibold,
            color: 'rgba(255,255,255,0.88)',
            letterSpacing: '-0.01em',
            fontFamily: FONT.display,
            marginBottom: 4,
          }}>
            {listing.address}
          </div>
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.38)', marginBottom: 12 }}>
            {listing.city}, {listing.state}
          </div>
          {listing.price && (
            <div style={{
              fontSize: TYPE.s_lg,
              fontWeight: WEIGHT.black,
              color: BRAND.accentWarm,
              letterSpacing: '-0.025em',
              lineHeight: 1.0,
            }}>
              {listing.price}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <StatRow listing={listing} dark size="sm" />
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.40)', letterSpacing: '0.02em' }}>
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
