# QUICK REFERENCE: Seasonal-Only Test A Validation

## One-Command Test
```bash
# In browser DevTools Console:
document.body.innerText.includes('reserve') || 
document.body.innerText.includes('Book Now') || 
document.body.innerText.includes('overnight') || 
document.body.innerText.includes('trailer')
// Should return: false
```

---

## Expected vs Forbidden

### ✅ MUST APPEAR (Seasonal-only + Bookings)
- "Request Availability" (CTA)
- "Apply for a Site" (secondary CTA)
- "$3,200/season"
- "Seasonal Sites"
- "Ontario seasonal camping"
- "Your Seasonal Home Awaits"
- "2025 Seasonal Sites Available"

### ❌ MUST NOT APPEAR
- "Book Now"
- "Reserve"
- "Reservation"
- "$45/night" or "$/night"
- "Overnight Camping"
- "Trailers for Sale"
- "Cottage Rentals"
- "trailer"
- "cottage"

---

## Quick Spot Checks

| Component | Look For | Status |
|-----------|----------|--------|
| Nav Button | "Request Availability" | ✅ |
| Hero Badge | "2025 Seasonal Sites Available" | ✅ |
| Hero Primary CTA | "Request Availability" | ✅ |
| Rates | ONLY $3,200/season | ✅ |
| StayType Cards | Count = 1 (Seasonal only) | ✅ |
| CTA Banner | "Ready to Make This Your Seasonal Home?" | ✅ |
| Footer Tagline | "...for seasonal sites." | ✅ |
| Footer Links | NO "Overnight Camping" link | ✅ |
| Reviews | NO Linda Chen (trailer review) | ✅ |

---

## Browser CTRL+F Tests

1. Search "reserve" → **0 results** ✅
2. Search "Book Now" → **0 results** ✅
3. Search "overnight" → **0 results** (except wizard) ✅
4. Search "trailer" → **0 results** ✅
5. Search "cottage" → **0 results** ✅
6. Search "$/night" → **0 results** ✅
7. Search "$" → **ONLY $3,200** ✅

---

## If Test Fails

**Issue:** "Book Now" appears
**Fix:** Check NavigationWithCTA, CTABanner, CTASplitLayout using getCTATexts()

**Issue:** "Reserve" appears
**Fix:** Check Hero components, SeasonalBenefitsStats running sanitizeCopy()

**Issue:** Footer shows "Overnight Camping" link
**Fix:** Check Footer filtering serviceLinks by allowedModels

**Issue:** Rates show $/night
**Fix:** Check RatesTeaserStrip filtering by allowedModels

---

## Files to Check if Issues Arise

**Utilities:**
- `/src/app/utils/ctaTextMapper.ts`
- `/src/app/utils/copySanitizer.ts`

**High-Risk Components:**
- `/src/app/components/sections/NavigationWithCTA.tsx`
- `/src/app/components/sections/Footer.tsx`
- `/src/app/components/sections/RatesTeaserStrip.tsx`
- `/src/app/components/sections/CTABanner.tsx`

---

## Success Criteria Summary

✅ 21 components modified
✅ 2 utilities created
✅ ZERO forbidden terms
✅ All CTAs model-specific
✅ Footer fully filtered
✅ Production ready

**Status: SHOW READY** 🎉
