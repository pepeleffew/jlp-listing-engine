import React from 'react'
import { Listing } from '@/types'
import { BRAND } from '@/lib/templates/brand'
import { Rule, PriceDisplay, StatRow, FeatureList, AgentFooter, TemplateWrapper } from '@/components/templates/shared'

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

// ── Spec row ─────────────────────────────────────────────────────────────
function SpecRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '9px 0', borderBottom: `1px solid ${BRAND.grayLight}`,
    }}>
      <span style={{ fontSize: 11, color: BRAND.gray, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>
        {label}
      </span>
      <span style={{ fontSize: 13, fontWeight: accent ? 800 : 600, color: accent ? BRAND.navy : BRAND.gray }}>
        {value}
      </span>
    </div>
  )
}

// ── Section heading ───────────────────────────────────────────────────────
function SectionHead({ title }: { title: string }) {
  return (
    <div style={{ marginTop: 20, marginBottom: 10 }}>
      <div style={{ fontSize: 9, fontWeight: 800, color: BRAND.navy, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        {title}
      </div>
      <div style={{ height: 2, background: BRAND.accentWarm, marginTop: 4, width: 32, borderRadius: 1 }} />
    </div>
  )
}

export default function FeatureSheet({ listing, variant = 'default', scale = 1, id }: Props) {
  const elementId = id || `tpl-feature-sheet-${variant}`
  const primaryPhoto = listing.photos.find(p => p.id === listing.primaryPhotoId) || listing.photos[0]
  const secondPhoto = listing.photos.find(p => p.id !== listing.primaryPhotoId)
  const thirdPhoto = listing.photos.filter(p => p.id !== listing.primaryPhotoId)[1]

  return (
    <TemplateWrapper id={elementId} width={W} height={H} scale={scale}>
      <div style={{ position: 'absolute', inset: 0, background: BRAND.white, display: 'flex', flexDirection: 'column' }}>

        {/* ── Header ──────────────────────────────────────────────── */}
        <div style={{ background: BRAND.navy, padding: '16px 44px 0', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: 16 }}>
            <div>
              <div style={{ fontSize: 9, color: BRAND.accentWarm, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>
                Property Feature Sheet
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, color: BRAND.white, lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                {listing.address}
              </div>
              <div style={{ fontSize: 13, color: BRAND.navyLight, marginTop: 5 }}>
                {listing.city}, {listing.state} {listing.zip}
                {listing.subdivision ? ` · ${listing.subdivision}` : ''}
              </div>
            </div>
            <div style={{ textAlign: 'right', paddingTop: 4 }}>
              <PriceTag price={listing.price} dark size="md" />
              {listing.mlsNumber && (
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', marginTop: 6 }}>
                  MLS# {listing.mlsNumber}
                </div>
              )}
            </div>
          </div>
          {/* Gold bar at very bottom of header */}
          <div style={{ height: 4, background: BRAND.accentWarm, marginLeft: -44, marginRight: -44 }} />
        </div>

        {/* ── Body ────────────────────────────────────────────────── */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

          {/* Left column: photos + property details */}
          <div style={{ width: 300, flexShrink: 0, borderRight: `1px solid ${BRAND.grayLight}`, display: 'flex', flexDirection: 'column' }}>
            {/* Primary photo */}
            <div style={{ height: 200, overflow: 'hidden', flexShrink: 0 }}>
              {primaryPhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={primaryPhoto.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${BRAND.navyLight} 0%, ${BRAND.navy} 100%)` }} />
              )}
            </div>

            {/* Secondary photos side by side */}
            {(secondPhoto || thirdPhoto) && (
              <div style={{ height: 110, display: 'flex', gap: 2, flexShrink: 0 }}>
                {[secondPhoto, thirdPhoto].filter(Boolean).map((photo, i) => (
                  <div key={i} style={{ flex: 1, overflow: 'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={(photo as typeof secondPhoto)!.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}

            {/* Property specs */}
            <div style={{ flex: 1, padding: '16px 24px', overflow: 'hidden' }}>
              <SectionHead title="Property Details" />
              {[
                { label: 'Bedrooms',    value: listing.beds,      accent: true },
                { label: 'Bathrooms',   value: listing.baths,     accent: true },
                { label: 'Living Area', value: listing.sqft ? `${listing.sqft} sq ft` : '', accent: true },
                { label: 'Lot Size',    value: listing.lotSize,   accent: false },
                { label: 'Year Built',  value: listing.yearBuilt, accent: false },
                { label: 'Subdivision', value: listing.subdivision, accent: false },
              ].filter(s => s.value).map(({ label, value, accent }) => (
                <SpecRow key={label} label={label} value={value as string} accent={accent} />
              ))}

              {/* Open house block */}
              {(listing.openHouseDate || listing.openHouseTime) && (
                <div style={{ marginTop: 20, background: BRAND.offWhite, borderRadius: 8, padding: '12px 14px', border: `1px solid ${BRAND.grayLight}` }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: BRAND.accentWarm, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 6 }}>
                    Open House
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.navy }}>{listing.openHouseDate}</div>
                  <div style={{ fontSize: 12, color: BRAND.gray, marginTop: 2 }}>
                    {listing.openHouseTime}{listing.openHouseEndTime ? ` – ${listing.openHouseEndTime}` : ''}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right column: headline + description + features */}
          <div style={{ flex: 1, padding: '20px 36px', display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
            {listing.headline && (
              <div>
                <GoldBar width={36} style={{ marginBottom: 10 }} />
                <div style={{ fontSize: 18, fontWeight: 700, color: BRAND.navy, lineHeight: 1.3 }}>
                  {listing.headline}
                </div>
              </div>
            )}

            {listing.description && (
              <div style={{ fontSize: 11, color: BRAND.gray, lineHeight: 1.7 }}>
                {listing.description.slice(0, 450)}{listing.description.length > 450 ? '…' : ''}
              </div>
            )}

            {listing.features.length > 0 && (
              <div>
                <SectionHead title="Key Features & Highlights" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px' }}>
                  {listing.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '6px 0', borderBottom: `1px solid ${BRAND.grayLight}` }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: '50%', background: BRAND.navy,
                        color: BRAND.white, fontSize: 9, fontWeight: 800,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
                      }}>{i + 1}</div>
                      <div style={{ fontSize: 11, color: BRAND.gray, lineHeight: 1.4 }}>{f}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom: agent contact card */}
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', background: BRAND.offWhite, borderRadius: 10, border: `1px solid ${BRAND.grayLight}` }}>
              {/* Agent avatar */}
              <div style={{
                width: 44, height: 44, borderRadius: '50%', background: BRAND.navy,
                color: BRAND.white, fontSize: 16, fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {listing.agentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: BRAND.navy }}>{listing.agentName}</div>
                <div style={{ fontSize: 11, color: BRAND.gray }}>{listing.brokerageName}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: BRAND.navy }}>{listing.agentPhone}</div>
                <div style={{ fontSize: 10, color: BRAND.gray, marginTop: 2 }}>{listing.agentEmail}</div>
                <div style={{ fontSize: 10, color: BRAND.navyLight, marginTop: 1 }}>{listing.agentWebsite}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <div style={{ padding: '9px 44px', background: BRAND.offWhite, borderTop: `1px solid ${BRAND.grayLight}`, flexShrink: 0 }}>
          <div style={{ fontSize: 7.5, color: BRAND.gray, lineHeight: 1.5 }}>
            {listing.disclaimer || 'Information deemed reliable but not guaranteed. Equal Housing Opportunity. © Joe Leffew Properties | Keller Williams.'}
          </div>
        </div>
      </div>
    </TemplateWrapper>
  )
}
