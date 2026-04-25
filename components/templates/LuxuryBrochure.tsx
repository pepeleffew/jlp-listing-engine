import React from 'react'
import { Listing } from '@/types'
import { BRAND, GRADIENTS, FONT } from '@/lib/templates/brand'
import { FeatureList, Rule, PriceDisplay, StatRow, TemplateWrapper } from '@/components/templates/shared'

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

export default function LuxuryBrochure({ listing, variant = 'default', scale = 1, id }: Props) {
  const elementId = id || `tpl-luxury-brochure-${variant}`

  const primaryPhoto = listing.photos.find(p => p.id === listing.primaryPhotoId) || listing.photos[0]
  const photos = listing.photos.filter(p => p.id !== listing.primaryPhotoId).slice(0, 2)

  return (
    <TemplateWrapper id={elementId} width={W} height={H} scale={scale}>
      <div style={{ position: 'absolute', inset: 0, background: '#0f1923', display: 'flex', flexDirection: 'column' }}>

        {/* ── Hero section — left photo, right dark content ──────── */}
        <div style={{ display: 'flex', height: 480, flexShrink: 0 }}>
          {/* Full-bleed photo left 55% */}
          <div style={{ width: '55%', position: 'relative', overflow: 'hidden' }}>
            {primaryPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={primaryPhoto.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', background: BRAND.navyLight }} />
            )}
            {/* Subtle right fade into dark bg */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, #0f1923 100%)' }} />
          </div>

          {/* Right: hero text */}
          <div style={{ flex: 1, padding: '48px 40px 32px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {/* Branding */}
            <div>
              <div style={{ fontSize: 9, color: BRAND.accentWarm, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 20 }}>
                {listing.agentName} · {listing.brokerageName}
              </div>
              <div style={{ width: 32, height: 1, background: BRAND.accentWarm, marginBottom: 20 }} />
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 12 }}>
                Exclusively Presented
              </div>
              {listing.headline ? (
                <div style={{ fontSize: 22, fontWeight: 700, color: BRAND.white, lineHeight: 1.3, fontStyle: 'italic', fontFamily: FONT.display }}>
                  &ldquo;{listing.headline}&rdquo;
                </div>
              ) : (
                <div style={{ fontSize: 22, fontWeight: 800, color: BRAND.white, lineHeight: 1.2, fontFamily: FONT.display }}>
                  {listing.address}
                </div>
              )}
            </div>

            {/* Address + price */}
            <div>
              <div style={{ fontSize: 19, fontWeight: 800, color: BRAND.white, lineHeight: 1.2, marginBottom: 6, fontFamily: FONT.display }}>
                {listing.address}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', marginBottom: 18 }}>
                {listing.city}, {listing.state} {listing.zip}
                {listing.subdivision ? ` · ${listing.subdivision}` : ''}
              </div>
              <PriceTag price={listing.price} dark size="lg" />
              <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <StatBar listing={listing} dark size="md" />
              </div>
            </div>
          </div>
        </div>

        {/* Gold seam */}
        <div style={{ height: 3, background: BRAND.accentWarm, flexShrink: 0 }} />

        {/* ── Body ─────────────────────────────────────────────────── */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

          {/* Left: secondary photos stacked */}
          <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2, padding: '2px 2px 2px 0' }}>
            {photos.length > 0 ? photos.map((photo) => (
              <div key={photo.id} style={{ flex: 1, overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )) : (
              // Placeholder blocks if no extra photos
              <>
                <div style={{ flex: 1, background: '#1a2535' }} />
                <div style={{ flex: 1, background: '#162030' }} />
              </>
            )}
          </div>

          {/* Right: description + features + specs */}
          <div style={{ flex: 1, padding: '28px 40px', display: 'flex', flexDirection: 'column', gap: 20, overflow: 'hidden' }}>
            {/* Description */}
            {listing.description && (
              <div>
                <div style={{ fontSize: 9, color: BRAND.accentWarm, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>
                  About This Property
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75 }}>
                  {listing.description.slice(0, 440)}{listing.description.length > 440 ? '…' : ''}
                </div>
              </div>
            )}

            {/* Features */}
            {listing.features.length > 0 && (
              <div>
                <div style={{ fontSize: 9, color: BRAND.accentWarm, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
                  Property Highlights
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 28px' }}>
                  {listing.features.slice(0, 8).map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ width: 18, height: 1, background: BRAND.accentWarm, flexShrink: 0, marginTop: 7 }} />
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>{f}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Spec pills */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 'auto' }}>
              {[
                { l: 'Beds',      v: listing.beds },
                { l: 'Baths',     v: listing.baths },
                { l: 'Sq Ft',     v: listing.sqft },
                { l: 'Lot',       v: listing.lotSize },
                { l: 'Built',     v: listing.yearBuilt },
              ].filter(s => s.v).map(({ l, v }) => (
                <div key={l} style={{
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 6, padding: '7px 14px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: BRAND.white }}>{v}</div>
                  <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <div style={{ flexShrink: 0 }}>
          {/* Open house callout if exists */}
          {(listing.openHouseDate || listing.openHouseTime) && (
            <div style={{ background: BRAND.accentWarm, padding: '12px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 12, fontWeight: 900, color: BRAND.white, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Open House
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: BRAND.white }}>
                {listing.openHouseDate}{listing.openHouseTime ? ` · ${listing.openHouseTime}` : ''}
                {listing.openHouseEndTime ? ` – ${listing.openHouseEndTime}` : ''}
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>
                {listing.ctaText || 'No Appointment Needed'}
              </div>
            </div>
          )}

          {/* Agent bar */}
          <div style={{ background: '#0a111a', padding: '14px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: BRAND.white }}>{listing.agentName}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{listing.brokerageName} · Chattanooga, TN</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>
                {listing.disclaimer?.slice(0, 100) || 'Information deemed reliable but not guaranteed. Equal Housing Opportunity.'}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.accentWarm }}>{listing.agentPhone}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{listing.agentWebsite}</div>
            </div>
          </div>
        </div>
      </div>
    </TemplateWrapper>
  )
}
