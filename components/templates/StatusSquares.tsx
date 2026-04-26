'use client'
import React from 'react'
import { Listing } from '@/types'
import { BRAND, TYPE, WEIGHT, M, FONT, ZONES } from '@/lib/templates/brand'
import { PhotoBg, StatRow, TemplateWrapper, Logo } from '@/components/templates/shared'

const W = 1080, H = 1080
const E = M.social.edge

// ════════════════════════════════════════════════════════════════════════════
//  COMING SOON
//  Dark & Bold — photo-first, deep gradient shelf, price as mid-canvas hero
//  Light & Airy — stone card, framed photo, navy text, print-ad aesthetic
// ════════════════════════════════════════════════════════════════════════════
interface ComingSoonProps { listing: Listing; variant?: 'dark' | 'light'; scale?: number; id?: string }

function ComingSoonDark({ listing }: { listing: Listing }) {
  return (
    <>
      <PhotoBg listing={listing} overlay="rgba(26,56,82,0.08)" />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(26,56,82,0.99) 0%, rgba(26,56,82,0.99) 20%, rgba(26,56,82,0.90) 36%, rgba(26,56,82,0.32) 56%, transparent 72%)',
      }} />

      <div style={{
        position: 'absolute', top: E, left: E, right: E,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10,
      }}>
        <Logo variant="white" height={36} />
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          border: '1.5px solid rgba(255,255,255,0.45)', borderRadius: 100, padding: '8px 18px',
        }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: BRAND.navyLight, flexShrink: 0 }} />
          <div style={{
            fontSize: 13, fontWeight: WEIGHT.semibold, color: 'rgba(255,255,255,0.90)',
            letterSpacing: '0.18em', textTransform: 'uppercase' as const,
          }}>Coming Soon</div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 290, left: E, right: E, zIndex: 10 }}>
        <div style={{
          fontSize: 12, fontWeight: WEIGHT.semibold, color: 'rgba(255,255,255,0.72)',
          letterSpacing: '0.22em', textTransform: 'uppercase' as const, marginBottom: 14,
        }}>Listed at</div>
        {listing.price ? (
          <div style={{
            fontSize: 124, fontWeight: WEIGHT.black, color: BRAND.white,
            lineHeight: 0.88, letterSpacing: '-0.04em',
            textShadow: '0 6px 48px rgba(26,56,82,0.95), 0 2px 12px rgba(26,56,82,0.70)',
          }}>{listing.price}</div>
        ) : (
          <div style={{
            fontSize: TYPE.s_xl, fontWeight: WEIGHT.black, color: BRAND.white,
            lineHeight: 0.92, letterSpacing: '-0.03em', fontFamily: FONT.display,
            textShadow: '0 4px 36px rgba(26,56,82,0.90), 0 1px 10px rgba(26,56,82,0.65)',
          }}>Details<br />Coming.</div>
        )}
      </div>

      {/* Zone 3 — fixed bottom zone */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: ZONES.social.BOTTOM_H,
        padding: `24px ${E}px ${E}px`,
        zIndex: 10,
        overflow: 'hidden',
      }}>
        <div style={{ width: 40, height: 2.5, background: BRAND.navyLight, marginBottom: 14 }} />
        <div style={{
          fontSize: TYPE.s_sm, fontWeight: WEIGHT.bold, color: BRAND.white,
          lineHeight: 1.05, letterSpacing: '-0.01em', fontFamily: FONT.display, marginBottom: 6,
          textShadow: '0 1px 12px rgba(26,56,82,0.55)',
          overflow: 'hidden',
        }}>{listing.address || 'Details Coming Soon'}</div>
        <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.72)', marginBottom: 14, letterSpacing: '0.02em' }}>
          {listing.city}, {listing.state}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <StatRow listing={listing} dark size="sm" />
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.72)', letterSpacing: '0.04em' }}>{listing.agentPhone}</div>
        </div>
      </div>
    </>
  )
}

