# CampSite Solutions Showroom

A professional React + Tailwind application for showcasing campground website templates at trade shows.

## Features

- **Template Gallery**: Browse 3 pre-built campground website templates (Seasonal, Overnight, Trailers)
- **Section Library**: Browse and filter 13 reusable website sections with smart tagging
- **Custom Layout Builder**: Select sections and preview them in your custom order
- **Lead Capture**: Professional form with summary display for trade show booth
- **Local Storage**: Selections persist across page reloads

## Routes

- `/` - Template Gallery (landing page)
- `/t/seasonal` - Seasonal Trailer Park Template
- `/t/overnight` - Overnight Getaway Template  
- `/t/trailers` - Trailers for Sale First Template
- `/library` - Section Library (browse, filter, add/remove)
- `/my-layout` - My Layout Preview (reorder, preview)
- `/lead` - Lead Capture Form

## Project Structure

```
/src/app/
├── App.tsx                      # Main app with RouterProvider
├── routes.ts                    # Route configuration
├── context/
│   └── SectionContext.tsx       # State management for selected sections
├── data/
│   ├── sections.ts              # Section definitions and metadata
│   └── templates.ts             # Template configurations
├── components/
│   ├── layout/
│   │   ├── Header.tsx           # Main navigation header
│   │   └── TopBar.tsx           # Season info + phone bar
│   └── sections/
│       ├── Hero.tsx             # Hero banner (standard)
│       ├── HeroWeather.tsx      # Hero with weather card
│       ├── StayTypeCards.tsx    # 3-up stay type cards
│       ├── RatesTeaserStrip.tsx # Pricing teaser strip
│       ├── AmenitiesGrid.tsx    # 6-item amenities grid
│       ├── SeasonalBenefits.tsx # Seasonal benefits split layout
│       ├── TrailersGrid.tsx     # 4-up trailer listings
│       ├── GalleryGrid.tsx      # 8-image photo grid
│       ├── Reviews.tsx          # 3-card testimonials
│       ├── LocalAttractions.tsx # 3-card local activities
│       ├── FAQ.tsx              # Accordion FAQ section
│       ├── CTABanner.tsx        # Call-to-action banner
│       ├── ContactSection.tsx   # Contact form + details
│       └── Footer.tsx           # Site footer
└── pages/
    ├── TemplateGallery.tsx      # Template browsing page
    ├── TemplateSeasonal.tsx     # Seasonal template demo
    ├── TemplateOvernight.tsx    # Overnight template demo
    ├── TemplateTrailers.tsx     # Trailers template demo
    ├── SectionLibrary.tsx       # Section library with filters
    ├── MyLayout.tsx             # Custom layout builder
    └── LeadCapture.tsx          # Lead form + success state
```

## Key Components

### Section Library
- Filter by Business Model: Seasonal, Overnight, Trailers, Cottages
- Filter by Goal: Bookings, Inquiries, Trailer Leads
- Add/Remove sections with visual feedback
- Shows selected count in header

### My Layout
- Drag-free reordering with up/down buttons
- Live preview of all selected sections
- Remove sections inline
- Empty state with call-to-action

### Lead Capture
- Professional form with validation
- Summary sidebar showing selected sections
- Success screen with full summary (screenshot-ready)
- Reset functionality

## Design System

### Colors
- Primary: Emerald 700 (#047857)
- Accent: Emerald 600
- Text: Gray 900, 700, 600
- Background: White, Gray 50, Gray 900 (footer)
- Borders: Gray 200

### Typography
- Uses default Tailwind font stack
- H1: 3xl-6xl, bold
- H2: 3xl-4xl, bold
- H3: lg-2xl, bold
- Body: base, gray-600/700

### Spacing
- Section padding: py-16 md:py-20
- Container: container mx-auto px-4
- Consistent 8px-based spacing system

## State Management

Uses React Context (`SectionContext`) for:
- `selectedSections`: Array of section IDs
- `addSection(id)`: Add section to layout
- `removeSection(id)`: Remove section from layout
- `isSelected(id)`: Check if section is selected
- `moveSectionUp(id)`: Reorder up
- `moveSectionDown(id)`: Reorder down
- `clearSelections()`: Reset all selections

State persists in localStorage automatically.

## Trade Show Usage

1. Visitors browse templates on the landing page
2. They can view full template demos
3. Browse section library and filter by needs
4. Build custom layout by selecting sections
5. Preview their custom layout
6. Fill out lead form with their info
7. Success screen shows complete summary (take screenshot)

## Development

All sections are fully responsive (desktop + mobile).
Uses Tailwind CSS exclusively (no custom CSS).
Components are reusable across templates and My Layout.
All images use Unsplash placeholders.

## Next Steps

Consider adding:
- Export functionality (PDF or email)
- More templates
- More section variants
- Print styles for lead summary
- Analytics tracking for booth metrics
