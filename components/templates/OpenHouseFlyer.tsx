import React from 'react'
import { Listing } from '@/types'
import { BRAND, OVERLAY, OVERLAYS, GRADIENTS, TYPE, WEIGHT, M } from '@/lib/templates/brand'
import {
  PhotoBg, StatusLabel, StatusBadge,
  PriceDisplay, Rule, StatRow, FeatureList, TemplateWrapper,
} from '@/components/templates/shared'

const PriceTag = PriceDisplay
const StatBar  = StatRow
const GoldBar  = Rule

const W = 816
const H = 1056

interface Props {
  listing: Listing
  variant?: 'default'
  scale?: number
  id?: string
}

export default function OpenHouseFlyer({ listing, variant = 'default', scale = 1, id }: Props) {
  const elementId = id || `tpl-open-house-flyer-${variant}`
  const primaryPhoto = listing.photos.find(p => p.id === listing.primaryPhotoId) || listing.photos[0]
  const extraPhotos = listing.photos.filter(p => p.id !== listing.primaryPhotoId).slice(0, 2)

  const hasOpenHouse = !!(listing.openHouseDate || listing.openHouseTime)

  return (
    <TemplateWrapper id={elementId} width={W} height={H} scale={scale}>
      <div style={{ position: 'absolute', inset: 0, background: BRAND.white, display: 'flex', flexDirection: 'column' }}>

        {/* ── Top: gold open-house header ─────────────────────────── */}
        <div style={{ background: BRAND.navy, padding: '22px 44px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, color: BRAND.accentWarm, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 6 }}>
                You're Invited
              </div>
              <div style={{ fontSize: 40, fontWeight: 900, color: BRAND.white, letterSpacing: '-0.02em', lineHeight: 1 }}>
                Open House
              </div>
            </div>
            {hasOpenHouse && (
              <div style={{
                background: BRAND.accentWarm, borderRadius: 12, padding: '16px 28px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: BRAND.white, lineHeight: 1.1 }}>
                  {listing.openHouseDate}
                </div>
                <div style={{ fontSize: 28, fontWeight: 900, color: BRAND.white, lineHeight: 1, marginTop: 4 }}>
                  {listing.openHouseTime}
                  {listing.openHouseEndTime ? ` – ${listing.openHouseEndTime}` : ''}
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ height: 5, background: BRAND.accentWarm, flexShrink: 0 }} />

        {/* ── Hero photo ──────────────────────────────────────────── */}
        <div style={{ position: 'relative', height: 320, overflow: 'hidden', flexShrink: 0 }}>
          {primaryPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={primaryPhoto.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${BRAND.navyLight} 0%, ${BRAND.navy} 100%)` }} />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)' }} />

          {/* Price badge bottom-left */}
          <div style={{ position: 'absolute', bottom: 20, left: 28, display: 'flex', gap: 16, alignItems: 'center' }}>
            <PriceTag price={listing.price} dark size="lg" />
            <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.3)' }} />
            <StatBar listing={listing} dark size="md" />
          </div>
        </div>

        {/* ── Address bar ─────────────────────────────────────────── */}
        <div style={{ padding: '16px 44px', background: BRAND.offWhite, borderBottom: `1px solid ${BRAND.grayLight}`, flexShrink: 0 }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: BRAND.navy, letterSpacing: '-0.02em' }}>
            {listing.address}
          </div>
          <div style={{ fontSize: 13, color: BRAND.gray, marginTop: 4 }}>
            {listing.city}, {listing.state} {listing.zip}
            {listing.subdivision ? ` · ${listing.subdivision}` : ''}
            {listing.mlsNumber ? ` · MLS# ${listing.mlsNumber}` : ''}
          </div>
        </div>

        {/* ── Body: features + secondary photos ───────────────────── */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Left: description + features */}
          <div style={{ flex: 1, padding: '22px 44px 22px', display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
            {listing.headline && (
              <div>
                <GoldBar width={36} style={{ marginBottom: 8 }} />
                <div style={{ fontSize: 15, fontWeight: 700, color: BRAND.navy, lineHeight: 1.35 }}>
                  {listing.headline}
                </div>
              </div>
            )}
            {listing.description && (
              <div style={{ fontSize: 11, color: BRAND.gray, lineHeight: 1.65 }}>
                {listing.description.slice(0, 350)}{listing.description.length > 350 ? '…' : ''}
              </div>
            )}
            {listing.features.length > 0 && (
              <div>
                <div style={{ fontSize: 9, fontWeight: 700, color: BRAND.navy, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                  Home Highlights
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 20px' }}>
                  {listing.features.slice(0, 8).map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: BRAND.accentWarm, flexShrink: 0, marginTop: 5 }} />
                      <div style={{ fontSize: 10.5, color: BRAND.gray, lineHeight: 1.45 }}>{f}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: secondary photos stacked */}
          {extraPhotos.length > 0 && (
            <div style={{ width: 200, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2, padding: '0 0 0 2px' }}>
              {extraPhotos.map((photo) => (
                <div key={photo.id} style={{ flex: 1, overflow: 'hidden' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Bottom: CTA + agent ──────────────────────────────────── */}
        <div style={{ background: BRAND.accentWarm, padding: '14px 44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 900, color: BRAND.white }}>
              {listing.ctaText || 'No Appointment Needed — All Are Welcome!'}
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>
              {listing.agentWebsite}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: BRAND.white }}>{listing.agentName}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', marginTop: 2, fontWeight: 600 }}>{listing.agentPhone}</div>
          </div>
        </div>

        {/* ── Legal footer ──────────────────────────────────────────── */}
        <div style={{ padding: '8px 44px', background: BRAND.navy }}>
          <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>
            {listing.disclaimer || 'Information deemed reliable but not guaranteed. © Joe Leffew Properties · Keller Williams. Equal Housing Opportunity.'}
          </div>
        </div>
      </div>
    </TemplateWrapper>
  )
}