function ComingSoonLight({ listing }: { listing: Listing }) {
  const photo = listing.photos.find(p => p.id === listing.primaryPhotoId) || listing.photos[0]
  const PHOTO_H = 480

  return (
    <div style={{ position: 'absolute', inset: 0, background: BRAND.stone }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: BRAND.accentWarm }} />

      <div style={{
        position: 'absolute', top: 6, left: E, right: E, height: 80,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{
          fontSize: 13, fontWeight: WEIGHT.black, color: BRAND.navyDeep,
          letterSpacing: '0.22em', textTransform: 'uppercase' as const,
        }}>Coming Soon</div>
        <Logo variant="dark" height={36} />
      </div>

      <div style={{
        position: 'absolute', top: 86, left: 28, right: 28, height: PHOTO_H,
        borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 52px rgba(26,56,82,0.50)',
      }}>
        {photo?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: BRAND.navyMid }} />
        )}
      </div>

      <div style={{
        position: 'absolute', top: 86 + PHOTO_H + 24, left: E, right: E, bottom: E,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        overflow: 'hidden',
      }}>
        <div>
          <div style={{ width: 48, height: 3, background: BRAND.accentWarm, marginBottom: 18 }} />
          {listing.price ? (
            <div style={{
              fontSize: TYPE.s_3xl, fontWeight: WEIGHT.black, color: BRAND.navyDeep,
              lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: 14,
            }}>{listing.price}</div>
          ) : (
            <div style={{
              fontSize: TYPE.s_lg, fontWeight: WEIGHT.black, color: BRAND.navyDeep,
              lineHeight: 1.0, letterSpacing: '-0.025em', marginBottom: 14,
            }}>Details Coming Soon</div>
          )}
          <div style={{
            fontSize: TYPE.s_sm, fontWeight: WEIGHT.black, color: BRAND.navyDeep,
            lineHeight: 1.05, letterSpacing: '-0.015em', fontFamily: FONT.display, marginBottom: 8,
          }}>{listing.address || 'Address Coming Soon'}</div>
          <div style={{ fontSize: TYPE.s_xs, color: BRAND.navy, letterSpacing: '0.03em' }}>
            {listing.city}, {listing.state}
          </div>
        </div>
        <div>
          <div style={{ height: 1, background: 'rgba(26,56,82,0.15)', marginBottom: 16 }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <StatRow listing={listing} dark={false} size="sm" />
            <div style={{ fontSize: 18, color: BRAND.navy, letterSpacing: '0.04em' }}>{listing.agentPhone}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ComingSoonSquare({ listing, variant = 'dark', scale = 1, id }: ComingSoonProps) {
  const elementId = id || `tpl-coming-soon-square-${variant}`
  return (
    <TemplateWrapper id={elementId} width={W} height={H} scale={scale}>
      {variant === 'dark'  && <ComingSoonDark  listing={listing} />}
      {variant === 'light' && <ComingSoonLight listing={listing} />}
    </TemplateWrapper>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  UNDER CONTRACT — diagonal band stamp
//  Bold rotated band cuts across the photo. Unmistakable status signal.
// ════════════════════════════════════════════════════════════════════════════
interface UnderContractProps { listing: Listing; scale?: number; id?: string }

export function UnderContractSquare({ listing, scale = 1, id }: UnderContractProps) {
  const elementId = id || 'tpl-under-contract-square-default'

  return (
    <TemplateWrapper id={elementId} width={W} height={H} scale={scale}>
      <PhotoBg listing={listing} overlay="rgba(26,56,82,0.10)" />

      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          top: '50%', left: '-20%', right: '-20%',
          transform: 'translateY(-50%) rotate(-12deg)',
          background: BRAND.navyMid,
          padding: '44px 0',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}>
          <div style={{
            fontSize: 54, fontWeight: WEIGHT.black, color: BRAND.white,
            letterSpacing: '0.18em', textTransform: 'uppercase' as const,
          }}>Under Contract</div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: E, left: E, zIndex: 10 }}>
        <Logo variant="white" height={36} />
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, rgba(26,56,82,0.99) 0%, rgba(26,56,82,0.99) 20%, rgba(26,56,82,0.82) 44%, transparent 65%)',
        padding: `80px ${E}px ${E}px`,
        zIndex: 5,
      }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.30)', marginBottom: 22 }} />
        {listing.price && (
          <div style={{
            fontSize: 100, fontWeight: WEIGHT.black, color: BRAND.white,
            letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: 10,
          }}>{listing.price}</div>
        )}
        <div style={{
          fontSize: TYPE.s_xs, fontWeight: WEIGHT.bold, color: 'rgba(255,255,255,0.90)',
          lineHeight: 1.05, letterSpacing: '-0.01em', fontFamily: FONT.display, marginBottom: 12,
        }}>{listing.address}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <StatRow listing={listing} dark size="sm" />
          <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>{listing.agentPhone}</div>
        </div>
      </div>
    </TemplateWrapper>
  )
}

// ════════════════════════════════════════════════════════════════════════════
//  JUST SOLD
//  Gold Celebration — photo-first drama, 126px price, rotated SOLD stamp
//  Minimal         — editorial split panel, photo left, dark info right
// ════════════════════════════════════════════════════════════════════════════
interface JustSoldProps { listing: Listing; variant?: 'gold-celebration' | 'minimal'; scale?: number; id?: string }

