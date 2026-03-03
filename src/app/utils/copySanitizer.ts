import { WizardData } from '../context/WizardContext';

/**
 * COPY SANITIZER - Removes references to unselected business models
 * 
 * UPDATED POLICY:
 * - "Book Now" is universal (not forbidden)
 * - Focus on preventing NIGHTLY/OVERNIGHT leakage when Overnight not selected
 * 
 * FORBIDDEN TERMS WHEN NOT SELECTED:
 * - Overnight: overnight, nightly, $/night, per night, weekend, tonight
 * - Rentals: cottages, cabins, rentals
 * - Trailer sales: trailer sales, inventory, for sale
 */

interface ForbiddenTerms {
  overnight: string[];
  cottages: string[];
  trailers: string[];
}

const FORBIDDEN_TERMS: ForbiddenTerms = {
  overnight: [
    'overnight',
    'nightly',
    'per night',
    '$/night',
    'weekend getaway',
    'weekend',
    'short-term',
    'short trip',
    'tonight',
    'availability tonight',
  ],
  cottages: [
    'cottage',
    'cottages',
    'cabin',
    'cabins',
    'cottage rental',
    'rental unit',
  ],
  trailers: [
    'trailer sales',
    'RV sales',
    'for sale',
    'inventory',
    'purchase a',
    'buy a trailer',
    'buy an RV',
  ],
};

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
 * Sanitize copy to remove references to unselected business models
 */
export function sanitizeCopy(text: string, wizardData: WizardData): string {
  if (!text) return text;
  
  const allowedModels = getAllowedModels(wizardData);
  let sanitized = text;
  
  // Remove overnight terms if not selected
  if (!allowedModels.has('overnight')) {
    FORBIDDEN_TERMS.overnight.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      sanitized = sanitized.replace(regex, '');
    });
  }
  
  // Remove cottage terms if not selected
  if (!allowedModels.has('cottage-rentals')) {
    FORBIDDEN_TERMS.cottages.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      sanitized = sanitized.replace(regex, '');
    });
  }
  
  // Remove trailer sales terms if not selected
  if (!allowedModels.has('trailer-sales')) {
    FORBIDDEN_TERMS.trailers.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      sanitized = sanitized.replace(regex, '');
    });
  }
  
  // Clean up artifacts from removal
  sanitized = sanitized
    // Remove extra commas/conjunctions
    .replace(/,\s*,/g, ',')
    .replace(/,\s*and\s*,/g, ' and ')
    .replace(/\s+and\s+and\s+/g, ' and ')
    .replace(/,\s*and\s*$/g, '')
    .replace(/and\s*,/g, 'and')
    // Remove leading/trailing commas and conjunctions
    .replace(/^[,\s]+/, '')
    .replace(/[,\s]+$/, '')
    .replace(/^and\s+/i, '')
    .replace(/\s+and\s*$/i, '')
    // Remove extra spaces
    .replace(/\s+/g, ' ')
    .trim();
  
  return sanitized;
}

/**
 * Get model-specific default tagline
 */
export function getDefaultTagline(wizardData: WizardData): string {
  const allowedModels = getAllowedModels(wizardData);
  const primaryModel = wizardData.primaryBusinessModel;
  
  // Seasonal-only
  if (allowedModels.size === 1 && allowedModels.has('seasonal')) {
    return 'Ontario seasonal camping with a quiet, community feel.';
  }
  
  // Overnight-only
  if (allowedModels.size === 1 && allowedModels.has('overnight')) {
    return 'Your perfect camping getaway starts here.';
  }
  
  // Cottage-only
  if (allowedModels.size === 1 && allowedModels.has('cottage-rentals')) {
    return 'Cottage living at its finest.';
  }
  
  // Trailer sales-only
  if (allowedModels.size === 1 && allowedModels.has('trailer-sales')) {
    return 'Find your dream RV with quality inventory and expert service.';
  }
  
  // Seasonal + Overnight (dual-model)
  if (allowedModels.has('seasonal') && allowedModels.has('overnight')) {
    return 'Seasonal sites for your home away from home, and overnight camping for weekend adventures.';
  }
  
  // Multiple models - build custom tagline
  const models: string[] = [];
  if (allowedModels.has('seasonal')) models.push('seasonal sites');
  if (allowedModels.has('overnight')) models.push('camping');
  if (allowedModels.has('cottage-rentals')) models.push('cottage rentals');
  if (allowedModels.has('trailer-sales')) models.push('RV sales');
  
  if (models.length === 2) {
    return `${models[0]} and ${models[1]}.`;
  } else if (models.length > 2) {
    const last = models.pop();
    return `${models.join(', ')}, and ${last}.`;
  }
  
  return 'Your outdoor destination.';
}

/**
 * Get model-specific headline
 */
export function getDefaultHeadline(wizardData: WizardData): string {
  const allowedModels = getAllowedModels(wizardData);
  
  // Seasonal-only
  if (allowedModels.size === 1 && allowedModels.has('seasonal')) {
    return 'Your Seasonal Home Awaits';
  }
  
  // Overnight-only
  if (allowedModels.size === 1 && allowedModels.has('overnight')) {
    return 'Escape to Nature';
  }
  
  // Cottage-only
  if (allowedModels.size === 1 && allowedModels.has('cottage-rentals')) {
    return 'Cottage Getaways That Feel Like Home';
  }
  
  // Trailer sales-only
  if (allowedModels.size === 1 && allowedModels.has('trailer-sales')) {
    return 'Find Your Dream RV';
  }
  
  // Seasonal + Overnight (dual-model)
  if (allowedModels.has('seasonal') && allowedModels.has('overnight')) {
    return 'Seasonal Sites & Overnight Camping';
  }
  
  // Multiple models
  return 'Welcome to Your Outdoor Destination';
}