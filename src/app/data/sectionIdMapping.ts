/**
 * SECTION ID MAPPING
 * Maps current kebab-case section IDs to short deterministic IDs
 */
export const SECTION_ID_MAP: Record<string, string> = {
  // Navigation
  'nav-centered': 'NAV_CENTER',
  'nav-with-cta': 'NAV_CTA',
  'nav-with-topbar': 'NAV_TOPBAR',

  // Hero
  'hero': 'HERO_BANNER',
  'hero-cinematic-overlay': 'HERO_CINEMATIC',
  'hero-split-layout': 'HERO_SPLIT',
  'hero-centered-stats': 'HERO_STATS',
  'hero-weather': 'HERO_WEATHER',

  // Stay Types
  'stay-type-cards-structured': 'STAY_STRUCTURED',
  'stay-type-cards-image-overlay': 'STAY_IMAGE',
  'stay-type-cards-spotlight': 'STAY_SPOTLIGHT',

  // Core
  'amenities-grid': 'AMEN_GRID',
  'rates-teaser-strip': 'RATES',

  // Seasonal
  'seasonal-benefits-stats': 'SEASONAL_STATS',
  'seasonal-benefits-icon-cards': 'SEASONAL_ICONS',
  'seasonal-benefits-alternating': 'SEASONAL_ALT',
  'overnight-experience-highlight': 'OVERNIGHT_HIGHLIGHT',

  // Trailers
  'trailers': 'TRAILER_ORIGINAL',
  'trailers-clean-grid': 'TRAILER_GRID',
  'trailers-featured-grid': 'TRAILER_FEATURED',
  'trailers-horizontal-scroll': 'TRAILER_SCROLL',

  // Galleries
  'gallery': 'GALLERY_ORIGINAL',
  'gallery-masonry': 'GALLERY_MASONRY',
  'gallery-uniform-grid': 'GALLERY_UNIFORM',
  'gallery-horizontal-scroll': 'GALLERY_SCROLL',

  // Social Proof & Content
  'reviews': 'REVIEWS',
  'local-attractions': 'ATTRACTIONS',
  'faq': 'FAQ',

  // CTAs
  'cta-banner': 'CTA_GRADIENT',
  'cta-image-background': 'CTA_IMAGE',
  'cta-solid-band': 'CTA_SOLID',
  'cta-split-content': 'CTA_SPLIT',

  // Contact
  'contact-section': 'CONTACT',
};

// Reverse mapping (short ID → kebab-case ID)
export const REVERSE_SECTION_ID_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(SECTION_ID_MAP).map(([kebab, short]) => [short, kebab])
);