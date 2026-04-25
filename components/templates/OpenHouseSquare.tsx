'use client'
import React from 'react'
import { Listing } from '@/types'
import { BRAND, OVERLAY, TYPE, WEIGHT, M, FONT } from '@/lib/templates/brand'
import { PhotoBg, StatRow, TemplateWrapper, Logo } from '@/components/templates/shared'

// ─────────────────────────────────────────────────────────────────────────────
//  OPEN HOUSE — 1080 × 1080  (social-performance rebuild)
//
//  Hierarchy: OPEN HOUSE BANNER → DATE (HUGE) → TIME → ADDRESS → STATS
//  Date and time are the hero — they're the reason to act.
// ─────────────────────────────────────────────────────────────────────────────

const W = 1080, H = 1080

interface Props {
  listing: Listing
  variant?: 'bold-gold' | 'clean-navy'
  scale?: number
  id?: string
}

// ── Variant A: Bold Gold — full photo, date as giant centerpiece ──────────────
function PhotoDate({ listing }: { listing: Listing }) {
  const E = M.social.edge
  const hasDate = !!(listing.openHouseDate || listing.openHouseTime)

  return (
    <>
      <PhotoBg listing={listing} overlay={OVERLAY.navyDeep} />

      {/* Hook banner */}
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
          Open House
        </div>
        <Logo variant="white" height={42} />
      </div>

      {/* Center: date + time — the entire reason for this post */}
      <div style={{
        position: 'absolute',
        top: '50%', left: E, right: E,
        transform: 'translateY(-52%)',
        textAlign: 'center',
      }}>
        {hasDate ? (
          <>
            <div style={{
              fontSize: TYPE.s_2xl,
              fontWeight: WEIGHT.black,
              color: BRAND.white,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              marginBottom: 20,
              fontFamily: FONT.display,
            }}>
              {listing.openHouseDate || 'Open House'}
            </div>
            {listing.openHouseTime && (
              <div style={{
                fontSize: TYPE.s_xl,
                fontWeight: WEIGHT.bold,
                color: BRAND.accentWarm,
                letterSpacing: '-0.02em',
              }}>
                {listing.openHouseTime}
                {listing.openHouseEndTime ? ` – ${listing.openHouseEndTime}` : ''}
              </div>
            )}
          </>
        ) : (
          <div style={{
            fontSize: TYPE.s_3xl,
            fontWeight: WEIGHT.black,
            color: BRAND.white,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            fontFamily: FONT.display,
          }}>
            Open House
          </div>
        )}

        {/* "All are welcome" — action driver */}
        <div style={{
          fontSize: TYPE.s_xs,
          fontWeight: WEIGHT.regular,
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase' as const,
          marginTop: 28,
        }}>
          No appointment needed
        </div>
      </div>

      {/* Bottom: address + price + stats */}
      <div style={{ position: 'absolute', bottom: E, left: E, right: E }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.18)', marginBottom: 24 }} />

        {listing.price && (
          <div style={{
            fontSize: TYPE.s_xl,
            fontWeight: WEIGHT.black,
            color: BRAND.white,
            letterSpacing: '-0.025em',
            marginBottom: 12,
          }}>
            {listing.price}
          </div>
        )}

        <div style={{
          fontSize: TYPE.s_md,
          fontWeight: WEIGHT.bold,
          color: BRAND.white,
          lineHeight: 1.05,
          letterSpacing: '-0.015em',
          marginBottom: 12,
          fontFamily: FONT.display,
        }}>
          {listing.address}
        </div>

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

// ── Variant B: Clean Navy — navy top panel, photo bottom ─────────────────────
function NavySplit({ listing }: { listing: Listing }) {
  const BANNER_H = 84
  const PANEL_H  = 440
  const E = M.social.edge
  const photo = listing.photos.find(p => p.id === listing.primaryPhotoId) || listing.photos[0]

  return (
    <div style={{ position: 'absolute', inset: 0, background: BRAND.navyDeep }}>

      {/* Gold hook banner */}
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
          Open House
        </div>
        <Logo variant="white" height={42} />
      </div>

      {/* Navy panel: date + time + address */}
      <div style={{
        position: 'absolute',
        top: BANNER_H, left: 0, right: 0,
        height: PANEL_H,
        padding: `32px ${E}px 28px`,
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
          {listing.price && (
            <div style={{
              fontSize: TYPE.s_lg,
              fontWeight: WEIGHT.black,
              color: BRAND.white,
              letterSpacing: '-0.02em',
              marginBottom: 14,
            }}>
              {listing.price}
            </div>
          )}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 16 }} />
          <div style={{
            fontSize: TYPE.s_sm,
            fontWeight: WEIGHT.semibold,
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: '-0.01em',
            fontFamily: FONT.display,
          }}>
            {listing.address}
          </div>
          <div style={{ fontSize: TYPE.s_xs - 4, color: 'rgba(255,255,255,0.45)', marginTop: 8 }}>
            {listing.city}, {listing.state}
          </div>
        </div>
      </div>

      {/* Photo bottom */}
      <div style={{
        position: 'absolute',
        top: BANNER_H + PANEL_H,
        left: 0, right: 0, bottom: 0,
        overflow: 'hidden',
      }}>
        {photo?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: BRAND.navyMid }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(17,31,53,0.5) 0%, transparent 40%)' }} />

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
      {variant === 'bold-gold'  && <PhotoDate  listing={listing} />}
      {variant === 'clean-navy' && <NavySplit  listing={listing} />}
    </TemplateWrapper>
  )
}
