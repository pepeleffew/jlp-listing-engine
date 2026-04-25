import React from 'react'
import { Listing } from '@/types'

// Social squares
import JustListedSquare from '@/components/templates/JustListedSquare'
import OpenHouseSquare from '@/components/templates/OpenHouseSquare'
import { ComingSoonSquare, UnderContractSquare, JustSoldSquare } from '@/components/templates/StatusSquares'

// Stories + carousel
import JustListedStory from '@/components/templates/JustListedStory'
import { OpenHouseStory, FeatureCarouselSlide } from '@/components/templates/StoryAndCarousel'

// Flyers + print
import PropertyFlyer from '@/components/templates/PropertyFlyer'
import OpenHouseFlyer from '@/components/templates/OpenHouseFlyer'
import FeatureSheet from '@/components/templates/FeatureSheet'
import LuxuryBrochure from '@/components/templates/LuxuryBrochure'

// Web + social extras
import {
  Top5FeaturesSquare,
  EmailHeader,
  FacebookCover,
  QRCard,
} from '@/components/templates/WebSocialTemplates'

interface TemplateRenderProps {
  templateId: string
  variant: string
  listing: Listing
  scale?: number
  id?: string
  slideIndex?: number
}

export function renderTemplate({
  templateId, variant, listing, scale = 1, id, slideIndex = 0,
}: TemplateRenderProps): React.ReactNode {
  const base = { listing, scale, id }

  switch (templateId) {
    case 'just-listed-square':
      return <JustListedSquare {...base} variant={variant as 'dark-overlay' | 'split-panel' | 'minimal-white'} />
    case 'open-house-square':
      return <OpenHouseSquare {...base} variant={variant as 'bold-gold' | 'clean-navy'} />
    case 'coming-soon-square':
      return <ComingSoonSquare {...base} variant={variant as 'dark' | 'light'} />
    case 'under-contract-square':
      return <UnderContractSquare {...base} />
    case 'just-sold-square':
      return <JustSoldSquare {...base} variant={variant as 'gold-celebration' | 'minimal'} />
    case 'top5-features':
      return <Top5FeaturesSquare {...base} variant={variant as 'dark' | 'light'} />
    case 'just-listed-story':
      return <JustListedStory {...base} variant={variant as 'photo-full' | 'split-info'} />
    case 'open-house-story':
      return <OpenHouseStory {...base} />
    case 'features-carousel': {
      const totalSlides = Math.min(listing.features.length, 4) + 1
      return (
        <FeatureCarouselSlide
          listing={listing}
          scale={scale}
          slideIndex={slideIndex}
          totalSlides={totalSlides}
          dark={variant === 'dark'}
          id={id || `tpl-features-carousel-${variant}-slide-${slideIndex}`}
        />
      )
    }
    case 'property-flyer':
      return <PropertyFlyer {...base} variant={variant as 'modern-hero' | 'grid-photos' | 'luxury'} />
    case 'open-house-flyer':
      return <OpenHouseFlyer {...base} />
    case 'feature-sheet':
      return <FeatureSheet {...base} />
    case 'luxury-brochure':
      return <LuxuryBrochure {...base} />
    case 'email-header':
      return <EmailHeader {...base} />
    case 'facebook-cover':
      return <FacebookCover {...base} />
    case 'qr-card':
      return <QRCard {...base} />
    default:
      return (
        <div style={{
          width: 400, height: 300, background: '#f3f4f6',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          borderRadius: 12, gap: 8,
        }}>
          <div style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600 }}>Template not found</div>
          <div style={{ fontSize: 11, color: '#d1d5db', fontFamily: 'monospace' }}>{templateId}</div>
        </div>
      )
  }
}

export function getTemplateElementId(templateId: string, variant: string, slideIndex = 0): string {
  if (templateId === 'features-carousel') {
    return `tpl-features-carousel-${variant}-slide-${slideIndex}`
  }
  return `tpl-${templateId}-${variant}`
}
