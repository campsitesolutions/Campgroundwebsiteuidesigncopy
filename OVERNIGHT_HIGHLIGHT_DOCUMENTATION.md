# Overnight Experience Highlight Section

## Overview
New supporting section component for campgrounds that offer both Seasonal sites (primary) and Overnight camping (secondary add-on).

## Purpose
Provides a gentle introduction to overnight camping options for parks that are primarily seasonal-focused, helping visitors understand they can "try before they commit" to a full seasonal site.

## Rendering Logic

### ✅ Renders When:
- `allowedModels` includes **BOTH** `seasonal` AND `overnight`
- Primary business model is `seasonal`

### ❌ Does NOT Render When:
- Seasonal-only configuration
- Overnight-only configuration  
- Any other single-model configuration
- Overnight is primary (seasonal is secondary)

## Component Details

### Layout
- **Two-column responsive layout**
- **Left column:** Image placeholder (camping scene)
- **Right column:** Content (headline, paragraph, bullets, CTA)

### Default Content

**Headline:**
```
Weekend Camping Made Easy
```

**Description:**
```
Not ready for a full seasonal commitment? Test the waters with our flexible overnight camping options. Perfect for weekend getaways, special occasions, or trying out the park before booking a seasonal site.
```

**Bullet Highlights:**
- Full hookup sites available for short stays
- Access to all seasonal amenities and facilities
- Easy online booking for last-minute trips

**CTA Button:**
```
Book Overnight Stay
```

### Customization
All content can be overridden via props:
- `headline` (string)
- `description` (string)
- `highlights` (string[])
- `ctaText` (string)
- `image` (string URL)

## Section Positioning

**Placement:** After Seasonal Benefits, Before Rates

**Positioning Logic (in recommendationMapping.ts):**
1. Find last seasonal benefits section (SEASONAL_STATS, SEASONAL_ALT, SEASONAL_ICONS)
2. Insert OVERNIGHT_HIGHLIGHT immediately after
3. Fallback: If no seasonal sections, place before RATES
4. Final fallback: If no RATES, place after AMEN_GRID

**Example Section Order:**
```
1. Navigation
2. Hero
3. Seasonal Benefits (SEASONAL_STATS)
4. Overnight Experience Highlight ← NEW
5. Amenities Grid
6. Rates
7. Reviews
8. Gallery
9. CTA Banner
10. Contact
```

## Integration Points

### 1. Component File
`/src/app/components/sections/OvernightExperienceHighlight.tsx`
- Implements conditional rendering logic
- Returns `null` if conditions not met
- Uses `useWizard()` to access `wizardData`

### 2. Sections Registry
`/src/app/data/sections.ts`
```typescript
{
  id: 'overnight-experience-highlight',
  name: 'Overnight Experience Highlight',
  description: 'Two-column layout highlighting overnight camping option when both seasonal and overnight are offered. Only renders for dual-model configurations.',
  tags: {
    businessModel: ['seasonal', 'overnight'],
    goal: ['bookings'],
  },
  component: 'OvernightExperienceHighlight',
}
```

### 3. Section ID Mapping
`/src/app/data/sectionIdMapping.ts`
```typescript
'overnight-experience-highlight': 'OVERNIGHT_HIGHLIGHT',
```

### 4. Component Map (Preview Modal)
`/src/app/components/modals/SectionPreviewModal.tsx`
```typescript
import { OvernightExperienceHighlight } from '../sections/OvernightExperienceHighlight';

const componentMap: Record<string, React.ComponentType<any>> = {
  // ...
  OvernightExperienceHighlight,
  // ...
};
```

### 5. Recommendation Engine
`/src/app/data/recommendationMapping.ts`

**Multi-Model Rule (line 442-445):**
```typescript
if (allowedModels.has('seasonal') && allowedModels.has('overnight') && primaryBusinessModel === 'seasonal') {
  requireSection(result, 'OVERNIGHT_HIGHLIGHT', 'Highlights overnight camping option for seasonal-focused parks');
}
```

