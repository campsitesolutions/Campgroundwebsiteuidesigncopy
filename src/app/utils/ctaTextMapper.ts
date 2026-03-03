import { BusinessModel, Goal, WizardData, getAllowedModels } from '../context/WizardContext';

/**
 * CTA TEXT MAPPER - Maps goals to appropriate CTA text
 * 
 * RULES:
 * - Primary Goal controls: primary CTA label + link
 * - Secondary Goal controls: secondary CTA button (if set)
 * - CTA MAPPING:
 *   - Bookings -> "Book Now" (link to booking target)
 *   - Inquiries -> "Send Inquiry" (link #contact)
 *   - Trailer Leads -> "View Trailers" (link #trailers)
 */

interface CTATexts {
  primary: string;
  primaryHref: string;
  secondary: string | null;
  secondaryHref: string | null;
  banner: string;
  bannerHeadline: string;
  bannerSubtext: string;
  contextMicrocopy?: string;
}

/**
 * Map goal to CTA text and link
 */
function getGoalCTA(goal: Goal): { text: string; href: string } {
  switch (goal) {
    case 'bookings':
      return { text: 'Book Now', href: '#booking' };
    case 'inquiries':
      return { text: 'Send Inquiry', href: '#contact' };
    case 'trailer-leads':
      return { text: 'View Trailers', href: '#trailers' };
  }
}

/**
 * Get CTA texts based on primary/secondary goals
 */
export function getCTATexts(wizardData: WizardData): CTATexts {
  const allowedModels = getAllowedModels(wizardData);
  const primaryGoal = wizardData.primaryGoal;
  const secondaryGoal = wizardData.secondaryGoal;
  
  // Primary CTA from Primary Goal (required)
  const primaryCTA = primaryGoal ? getGoalCTA(primaryGoal as Goal) : { text: 'Book Now', href: '#booking' };
  
  // Secondary CTA from Secondary Goal (optional)
  const secondaryCTA = secondaryGoal ? getGoalCTA(secondaryGoal as Goal) : null;
  
  // Banner headline/subtext based on models (keep existing logic)
  let bannerHeadline = 'Ready to Get Started?';
  let bannerSubtext = 'Contact us today to learn more about what we have to offer.';
  let contextMicrocopy: string | undefined;
  
  // SEASONAL-ONLY LOGIC
  if (allowedModels.size === 1 && allowedModels.has('seasonal')) {
    bannerHeadline = 'Ready to Make This Your Seasonal Home?';
    bannerSubtext = 'Book your seasonal site for the upcoming season. Limited availability.';
    contextMicrocopy = 'Seasonal sites • May–Oct • Limited availability';
  }
  // SEASONAL + OVERNIGHT
  else if (allowedModels.has('seasonal') && allowedModels.has('overnight')) {
    bannerHeadline = 'Make It Your Seasonal Home — or Plan a Weekend Escape';
    bannerSubtext = 'Book a seasonal site for the full season or reserve an overnight stay for your next getaway.';
  }
  // OVERNIGHT (WITHOUT SEASONAL)
  else if (allowedModels.has('overnight') && !allowedModels.has('seasonal')) {
    bannerHeadline = 'Ready for Your Next Adventure?';
    bannerSubtext = 'Book your campsite today and start planning your perfect getaway.';
  }
  // COTTAGE RENTALS (WITHOUT OVERNIGHT)
  else if (allowedModels.has('cottage-rentals') && !allowedModels.has('overnight')) {
    bannerHeadline = 'Your Perfect Cottage Awaits';
    bannerSubtext = 'Book your cottage rental today for an unforgettable escape.';
  }
  // TRAILER SALES
  else if (allowedModels.has('trailer-sales') && primaryGoal === 'trailer-leads') {
    bannerHeadline = 'Find Your Dream RV';
    bannerSubtext = 'Explore our selection of quality trailers and RVs for sale.';
  }
  
  return {
    primary: primaryCTA.text,
    primaryHref: primaryCTA.href,
    secondary: secondaryCTA ? secondaryCTA.text : null,
    secondaryHref: secondaryCTA ? secondaryCTA.href : null,
    banner: primaryCTA.text,
    bannerHeadline,
    bannerSubtext,
    contextMicrocopy,
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
export function getSecondaryCTA(wizardData: WizardData): string | null {
  return getCTATexts(wizardData).secondary;
}