function JustSoldDrama({ listing }: { listing: Listing }) {
  return (
    <>
      <PhotoBg listing={listing} overlay="rgba(26,56,82,0.08)" />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(26,56,82,0.99) 0%, rgba(26,56,82,0.99) 22%, rgba(26,56,82,0.84) 36%, rgba(26,56,82,0.22) 52%, transparent 66%)',
      }} />

      <div style={{ position: 'absolute', top: E, left: E, zIndex: 10 }}>
        <Logo variant="white" height={36} />
      </div>

      <div style={{
        position: 'absolute', top: E - 4, right: E,
        transform: 'rotate(-8deg)', zIndex: 10,
        padding: '10px 24px',
        border: '3px solid rgba(255,255,255,0.90)', borderRadius: 4,
      }}>
        <div style={{
          fontSize: 58, fontWeight: WEIGHT.black, color: BRAND.white,
          letterSpacing: '0.20em', textTransform: 'uppercase' as const, lineHeight: 1,
          textShadow: '0 2px 28px rgba(26,56,82,0.95)',
        }}>SOLD</div>
      </div>

      <div style={{ position: 'absolute', bottom: 262, left: E, right: E, zIndex: 10 }}>
        <div style={{
          fontSize: 12, fontWeight: WEIGHT.semibold, color: 'rgba(255,255,255,0.72)',
          letterSpacing: '0.22em', textTransform: 'uppercase' as const, marginBottom: 14,
        }}>Sold for</div>
        {listing.price ? (
          <div style={{
            fontSize: 134, fontWeight: WEIGHT.black, color: BRAND.white,
            lineHeight: 0.87, letterSpacing: '-0.04em',
            textShadow: '0 8px 56px rgba(26,56,82,0.95), 0 2px 16px rgba(26,56,82,0.70)',
          }}>{listing.price}</div>
        ) : (
          <div style={{
            fontSize: TYPE.s_2xl, fontWeight: WEIGHT.black, color: BRAND.white,
            lineHeight: 0.90, letterSpacing: '-0.035em', fontFamily: FONT.display,
          }}>Beautifully<br />Sold.</div>
        )}
      </div>

      {/* Zone 3 — fixed bottom zone */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: ZONES.social.BOTTOM_H,
        background: BRAND.navyDeep,
        padding: `24px ${E}px ${E}px`,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        zIndex: 10,
        overflow: 'hidden',
      }}>
        <div>
          <div style={{
            fontSize: TYPE.s_sm, fontWeight: WEIGHT.black, color: BRAND.white,
            lineHeight: 1.0, letterSpacing: '-0.01em', fontFamily: FONT.display,
            marginBottom: 6, overflow: 'hidden',
          }}>{listing.address}</div>
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.02em' }}>
            {listing.city}, {listing.state}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <StatRow listing={listing} dark size="sm" />
          <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.02em' }}>{listing.agentPhone}</div>
        </div>
      </div>
    </>
  )
}

function JustSoldMinimal({ listing }: { listing: Listing }) {
  const photo = listing.photos.find(p => p.id === listing.primaryPhotoId) || listing.photos[0]

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
      {/* Left: full-bleed photo */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {photo?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: BRAND.navyMid }} />
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, transparent 55%, rgba(26,56,82,0.68) 100%)',
        }} />
      </div>

      {/* Right: dark editorial panel — overflow: hidden prevents text bleeding past panel */}
      <div style={{
        width: 360, flexShrink: 0,
        background: BRAND.navyDeep,
        padding: `${E}px 36px`,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        overflow: 'hidden',
        zIndex: 1,
      }}>
        <div>
          <Logo variant="white" height={36} style={{ marginBottom: 28 }} />
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            background: BRAND.navyMid, borderRadius: 100, padding: '10px 22px',
          }}>
            <div style={{
              fontSize: 18, fontWeight: WEIGHT.black, color: BRAND.white,
              letterSpacing: '0.14em', textTransform: 'uppercase' as const,
            }}>Just Sold</div>
          </div>
        </div>

        <div>
          <div style={{
            fontSize: 11, fontWeight: WEIGHT.semibold, color: 'rgba(255,255,255,0.62)',
            letterSpacing: '0.22em', textTransform: 'uppercase' as const, marginBottom: 10,
          }}>Closed at</div>
          {listing.price && (
            <div style={{
              fontSize: TYPE.s_2xl, fontWeight: WEIGHT.black, color: BRAND.white,
              lineHeight: 1.0, letterSpacing: '-0.025em', marginBottom: 22,
            }}>{listing.price}</div>
          )}
          <div style={{ height: 1.5, background: 'rgba(255,255,255,0.32)', marginBottom: 22 }} />
          <div style={{
            fontSize: TYPE.s_sm, fontWeight: WEIGHT.bold, color: BRAND.white,
            lineHeight: 1.1, letterSpacing: '-0.01em', fontFamily: FONT.display, marginBottom: 10,
          }}>{listing.address}</div>
          <div style={{ fontSize: TYPE.s_xs - 4, color: 'rgba(255,255,255,0.68)', letterSpacing: '0.02em' }}>
            {listing.city}, {listing.state}
          </div>
        </div>

        <div>
          <StatRow listing={listing} dark size="sm" />
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.68)', marginTop: 14, letterSpacing: '0.02em' }}>
            {listing.agentPhone}
          </div>
        </div>
      </div>
    </div>
  )
}

export function JustSoldSquare({ listing, variant = 'gold-celebration', scale = 1, id }: JustSoldProps) {
  const elementId = id || `tpl-just-sold-square-${variant}`
  return (
    <TemplateWrapper id={elementId} width={W} height={H} scale={scale}>
      {variant === 'gold-celebration' && <JustSoldDrama   listing={listing} />}
      {variant === 'minimal'          && <JustSoldMinimal listing={listing} />}
    </TemplateWrapper>
  )
}