**Positioning Logic (line 505-528):**
```typescript
const overnightHighlightIndex = sections.indexOf('OVERNIGHT_HIGHLIGHT');
if (overnightHighlightIndex !== -1) {
  sections.splice(overnightHighlightIndex, 1); // Remove from current position
  
  // Find position after last seasonal section
  const seasonalSections = sections.filter(id => id.startsWith('SEASONAL_'));
  if (seasonalSections.length > 0) {
    const lastSeasonalIndex = sections.lastIndexOf(seasonalSections[seasonalSections.length - 1]);
    sections.splice(lastSeasonalIndex + 1, 0, 'OVERNIGHT_HIGHLIGHT');
  } else {
    // Fallback positioning logic
  }
}
```

## Design Rationale

### Why Only for Seasonal Primary + Overnight Secondary?
- **Context:** Parks that are primarily seasonal-focused may want to mention overnight options without overwhelming the seasonal message
- **User Journey:** Visitors interested in seasonal may want to "test drive" with an overnight stay first
- **Marketing:** Positions overnight as a stepping stone to seasonal commitment, not a competing option

### Why Not for Overnight Primary?
- If overnight is primary, the park is already focused on short-term stays
- Adding this section would be redundant (overnight already featured in Hero, StayTypeCards, etc.)
- Copy is written from seasonal-first perspective ("Not ready for a full seasonal commitment?")

## Visual Design

### Image
- Default: Campfire/tent scene from Unsplash
- Suggests casual, flexible camping experience
- Contrasts with premium seasonal lifestyle imagery

### Content Hierarchy
1. **Headline** (3xl/4xl) - Clear value prop
2. **Description** (lg) - Explains context and benefits
3. **Bullet List** - Scannable key features with checkmarks
4. **CTA Button** - Clear action (branded accent color)

### Responsive Behavior
- **Desktop:** Two-column side-by-side (image left, content right)
- **Mobile:** Single column, content first, image second

## Trade Show Demo Scenarios

### ✅ Scenario 1: Seasonal + Overnight
**Configuration:**
- Primary: Seasonal
- Secondary: [Overnight]
- Goal: Bookings

**Expected Result:**
- Section appears after seasonal benefits
- Headline: "Weekend Camping Made Easy"
- CTA: "Book Overnight Stay"

### ❌ Scenario 2: Seasonal-Only
**Configuration:**
- Primary: Seasonal
- Secondary: []

**Expected Result:**
- Section does NOT appear
- No overnight references anywhere

### ❌ Scenario 3: Overnight-Only
**Configuration:**
- Primary: Overnight
- Secondary: []

**Expected Result:**
- Section does NOT appear
- Overnight already featured prominently

### ❌ Scenario 4: Overnight Primary + Seasonal Secondary
**Configuration:**
- Primary: Overnight
- Secondary: [Seasonal]

**Expected Result:**
- Section does NOT appear (logic only fires when seasonal is primary)
- StayTypeCards would handle dual-model messaging instead

## Testing Checklist

- [ ] Section renders when seasonal primary + overnight secondary
- [ ] Section does NOT render for seasonal-only
- [ ] Section does NOT render for overnight-only
- [ ] Section positioned after seasonal benefits, before rates
- [ ] Image loads correctly
- [ ] CTA button uses branded accent color
- [ ] Responsive layout works on mobile
- [ ] Content is clear and compelling
- [ ] Section visible in preview modal
- [ ] Section appears in section library filtered by tags

## Summary

**Type:** Supporting add-on module  
**Target:** Seasonal-primary parks with overnight option  
**Position:** After Seasonal Benefits, Before Rates  
**Rendering:** Conditional (seasonal + overnight only)  
**Purpose:** Introduce overnight option as trial/supplement to seasonal  

**Status:** ✅ COMPLETE AND INTEGRATED
