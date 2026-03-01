import { Goal } from '../context/WizardContext';

export interface CTATextConfig {
  primary: string;
  secondary: string;
  tertiary?: string;
}

/**
 * Get dynamic CTA text based on the primary goal
 */
export function getCtaTextForGoal(goal: Goal | ''): CTATextConfig {
  switch (goal) {
    case 'bookings':
      return {
        primary: 'Book Now',
        secondary: 'Check Availability',
        tertiary: 'View Rates',
      };
    case 'inquiries':
      return {
        primary: 'Request Info',
        secondary: 'Contact Us',
        tertiary: 'Get in Touch',
      };
    case 'trailer-leads':
      return {
        primary: 'View Inventory',
        secondary: 'Request Pricing',
        tertiary: 'Schedule a Tour',
      };
    default:
      return {
        primary: 'Book Now',
        secondary: 'Learn More',
        tertiary: 'Contact Us',
      };
  }
}

/**
 * Get specific CTA text for different section types
 */
export function getContextualCtaText(
  goal: Goal | '',
  context: 'hero' | 'cta' | 'nav' | 'footer' | 'card'
): string {
  const ctaConfig = getCtaTextForGoal(goal);

  // Return primary CTA for most contexts
  if (context === 'hero' || context === 'cta' || context === 'nav') {
    return ctaConfig.primary;
  }

  // For cards and secondary contexts, use secondary CTA
  if (context === 'card') {
    return ctaConfig.secondary;
  }

  // Footer uses tertiary or secondary
  if (context === 'footer') {
    return ctaConfig.tertiary || ctaConfig.secondary;
  }

  return ctaConfig.primary;
}
