import React from 'react'
import { Listing } from '@/types'
import { BRAND, FONT } from '@/lib/templates/brand'
import {
  StatusLabel, Logo,
  PriceDisplay, Rule, StatRow, FeatureList, TemplateWrapper,
} from '@/components/templates/shared'

// Local aliases so existing JSX below doesn't need rewriting
const PriceTag = PriceDisplay
const StatBar  = StatRow
const GoldBar  = Rule

// 8.5 × 11 in at 96dpi → 816 × 1056px
const W = 816
const H = 1056

interface Props {
  listing: Listing
  variant?: 'modern-hero' | 'grid-photos' | 'luxury'
  scale?: number
  id?: string
}

// ── Shared flyer header strip ─────────────────────────────────────────────
function FlyerHeader({ listing, light = false }: { listing: Listing; light?: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 36px',
      background: light ? BRAND.white : BRAND.navy,
      borderBottom: `3px solid ${BRAND.accentWarm}`,
    }}>
      <Logo variant={light ? 'dark' : 'white'} height={34} />
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: light ? BRAND.navy : BRAND.white }}>{listing.agentPhone}</div>
        <div style={{ fontSize: 10, color: light ? BRAND.gray : BRAND.navyLight, marginTop: 1 }}>{listing.agentEmail}</div>
      </div>
    </div>
  )
}

