import { BusinessModel, Goal, WizardData } from '../context/WizardContext';

/**
 * CTA TEXT MAPPER - Maps business models + goals to appropriate CTA text
 * 
 * NEW RULES (Updated Policy):
 * - Primary CTA is ALWAYS "Book Now" (regardless of model or goal)
 * - Secondary CTA:
 *   - If Trailer Sales selected: "View Trailers"
 *   - Otherwise: "Request Info" or omit
 * - Banner headlines/subtext adjusted for seasonal context when needed
 */

interface CTATexts {
  primary: string;
  secondary: string;
  banner: string;
  bannerHeadline: string;
  bannerSubtext: string;
  contextMicrocopy?: string; // Added for seasonal clarification
}

/**
 * Compute allowed business models from wizard data
 */
function getAllowedModels(wizardData: WizardData): Set<string> {
  const allowed = new Set<string>();
  
  if (wizardData.primaryBusinessModel) {
    allowed.add(wizardData.primaryBusinessModel);
  }
  
  wizardData.secondaryBusinessModels.forEach(model => {
    allowed.add(model);
  });
  
  return allowed;
}

/**
 * Get CTA texts based on allowed models and primary goal
 */
export function getCTATexts(wizardData: WizardData): CTATexts {
  const allowedModels = getAllowedModels(wizardData);
  const primaryModel = wizardData.primaryBusinessModel;
  const primaryGoal = wizardData.primaryGoal;
  
  // Determine secondary CTA based on trailer sales
  const hasTrailerSales = allowedModels.has('trailer-sales');
  const secondaryCTA = hasTrailerSales ? 'View Trailers' : 'Request Info';
  
  // SEASONAL-ONLY LOGIC
  if (allowedModels.size === 1 && allowedModels.has('seasonal')) {
    return {
      primary: 'Book Now',
      secondary: secondaryCTA,
      banner: 'Book Now',
      bannerHeadline: 'Ready to Make This Your Seasonal Home?',
      bannerSubtext: 'Book your seasonal site for the upcoming season. Limited availability.',
      contextMicrocopy: 'Seasonal sites • May–Oct • Limited availability',
    };
  }
  
  // OVERNIGHT (WITH OR WITHOUT OTHER MODELS)
  if (allowedModels.has('overnight')) {
    return {
      primary: 'Book Now',
      secondary: secondaryCTA,
      banner: 'Book Now',
      bannerHeadline: 'Ready for Your Next Adventure?',
      bannerSubtext: 'Book your campsite today and start planning your perfect getaway.',
    };
  }
  
  // COTTAGE RENTALS (WITH OR WITHOUT OTHER MODELS)
  if (allowedModels.has('cottage-rentals') && !allowedModels.has('overnight')) {
    return {
      primary: 'Book Now',
      secondary: secondaryCTA,
      banner: 'Book Now',
      bannerHeadline: 'Your Perfect Cottage Awaits',
      bannerSubtext: 'Book your cottage rental today for an unforgettable escape.',
    };
  }
  
  // TRAILER SALES PRIMARY
  if (primaryModel === 'trailer-sales' || primaryGoal === 'trailer-leads') {
    return {
      primary: 'Book Now',
      secondary: 'View Trailers',
      banner: 'Book Now',
      bannerHeadline: 'Find Your Dream RV',
      bannerSubtext: 'Explore our selection of quality trailers and RVs for sale.',
    };
  }
  
  // DEFAULT FALLBACK
  return {
    primary: 'Book Now',
    secondary: 'Request Info',
    banner: 'Book Now',
    bannerHeadline: 'Ready to Get Started?',
    bannerSubtext: 'Contact us today to learn more about what we have to offer.',
  };
}

/**
 * Get primary CTA text only (for simple button usage)
 */
export function getPrimaryCTA(wizardData: WizardData): string {
  return getCTATexts(wizardData).primary;
}

/**
 * Get secondary CTA text only
 */
export function getSecondaryCTA(wizardData: WizardData): string {
  return getCTATexts(wizardData).secondary;
}