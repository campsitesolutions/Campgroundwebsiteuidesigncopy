import { BusinessModel, Goal } from '../context/WizardContext';

/**
 * Predefined recommendation stacks based on business model and goal combinations.
 * These are ordered lists of section IDs that will be recommended and preselected.
 */
export const recommendationMapping: Record<string, string[]> = {
  // SEASONAL + BOOKINGS
  'seasonal-bookings': [
    'nav-with-cta',
    'hero-centered-stats',
    'seasonal-benefits-stats',
    'amenities-grid',
    'rates-teaser-strip',
    'reviews',
    'gallery-masonry',
    'cta-banner',
    'contact-section',
  ],

  // SEASONAL + INQUIRIES
  'seasonal-inquiries': [
    'nav-centered',
    'hero-cinematic-overlay',
    'seasonal-benefits-alternating',
    'amenities-grid',
    'reviews',
    'gallery-masonry',
    'faq',
    'cta-solid-band',
    'contact-section',
  ],

  // SEASONAL + TRAILER_LEADS
  'seasonal-trailer-leads': [
    'nav-with-cta',
    'hero-split-layout',
    'seasonal-benefits-icon-cards',
    'trailers-featured-grid',
    'reviews',
    'faq',
    'cta-image-background',
    'contact-section',
  ],

  // OVERNIGHT + BOOKINGS
  'overnight-bookings': [
    'nav-with-cta',
    'hero-split-layout',
    'stay-type-cards-structured',
    'amenities-grid',
    'rates-teaser-strip',
    'local-attractions',
    'reviews',
    'cta-banner',
    'contact-section',
  ],

  // OVERNIGHT + INQUIRIES
  'overnight-inquiries': [
    'nav-with-topbar',
    'hero',
    'stay-type-cards-image-overlay',
    'amenities-grid',
    'reviews',
    'faq',
    'gallery-uniform-grid',
    'cta-solid-band',
    'contact-section',
  ],

  // OVERNIGHT + TRAILER_LEADS
  'overnight-trailer-leads': [
    'nav-with-cta',
    'hero-centered-stats',
    'stay-type-cards-spotlight',
    'trailers-clean-grid',
    'reviews',
    'faq',
    'cta-image-background',
    'contact-section',
  ],

  // TRAILERS + BOOKINGS
  'trailers-bookings': [
    'nav-with-cta',
    'hero-split-layout',
    'trailers-featured-grid',
    'amenities-grid',
    'rates-teaser-strip',
    'reviews',
    'cta-banner',
    'contact-section',
  ],

  // TRAILERS + INQUIRIES
  'trailers-inquiries': [
    'nav-with-topbar',
    'hero-cinematic-overlay',
    'trailers-clean-grid',
    'seasonal-benefits',
    'reviews',
    'faq',
    'cta-solid-band',
    'contact-section',
  ],

  // TRAILERS + TRAILER_LEADS
  'trailers-trailer-leads': [
    'nav-with-cta',
    'hero-split-layout',
    'trailers-featured-grid',
    'trailers-horizontal-scroll',
    'reviews',
    'faq',
    'cta-image-background',
    'contact-section',
  ],

  // COTTAGES + BOOKINGS
  'cottages-bookings': [
    'nav-with-cta',
    'hero-cinematic-overlay',
    'stay-type-cards-image-overlay',
    'amenities-grid',
    'rates-teaser-strip',
    'local-attractions',
    'gallery-masonry',
    'reviews',
    'cta-banner',
    'contact-section',
  ],

  // COTTAGES + INQUIRIES
  'cottages-inquiries': [
    'nav-centered',
    'hero-centered-stats',
    'stay-type-cards-structured',
    'amenities-grid',
    'reviews',
    'faq',
    'gallery-uniform-grid',
    'cta-solid-band',
    'contact-section',
  ],

  // COTTAGES + TRAILER_LEADS
  'cottages-trailer-leads': [
    'nav-with-cta',
    'hero-split-layout',
    'stay-type-cards-spotlight',
    'trailers-featured-grid',
    'reviews',
    'faq',
    'cta-image-background',
    'contact-section',
  ],
};

/**
 * Get the recommended stack of section IDs based on business model and goal.
 * Returns an ordered array of section IDs.
 */
export function getRecommendedStack(
  businessModel: BusinessModel | '',
  goal: Goal | ''
): string[] {
  if (!businessModel || !goal) {
    return [];
  }

  // Convert business model to match mapping keys
  const modelKey = businessModel === 'trailer-sales' ? 'trailers' : 
                   businessModel === 'cottage-rentals' ? 'cottages' : 
                   businessModel;

  // Convert goal to match mapping keys
  const goalKey = goal === 'trailer-leads' ? 'trailer-leads' : goal;

  const key = `${modelKey}-${goalKey}`;
  const baseRecommendations = recommendationMapping[key] || [];

  // Apply secondary filtering rules to add additional recommendations
  const secondaryRecommendations = getSecondaryRecommendations(businessModel, goal);

  // Combine base and secondary, removing duplicates while preserving order
  const combined = [...baseRecommendations];
  secondaryRecommendations.forEach(id => {
    if (!combined.includes(id)) {
      combined.push(id);
    }
  });

  return combined;
}

/**
 * Get secondary recommendations based on business model and goal.
 * These are always recommended regardless of the base stack.
 */
function getSecondaryRecommendations(
  businessModel: BusinessModel | '',
  goal: Goal | ''
): string[] {
  const recommendations: string[] = [];

  // Always Recommended (for all business models and goals)
  recommendations.push('amenities-grid', 'reviews');

  // Goal-based recommendations
  if (goal === 'bookings') {
    recommendations.push('rates-teaser-strip', 'cta-banner');
  } else if (goal === 'inquiries') {
    recommendations.push('faq', 'cta-solid-band');
  } else if (goal === 'trailer-leads') {
    // Add all trailer sections
    recommendations.push(
      'trailers-featured-grid',
      'trailers-clean-grid',
      'trailers-horizontal-scroll',
      'cta-image-background'
    );
  }

  // Business model-based recommendations
  if (businessModel === 'seasonal') {
    // All Seasonal Benefits sections should be recommended
    recommendations.push(
      'seasonal-benefits',
      'seasonal-benefits-icon-cards',
      'seasonal-benefits-alternating',
      'seasonal-benefits-stats'
    );
  }

  if (businessModel === 'overnight' || businessModel === 'cottage-rentals') {
    recommendations.push('local-attractions');
  }

  return recommendations;
}

/**
 * Determine if a section should be hidden by default based on business model.
 * Hidden sections are still available when "Show all" is toggled.
 */
export function shouldHideByDefault(
  sectionId: string,
  businessModel: BusinessModel | ''
): boolean {
  if (!businessModel) {
    return false;
  }

  // Convert business model
  const modelKey = businessModel === 'trailer-sales' ? 'trailers' : 
                   businessModel === 'cottage-rentals' ? 'cottages' : 
                   businessModel;

  // Hide Trailers sections if not in trailers business model
  if (sectionId.startsWith('trailers-') && modelKey !== 'trailers') {
    return true;
  }

  // Hide Seasonal Benefits sections if not in seasonal business model
  if (sectionId.startsWith('seasonal-benefits') && modelKey !== 'seasonal') {
    return true;
  }

  // Hide Local Attractions if not in overnight or cottages business model
  if (sectionId === 'local-attractions' && modelKey !== 'overnight' && modelKey !== 'cottages') {
    return true;
  }

  return false;
}