// ── Shared flyer footer ───────────────────────────────────────────────────
function FlyerFooter({ listing, light = false }: { listing: Listing; light?: boolean }) {
  return (
    <div style={{
      padding: '8px 36px',
      background: light ? BRAND.offWhite : BRAND.navy,
      borderTop: `1px solid ${light ? BRAND.grayLight : 'rgba(255,255,255,0.1)'}`,
      display: 'flex', alignItems: 'center', gap: 14,
    }}>
      <Logo variant={light ? 'dark' : 'white'} height={22} style={{ opacity: 0.7, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 7.5, color: light ? BRAND.gray : 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
          {listing.disclaimer || 'Information deemed reliable but not guaranteed. Equal Housing Opportunity.'}
        </div>
        <div style={{ fontSize: 7.5, color: light ? BRAND.gray : 'rgba(255,255,255,0.4)', marginTop: 1 }}>
          {listing.agentWebsite}{listing.mlsNumber ? ` · MLS# ${listing.mlsNumber}` : ''}
        </div>
      </div>
    </div>
  )
}

// ── Variant 1: Modern Hero ────────────────────────────────────────────────
// Photo-dominant (53% of page). Address and price overlay the photo on a
// deep bottom-fade gradient — no separate address strip below the image.
function ModernHero({ listing }: { listing: Listing }) {
  const primaryPhoto = listing.photos.find(p => p.id === listing.primaryPhotoId) || listing.photos[0]
  const extraPhotos = listing.photos.filter(p => p.id !== listing.primaryPhotoId).slice(0, 3)

  return (
    <div style={{ position: 'absolute', inset: 0, background: BRAND.white, display: 'flex', flexDirection: 'column' }}>

      {/* ── Hero photo — 53% of page, text overlaid ────────────── */}
      <div style={{ position: 'relative', height: 560, overflow: 'hidden', flexShrink: 0 }}>
        {primaryPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={primaryPhoto.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${BRAND.navyLight} 0%, ${BRAND.navyDeep} 100%)` }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,56,82,0.96) 0%, rgba(26,56,82,0.20) 52%, transparent 78%)' }} />

        {/* Top: status label + logo */}
        <div style={{ position: 'absolute', top: 26, left: 36, right: 36, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <StatusLabel text="Just Listed" dark />
          <Logo variant="white" height={36} />
        </div>

        {/* Bottom: address + price + stats emerge from gradient */}
        <div style={{ position: 'absolute', bottom: 30, left: 36, right: 36 }}>
          {listing.mlsNumber && (
            <div style={{ fontSize: 9, color: BRAND.accentWarm, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 10 }}>
              MLS# {listing.mlsNumber}
            </div>
          )}
          <div style={{ fontSize: 36, fontWeight: 800, color: BRAND.white, lineHeight: 1.05, letterSpacing: '-0.015em', marginBottom: 8, fontFamily: FONT.display }}>
            {listing.address}
          </div>
          <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.55)', marginBottom: 20, letterSpacing: '0.02em' }}>
            {listing.city}, {listing.state} {listing.zip}
            {listing.subdivision ? ` · ${listing.subdivision}` : ''}
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <PriceTag price={listing.price} dark size="lg" />
            <StatBar listing={listing} dark size="md" />
          </div>
        </div>
      </div>

      {/* Gold accent seam */}
      <div style={{ height: 3, background: BRAND.accentWarm, flexShrink: 0 }} />

      {/* ── Body ─────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flex: 1, padding: '22px 36px 18px', display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden' }}>
          {listing.headline && (
            <div style={{ fontSize: 16, fontWeight: 700, color: BRAND.navy, lineHeight: 1.35, fontFamily: FONT.display, fontStyle: 'italic' }}>
              &ldquo;{listing.headline}&rdquo;
            </div>
          )}
          {listing.description && (
            <div style={{ fontSize: 10.5, color: BRAND.gray, lineHeight: 1.70 }}>
              {listing.description.slice(0, 340)}{listing.description.length > 340 ? '…' : ''}
            </div>
          )}
          {listing.features.length > 0 && (
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, color: BRAND.navy, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8, paddingBottom: 5, borderBottom: `1px solid ${BRAND.grayLight}` }}>
                Property Highlights
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 20px' }}>
                {listing.features.slice(0, 8).map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{ width: 14, height: 1, background: BRAND.accentWarm, flexShrink: 0, marginTop: 6 }} />
                    <div style={{ fontSize: 10, color: BRAND.gray, lineHeight: 1.4 }}>{f}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 'auto' }}>
            {[
              { label: 'Bedrooms',   value: listing.beds },
              { label: 'Bathrooms',  value: listing.baths },
              { label: 'Sq Ft',      value: listing.sqft },
              { label: 'Year Built', value: listing.yearBuilt },
            ].filter(s => s.value).map(({ label, value }) => (
              <div key={label} style={{ background: BRAND.offWhite, borderRadius: 6, padding: '8px 10px', border: `1px solid ${BRAND.grayLight}` }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: BRAND.navy }}>{value}</div>
                <div style={{ fontSize: 8.5, color: BRAND.gray, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 1 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

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

      {/* CTA strip */}
      <div style={{ background: BRAND.navyMid, padding: '11px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: BRAND.white }}>
          {listing.ctaText || 'Schedule Your Private Showing Today'}
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.white }}>{listing.agentPhone}</div>
      </div>

      <FlyerFooter listing={listing} light />
    </div>
  )
}

// ── Variant 2: Grid Photos ────────────────────────────────────────────────
// 2×2 photo grid + clean info sidebar
function GridPhotos({ listing }: { listing: Listing }) {
  const photos = listing.photos.slice(0, 4)

  // Fill grid slots with placeholder if fewer than 4 photos
  const gridPhotos = [
    ...photos,
    ...Array(Math.max(0, 4 - photos.length)).fill(null),
  ]

  return (
    <div style={{ position: 'absolute', inset: 0, background: BRAND.white, display: 'flex', flexDirection: 'column' }}>
      <FlyerHeader listing={listing} light />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left: photos grid */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 3, padding: '3px 3px 3px 0' }}>
          {gridPhotos.map((photo, i) => (
            <div key={i} style={{ position: 'relative', overflow: 'hidden', background: BRAND.offWhite }}>
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={(photo as typeof photos[0]).url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${BRAND.grayLight} 0%, ${BRAND.offWhite} 100%)` }} />
              )}
              {i === 0 && (
                <div style={{ position: 'absolute', top: 10, left: 10 }}>
                  <StatusLabel text="Just Listed" dark filled />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right sidebar: address + info */}
        <div style={{ width: 240, flexShrink: 0, background: BRAND.navy, display: 'flex', flexDirection: 'column', padding: '28px 24px' }}>
          <GoldBar width={40} style={{ marginBottom: 18 }} />

          <div style={{ fontSize: 22, fontWeight: 900, color: BRAND.white, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 8 }}>
            {listing.address}
          </div>
          <div style={{ fontSize: 12, color: BRAND.navyLight, marginBottom: 20 }}>
            {listing.city}, {listing.state} {listing.zip}
          </div>

          <PriceTag price={listing.price} dark size="md" style={{ marginBottom: 20 }} />

          {/* Spec list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {[
              { label: 'Bedrooms',   v: listing.beds },
              { label: 'Bathrooms',  v: listing.baths },
              { label: 'Sq Ft',      v: listing.sqft },
              { label: 'Lot Size',   v: listing.lotSize },
              { label: 'Year Built', v: listing.yearBuilt },
            ].filter(s => s.v).map(({ label, v }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 8 }}>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: BRAND.white }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Features */}
          {listing.features.length > 0 && (
            <FeatureList features={listing.features} dark max={5} size="xs" style={{ marginBottom: 20 }} />
          )}

          {/* Contact block at bottom */}
          <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: BRAND.accentWarm, marginBottom: 10 }}>
              {listing.ctaText || 'Schedule a Showing'}
            </div>
            <Logo variant="white" height={30} style={{ marginBottom: 8 }} />
            <div style={{ fontSize: 11, color: BRAND.navyLight }}>{listing.agentPhone}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{listing.agentWebsite}</div>
          </div>
        </div>
      </div>

      <FlyerFooter listing={listing} light />
    </div>
  )
}

