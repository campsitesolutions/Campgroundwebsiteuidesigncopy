Implement a deterministic homepage recommendation engine using structured rule logic.

Do NOT use open-ended AI reasoning.
Do NOT rely on unpredictable text interpretation.
Use controlled IDs and explicit rule order.

-----------------------------------
INPUT VARIABLES
-----------------------------------

primary_business_model:
- seasonal
- overnight
- trailers
- cottages

secondary_business_model (optional)

primary_goal:
- bookings
- inquiries
- trailer_leads

secondary_goal (optional)

pain_points (multi-select, max 3):
- PP_CALLS
- PP_LOW_SEASONAL
- PP_LOW_TRAILER
- PP_LOW_BOOKINGS
- PP_OUTDATED
- PP_CONFUSION
- PP_TRUST
- PP_HARD_UPDATE
- PP_SEO

highlights (multi-select, max 4):
- HL_SCENIC
- HL_POOL
- HL_EVENTS
- HL_SPACIOUS
- HL_FAMILY
- HL_ADULT
- HL_PREMIUM
- HL_TRAILER_SALES
- HL_COTTAGES
- HL_AWARD

-----------------------------------
SECTION IDS
-----------------------------------

Navigation:
NAV_CENTER
NAV_CTA
NAV_TOPBAR

Hero:
HERO_BANNER
HERO_CINEMATIC
HERO_SPLIT
HERO_STATS
HERO_WEATHER

Core:
STAY_STRUCTURED
STAY_IMAGE
STAY_SPOTLIGHT
AMEN_GRID
RATES
SEASONAL_STATS
SEASONAL_ICONS
SEASONAL_ALT
TRAILER_ORIGINAL
TRAILER_GRID
TRAILER_FEATURED
TRAILER_SCROLL
GALLERY_ORIGINAL
GALLERY_MASONRY
GALLERY_UNIFORM
GALLERY_SCROLL
REVIEWS
ATTRACTIONS
FAQ
CTA_GRADIENT
CTA_IMAGE
CTA_SOLID
CTA_SPLIT
CONTACT

-----------------------------------
STEP 1 — LOAD BASE STACK
-----------------------------------

Load recommended_stack from predefined BASE_STACK mapping using:
primary_business_model + primary_goal

-----------------------------------
STEP 2 — APPLY GLOBAL GOAL RULES
-----------------------------------

If primary_goal = bookings:
- Require NAV_CTA
- Require RATES
- Prefer CTA_GRADIENT
- CTA text: "Book Now"

If primary_goal = inquiries:
- Prefer NAV_TOPBAR or NAV_CENTER
- Prefer CTA_SOLID
- CTA text: "Request Info"

If primary_goal = trailer_leads:
- Require one of TRAILER_FEATURED or TRAILER_GRID
- Require CTA_IMAGE
- CTA text: "Request Pricing" or "Schedule a Tour"

-----------------------------------
STEP 3 — APPLY PAIN POINT MODIFIERS
-----------------------------------

PP_CALLS:
- Require FAQ
- Move FAQ above GALLERY sections
- Prefer NAV_TOPBAR

PP_LOW_SEASONAL:
- Require one of SEASONAL_ALT, SEASONAL_ICONS, SEASONAL_STATS
- Ensure REVIEWS included

PP_LOW_TRAILER:
- Require one of TRAILER_FEATURED, TRAILER_GRID
- Move Trailer section directly below Hero

PP_LOW_BOOKINGS:
- Require NAV_CTA
- Require RATES
- Move RATES above REVIEWS

PP_OUTDATED:
- Prefer HERO_CINEMATIC
- Prefer GALLERY_MASONRY
- Avoid *_ORIGINAL variants

PP_CONFUSION:
- Require STAY_STRUCTURED
- Require FAQ
- Avoid HERO_CINEMATIC

PP_TRUST:
- Require REVIEWS
- Prefer HERO_STATS

PP_HARD_UPDATE:
- Limit total sections to 10
- Avoid GALLERY_MASONRY and TRAILER_SCROLL
- Prefer CTA_SOLID

PP_SEO:
- Require FAQ
- Require STAY_STRUCTURED

-----------------------------------
STEP 4 — APPLY HIGHLIGHT MODIFIERS
-----------------------------------

HL_SCENIC:
- Require one of GALLERY_MASONRY or GALLERY_SCROLL
- Prefer HERO_CINEMATIC

HL_POOL:
- Require AMEN_GRID

HL_EVENTS:
- Require GALLERY_MASONRY

HL_SPACIOUS:
- Require one of SEASONAL_ALT or SEASONAL_STATS

HL_FAMILY:
- Require AMEN_GRID
- Require ATTRACTIONS

HL_ADULT:
- Prefer HERO_STATS
- Prefer CTA_SOLID

HL_PREMIUM:
- Require HERO_CINEMATIC
- Require GALLERY_MASONRY
- Avoid *_ORIGINAL variants

HL_TRAILER_SALES:
- Require one of TRAILER_FEATURED or TRAILER_GRID

HL_COTTAGES:
- Require STAY_IMAGE

HL_AWARD:
- Require REVIEWS
- Prefer HERO_STATS

-----------------------------------
STEP 5 — CLEANUP RULES
-----------------------------------

After all modifications:

1. Remove duplicates.
2. Ensure only ONE Hero section exists.
3. Ensure CONTACT is last.
4. Ensure REVIEWS appears before final CTA.
5. Ensure FAQ appears before CONTACT.
6. Minimum sections = 8.
7. Maximum sections = 15.
8. If PP_HARD_UPDATE active → maximum sections = 10.
9. If conflict between PREFER and AVOID → AVOID wins.

-----------------------------------
STEP 6 — OUTPUT REQUIREMENTS
-----------------------------------

Display:

1. Recommended ordered stack
2. “Why this section was included” explanation under each section
3. Strategy Summary panel explaining:
   - How layout supports primary goal
   - How layout addresses selected pain points
   - How layout highlights selected differentiators

Do not reference internal logic.
Do not reference rule IDs.
Present output as expert-guided strategy.