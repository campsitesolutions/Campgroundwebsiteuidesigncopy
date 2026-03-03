# 🎯 Dual-Model Messaging Quick Reference

## Seasonal + Overnight Configuration

### ✅ Expected Copy (All Correct Now)

**Hero Headline:**
```
Seasonal Sites & Overnight Camping
```

**Hero Subtext:**
```
Seasonal sites for your home away from home, and overnight camping for weekend adventures.
```

**CTA Banner Headline:**
```
Make It Your Seasonal Home — or Plan a Weekend Escape
```

**CTA Banner Subtext:**
```
Book a seasonal site for the full season or reserve an overnight stay for your next getaway.
```

**Primary CTA:**
```
Book Now
```
(Universal across all models)

---

## Quick Visual Check (30 seconds)

### ✅ Hero Section
1. Look at main headline → Should say "Seasonal Sites & Overnight Camping"
2. Look at subheadline → Should mention BOTH "seasonal sites" AND "overnight camping"

### ✅ CTA Banner
1. Look at banner headline → Should mention BOTH "Seasonal Home" AND "Weekend Escape"
2. Look at banner subtext → Should mention BOTH "seasonal site" AND "overnight stay"

### ✅ Footer
1. Services section → Should list BOTH "Seasonal Sites" AND "Overnight Camping"

---

## Red Flags (Should NOT Appear)

### ❌ Generic Fallbacks
- "Welcome to Your Outdoor Destination" (old generic headline)
- "Your outdoor destination." (old generic tagline)

### ❌ Overnight-Heavy Bias
- "Ready for Your Next Adventure?" WITHOUT seasonal mention
- "Book your campsite today" WITHOUT seasonal site mention
- Pure vacation/getaway language without seasonal reference

### ❌ Seasonal-Heavy Bias
- "Ready to Make This Your Seasonal Home?" WITHOUT overnight mention
- Seasonal-only language when overnight also selected

---

## Browser Console Test (10 seconds)

```javascript
// Press F12 → Console → Paste this:
const b = document.body.innerText.toLowerCase();
console.log('Seasonal & Overnight:', b.includes('seasonal sites & overnight camping'));
console.log('Dual Banner:', b.includes('seasonal home — or plan a weekend escape'));
// Both should return: true
```

---

## All Model Configurations (Quick Matrix)

| Configuration | Hero Headline | CTA Banner Headline |
|---------------|---------------|---------------------|
| Seasonal-only | Your Seasonal Home Awaits | Ready to Make This Your Seasonal Home? |
| Overnight-only | Escape to Nature | Ready for Your Next Adventure? |
| **Seasonal + Overnight** | **Seasonal Sites & Overnight Camping** | **Make It Your Seasonal Home — or Plan a Weekend Escape** |
| Cottages-only | Cottage Getaways That Feel Like Home | Your Perfect Cottage Awaits |
| Trailers-only | Find Your Dream RV | Find Your Dream RV |

---

## If Something Looks Wrong

1. **Clear browser cache** (Ctrl+Shift+Delete)
2. **Hard refresh** (Ctrl+F5)
3. **Regenerate page** from wizard
4. Check wizard data: `localStorage.getItem('campgroundShowroom_wizard')`

---

**Status:** ✅ PRODUCTION READY  
**Last Updated:** March 3, 2026