// ── Variant 3: Luxury Minimal ─────────────────────────────────────────────
// Editorial/magazine feel. Photo takes 64% width and 440px height.
// Playfair Display for address and headline. Maximum negative space.
function LuxuryMinimal({ listing }: { listing: Listing }) {
  const primaryPhoto = listing.photos.find(p => p.id === listing.primaryPhotoId) || listing.photos[0]
  const secondPhoto = listing.photos.find(p => p.id !== listing.primaryPhotoId)

  return (
    <div style={{ position: 'absolute', inset: 0, background: BRAND.stone, display: 'flex', flexDirection: 'column' }}>
      {/* Thin navy top rule */}
      <div style={{ height: 4, background: BRAND.navy }} />

      {/* Agent line */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 44px', borderBottom: `1px solid ${BRAND.grayLight}` }}>
        <Logo variant="dark" height={30} />
        <div style={{ fontSize: 10, color: BRAND.gray, letterSpacing: '0.04em' }}>
          {listing.agentPhone} · {listing.agentWebsite}
        </div>
      </div>

      {/* Hero — 64% photo left, address/price right */}
      <div style={{ display: 'flex', height: 440, flexShrink: 0 }}>
        <div style={{ width: '64%', position: 'relative', overflow: 'hidden' }}>
          {primaryPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={primaryPhoto.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: BRAND.navy }} />
          )}
        </div>

        <div style={{ flex: 1, padding: '36px 44px 28px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: BRAND.stone }}>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, color: BRAND.accentWarm, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 18 }}>
              New Listing
            </div>
            <div style={{ fontSize: 34, fontWeight: 800, color: BRAND.navy, lineHeight: 1.08, letterSpacing: '-0.015em', fontFamily: FONT.display }}>
              {listing.address}
            </div>
            <div style={{ fontSize: 12, color: BRAND.gray, marginTop: 10, lineHeight: 1.5 }}>
              {listing.city}, {listing.state} {listing.zip}
              {listing.subdivision ? ` · ${listing.subdivision}` : ''}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 9, color: BRAND.gray, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 6 }}>Offered at</div>
            <PriceTag price={listing.price} size="lg" />
            <div style={{ marginTop: 20 }}>
              <StatBar listing={listing} size="md" />
            </div>
          </div>
        </div>
      </div>

      {/* Gold rule */}
      <div style={{ height: 3, background: BRAND.accentWarm }} />

      {/* Content area */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flex: 1, padding: '26px 44px', display: 'flex', flexDirection: 'column', gap: 18, overflow: 'hidden' }}>
          {listing.headline && (
            <div style={{ fontSize: 18, fontWeight: 700, color: BRAND.navy, lineHeight: 1.3, fontFamily: FONT.display, fontStyle: 'italic' }}>
              &ldquo;{listing.headline}&rdquo;
            </div>
          )}
          {listing.description && (
            <div style={{ fontSize: 11, color: BRAND.gray, lineHeight: 1.72 }}>
              {listing.description.slice(0, 460)}{listing.description.length > 460 ? '…' : ''}
            </div>
          )}
          {listing.features.length > 0 && (
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, color: BRAND.navy, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10, borderBottom: `1px solid ${BRAND.grayLight}`, paddingBottom: 6 }}>
                Property Details
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 24px' }}>
                {listing.features.slice(0, 8).map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10.5, color: BRAND.gray }}>
                    <div style={{ width: 16, height: 1, background: BRAND.accentWarm, flexShrink: 0 }} />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: second photo + spec table */}
        <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
          {secondPhoto && (
            <div style={{ height: 160, overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={secondPhoto.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
          <div style={{ flex: 1, background: BRAND.navy, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { l: 'MLS#',        v: listing.mlsNumber },
              { l: 'Year Built',  v: listing.yearBuilt },
              { l: 'Lot Size',    v: listing.lotSize },
              { l: 'Bedrooms',    v: listing.beds },
              { l: 'Bathrooms',   v: listing.baths },
              { l: 'Living Area', v: listing.sqft ? `${listing.sqft} sf` : '' },
            ].filter(s => s.v).map(({ l, v }) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: 8 }}>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: BRAND.white }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: 'auto', paddingTop: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: BRAND.white }}>{listing.agentPhone}</div>
              <div style={{ fontSize: 10, color: BRAND.navyLight, marginTop: 3 }}>{listing.agentEmail}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: '10px 44px', background: BRAND.navy, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: BRAND.white, letterSpacing: '0.04em' }}>
          {listing.ctaText || 'Schedule Your Private Showing Today'}
        </div>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>
          {listing.disclaimer?.slice(0, 80) || 'Information deemed reliable but not guaranteed. Equal Housing Opportunity.'}
        </div>
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────
export default function PropertyFlyer({ listing, variant = 'modern-hero', scale = 1, id }: Props) {
  const elementId = id || `tpl-property-flyer-${variant}`
  return (
    <TemplateWrapper id={elementId} width={W} height={H} scale={scale}>
      {variant === 'modern-hero'  && <ModernHero   listing={listing} />}
      {variant === 'grid-photos'  && <GridPhotos   listing={listing} />}
      {variant === 'luxury'       && <LuxuryMinimal listing={listing} />}
    </TemplateWrapper>
  )
}
