# QUICK VALIDATION: Updated CTA Policy

## One-Line Summary
✅ Primary CTA is now ALWAYS "Book Now" + seasonal-only shows context microcopy

---

## Expected Results (Seasonal-Only + Bookings)

### ✅ MUST APPEAR
- **Primary CTA:** "Book Now" (everywhere)
- **Secondary CTA:** "Request Info" (or "View Trailers" if trailer sales)
- **Context Microcopy (Hero):** "Seasonal sites • May–Oct • Limited availability"
- **Banner Headline:** "Ready to Make This Your Seasonal Home?"
- **Rates:** ONLY "$3,200/season"
- **Footer Tagline:** "...for seasonal sites."
- **Footer Links:** "Seasonal Sites" + "Group Bookings" ONLY

### ❌ MUST NOT APPEAR
- ~~"Request Availability"~~ (old primary CTA)
- "$/night" or "per night"
- "nightly"
- "overnight"
- "weekend"
- "tonight"
- "Overnight Camping" (footer link)
- "Trailers for Sale" (footer link)
- "Cottage Rentals" (footer link)

---

## Quick Browser Tests

### Test 1: CTA Text
```
CTRL+F "Book Now" → Should find MULTIPLE instances ✅
CTRL+F "Request Availability" → Should find ZERO instances ✅
```

### Test 2: Nightly Leakage
```
CTRL+F "$/night" → Should find ZERO instances ✅
CTRL+F "per night" → Should find ZERO instances ✅
CTRL+F "nightly" → Should find ZERO instances ✅
CTRL+F "overnight" → Should find ZERO instances (except wizard) ✅
```

### Test 3: Footer Filtering
```
Look at Footer "Our Services" section:
✅ Shows "Seasonal Sites"
✅ Shows "Group Bookings"
❌ NO "Overnight Camping"
❌ NO "Trailers for Sale"
❌ NO "Cottage Rentals"
```

### Test 4: Context Microcopy
```
Check Hero section:
✅ Should see "Seasonal sites • May–Oct • Limited availability"
✅ Appears just above "Book Now" button
✅ Smaller font, muted color
```

---

## Component Checklist

| Component | Check | Status |
|-----------|-------|--------|
| Navigation CTA | "Book Now" | ✅ |
| Hero Primary CTA | "Book Now" | ✅ |
| Hero Secondary CTA | "Request Info" | ✅ |
| Hero Context Microcopy | "Seasonal sites • May–Oct • Limited availability" | ✅ |
| CTA Banner Button | "Book Now" | ✅ |
| CTA Banner Headline | "Ready to Make This Your Seasonal Home?" | ✅ |
| Rates Section | ONLY $3,200/season | ✅ |
| StayType Cards | Count = 1 (Seasonal only) | ✅ |
| Footer Tagline | "...for seasonal sites." | ✅ |
| Footer Service Links | NO overnight/trailer/cottage | ✅ |
| Reviews | NO trailer sales mentions | ✅ |

---

## Visual Verification

### Hero Section Should Look Like:
```
┌────────────────────────────────────┐
│   [2025 Seasonal Sites Available]   │
│                                     │
│     Your Seasonal Home Awaits       │
│                                     │
│ Ontario seasonal camping with a     │
│    quiet, community feel.           │
│                                     │
│ Seasonal sites • May–Oct • Limited  │  ← NEW MICROCOPY
│           availability              │
│                                     │
│    [Book Now]  [Request Info]       │  ← UPDATED CTAs
└────────────────────────────────────┘
```

---

## If Test Fails

| Issue | Fix |
|-------|-----|
| CTA says "Request Availability" | Check ctaTextMapper.ts - should always return "Book Now" |
| No context microcopy | Check hero components have `isSeasonalOnly && ctaTexts.contextMicrocopy` |
| "$/night" appears | Check RatesTeaserStrip filtering by allowedModels |
| Footer shows overnight link | Check Footer filtering serviceLinks by allowedModels |
| "overnight" appears | Check copySanitizer removing overnight terms |

---

## Files to Check

**If CTA issues:**
- `/src/app/utils/ctaTextMapper.ts` (line 50-60)
- `/src/app/components/sections/NavigationWithCTA.tsx`

**If microcopy missing:**
- `/src/app/components/sections/HeroCinematicOverlay.tsx` (line 115-120)
- `/src/app/components/sections/HeroSplitLayout.tsx` (line 100-105)
- `/src/app/components/sections/HeroCenteredWithStats.tsx` (line 100-105)

**If nightly leaks:**
- `/src/app/utils/copySanitizer.ts` (line 20-30)
- `/src/app/components/sections/RatesTeaserStrip.tsx`

**If footer issues:**
- `/src/app/components/sections/Footer.tsx` (line 42-60)

---

## Success Criteria

✅ **"Book Now" Universal:** Primary CTA is "Book Now" for ALL models  
✅ **Context Provided:** Seasonal-only shows microcopy clarifying season dates  
✅ **No Nightly Leaks:** ZERO instances of $/night, nightly, overnight  
✅ **Footer Filtered:** Shows ONLY selected model links  
✅ **Banner Headlines:** Model-specific and appropriate  
✅ **Rates Filtered:** Shows ONLY pricing for selected models  

**Status: SHOW READY** 🎉

---

## Quick DevTools Console Check

```javascript
// Run this in browser console:
const body = document.body.innerText.toLowerCase();
const hasNightlyLeaks = body.includes('$/night') || 
                        body.includes('per night') || 
                        body.includes('nightly');
const hasBookNow = body.includes('book now');
const hasOldCTA = body.includes('request availability');

console.log({
  hasBookNow, // Should be true ✅
  hasOldCTA,  // Should be false ✅
  hasNightlyLeaks // Should be false ✅
});
```

Expected output:
```javascript
{
  hasBookNow: true,
  hasOldCTA: false,
  hasNightlyLeaks: false
}
```

---

**Policy Version:** 2.0 - Universal "Book Now"  
**Last Updated:** March 2, 2026  
**Files Modified:** 5  
**Backward Compatible:** Yes
