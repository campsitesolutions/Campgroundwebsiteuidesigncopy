# Testing the Section Selection System

## Quick Test Flow

### Step 1: Start at the Section Library
1. Navigate to `/library` (or click "Section Library" in the header)
2. You'll see 13 section cards with "Add to Layout" buttons

### Step 2: Add Sections
1. Click "Add to Layout" on any section (try "Hero Banner" first)
2. The button should change to "Selected" with a checkmark ✓
3. The header badge should show "1"
4. Add 2-3 more sections (try "Amenities Icon Grid" and "Reviews")

### Step 3: View Your Layout
1. Click "My Layout" in the header (you'll see your count badge)
2. You should see:
   - A control panel at the top showing your selected sections
   - A full preview of each section stacked vertically
   - Up/down arrows to reorder sections
   - X buttons to remove sections

### Step 4: Test Features

**Reordering:**
- Click the up/down arrows in the control panel
- The preview below should update immediately

**Removing:**
- Click the X button on any section
- It should disappear from both the control panel and preview

**Filtering (back in /library):**
- Click business model filters: "Seasonal", "Overnight", etc.
- Only matching sections should appear
- Click goal filters: "Bookings", "Inquiries", "Trailer Leads"
- Sections filter further

**Persistence:**
- Add some sections
- Refresh the page
- Your selections should still be there (saved in localStorage)

### Step 5: Lead Capture
1. With sections selected, go to `/lead`
2. Fill out the form
3. Submit
4. See your summary with all selected sections listed

## How It Works Under the Hood

```
User clicks "Add to Layout"
         ↓
addSection(id) is called
         ↓
selectedSections array updated: ['hero', 'amenities-grid', 'reviews']
         ↓
State saved to localStorage
         ↓
Header badge updates (shows "3")
         ↓
User navigates to /my-layout
         ↓
MyLayout reads selectedSections: ['hero', 'amenities-grid', 'reviews']
         ↓
Maps IDs to section data from sections.ts
         ↓
Maps component names to actual React components
         ↓
Renders: <Hero />, <AmenitiesGrid />, <Reviews />
```

## Visual Flow

```
┌─────────────────────────────────────────┐
│         Section Library (/library)      │
│                                         │
│  ┌──────────────┐  ┌──────────────┐   │
│  │ Hero Banner  │  │ Amenities    │   │
│  │              │  │              │   │
│  │ [Add] ←───────Click──────► [Selected] │
│  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────┘
                ↓
        State Updated
                ↓
┌─────────────────────────────────────────┐
│         Header (always visible)         │
│                                         │
│  Templates | Library | My Layout (2) ← Badge
│                                    ↑    │
└────────────────────────────────────┼────┘
                                     │
                            Shows count
                                     ↓
┌─────────────────────────────────────────┐
│         My Layout (/my-layout)          │
│                                         │
│  Section Order:                         │
│  [Hero Banner] [↑] [↓] [×]             │
│  [Amenities Icon Grid] [↑] [↓] [×]    │
│                                         │
│  ──────── Preview ────────              │
│                                         │
│  [Full Hero Section Rendered]          │
│  [Full Amenities Section Rendered]     │
└─────────────────────────────────────────┘
```

## Debugging

If selections aren't working:

1. **Check Browser Console** - Look for any errors
2. **Check localStorage** - In DevTools → Application → localStorage → look for 'selectedSections'
3. **Verify Context** - The app should be wrapped in `<SectionProvider>`
4. **Check Component Map** - Ensure all component names in sections.ts match the componentMap

## Current State

All 13 sections are available:
- ✓ Hero Banner
- ✓ Hero with Weather Card  
- ✓ Stay Type Cards
- ✓ Rates Teaser Strip
- ✓ Amenities Icon Grid
- ✓ Seasonal Benefits
- ✓ Trailers for Sale Grid
- ✓ Photo Gallery
- ✓ Customer Reviews
- ✓ Local Attractions
- ✓ FAQ Accordion
- ✓ CTA Banner
- ✓ Contact Form + Details

Each section:
- Has a unique ID
- Maps to a React component
- Has business model tags for filtering
- Has goal tags for filtering
- Shows description and tags in the library
