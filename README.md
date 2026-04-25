# JLP Listing Design Engine

Private internal marketing tool for Joe Leffew Properties.  
**Generate professional real estate marketing graphics in under 2 minutes from a single listing entry.**

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State | Zustand + Immer (localStorage persistence) |
| Image export | html2canvas |
| PDF export | jsPDF |
| Batch ZIP | JSZip |
| CSV parsing | PapaParse |
| File uploads | react-dropzone |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

That's it. No database, no environment variables required.  
All listing data persists in your browser's localStorage.

---

## App Structure

```
jlp-listing-engine/
├── app/
│   ├── dashboard/          # Main dashboard with stats + quick actions
│   ├── listings/
│   │   ├── page.tsx        # Listings index — search, filter, manage
│   │   └── [id]/
│   │       ├── page.tsx    # Listing editor (5 sections)
│   │       └── generate/   # Template gallery + export UI
│   ├── import/             # CSV import wizard (4 steps)
│   └── templates/          # Browse all templates
│
├── components/
│   ├── layout/AppShell.tsx # Sidebar + nav
│   ├── ui/index.tsx        # Design system primitives
│   ├── listing/
│   │   └── PhotoUploader.tsx
│   └── templates/
│       ├── shared.tsx              # Reusable template building blocks
│       ├── brand.ts                # Design tokens (colors, type scale)
│       ├── JustListedSquare.tsx    # 3 variants
│       ├── OpenHouseSquare.tsx     # 2 variants
│       ├── StatusSquares.tsx       # Coming Soon, Under Contract, Just Sold
│       ├── JustListedStory.tsx     # 2 vertical story variants
│       ├── StoryAndCarousel.tsx    # Open House Story + Feature Carousel
│       └── TemplateRenderer.tsx   # Routes templateId → component
│
├── lib/
│   ├── store/listingStore.ts  # Zustand store with all CRUD
│   ├── templates/
│   │   ├── registry.ts       # All 20 template definitions
│   │   └── brand.ts          # Brand tokens
│   └── utils/
│       ├── helpers.ts         # Shared utilities
│       ├── csv.ts             # CSV parsing + column auto-detection
│       └── export.ts          # html2canvas + jsPDF + ZIP
│
├── types/index.ts             # All TypeScript types
└── public/
    └── sample-listings.csv    # 4 sample Chattanooga listings
```

---

## Workflow

### Option A: Manual Entry
1. Dashboard → **New Listing**
2. Fill in Property, Marketing, Open House, Agent, Photos sections
3. Click **Generate Assets**
4. Select templates, choose format (JPG/PNG/PDF)
5. Export individually or batch

### Option B: CSV Import (Recommended for MLS exports)
1. Dashboard → **Import CSV** (or sidebar)
2. Drop your CSV file (or load sample)
3. Review auto-detected column mappings, adjust any mismatches
4. Preview all rows, uncheck any to skip
5. Click **Import** — all listings created instantly
6. Open any listing → Generate Assets

---

## CSV Format

Columns are auto-detected. These names map automatically:

| Your CSV column | Maps to |
|---|---|
| `address`, `street_address`, `property_address` | Address |
| `price`, `list_price`, `asking_price` | Price |
| `beds`, `bedrooms`, `br` | Beds |
| `baths`, `bathrooms`, `ba` | Baths |
| `sqft`, `square_feet`, `sf` | Sq Ft |
| `mls`, `mls_number`, `mls_id` | MLS # |
| `description`, `remarks` | Description |
| `features` | Features (pipe-separated: `feat1\|feat2\|feat3`) |
| `open_house_date` | Open House Date |
| `open_house_time` | Open House Time |

See `/public/sample-listings.csv` for a complete example.

---

## Templates

| Template | Sizes | Variants |
|---|---|---|
| Just Listed Square | 1080×1080 | Dark Overlay, Split Panel, Minimal White |
| Open House Square | 1080×1080 | Bold Gold, Clean Navy |
| Coming Soon Square | 1080×1080 | Dark, Light |
| Under Contract | 1080×1080 | Standard |
| Just Sold | 1080×1080 | Gold Celebration, Minimal |
| Just Listed Story | 1080×1920 | Full Photo, Split Info |
| Open House Story | 1080×1920 | Standard |
| Feature Carousel | 1080×1080 | Dark, Light (4 slides) |

---

## Adding to Cloud Storage Later

The store currently uses localStorage. To upgrade to Supabase:

1. Replace `createJSONStorage(() => localStorage)` in `lib/store/listingStore.ts`
2. Add Supabase client in `lib/supabase.ts`
3. Replace store actions with Supabase queries
4. Move photo storage from base64 → Supabase Storage buckets

Photo URLs are already abstracted — templates just read `photo.url`,  
so swapping base64 for CDN URLs requires zero template changes.

---

## Export File Naming

Files are auto-named:
```
5820-northshore-dr-just-listed-square.jpg
5820-northshore-dr-open-house-story.pdf
5820-northshore-dr-assets.zip  (batch)
```

---

## Brand Colors

| Token | Value | Usage |
|---|---|---|
| Navy | `#1d3557` | Primary background, text |
| Blue | `#3B7EA6` | Accents, links |
| Gold | `#BA7517` | Badges, CTAs, highlights |
| Off-white | `#f9f9fb` | Light surfaces |

All templates import from `lib/templates/brand.ts` — change once, update everywhere.
