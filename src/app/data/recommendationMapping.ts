import { BusinessModel, Goal, PainPoint, Highlight, WizardData } from '../context/WizardContext';
import { REVERSE_SECTION_ID_MAP } from './sectionIdMapping';
import { sections as allSections } from './sections';

/**
 * DETERMINISTIC HOMEPAGE RECOMMENDATION ENGINE
 * Uses structured rule logic with explicit ordering and conflict resolution.
 * 
 * HARD GATING RULES:
 * - Primary Business Model is a hard constraint
 * - Sections are filtered by allowedModels = {primaryModel} ∪ {secondaryModels}
 * - Copy is sanitized to remove references to unselected models
 */

type ShortSectionId = string; // e.g., 'NAV_CTA', 'HERO_CINEMATIC', etc.

interface RuleResult {
  sections: Set<ShortSectionId>;
  avoidSections: Set<ShortSectionId>;
  preferSections: Set<ShortSectionId>;
  sectionReasons: Map<ShortSectionId, string>;
  maxSections: number;
}

/**
 * Compute allowed business models based on user selections
 */
function getAllowedModels(wizardData: WizardData): Set<string> {
  const allowed = new Set<string>();
  
  if (wizardData.primaryBusinessModel) {
    const modelKey = wizardData.primaryBusinessModel === 'trailer-sales' ? 'trailers' : 
                     wizardData.primaryBusinessModel === 'cottage-rentals' ? 'cottages' : 
                     wizardData.primaryBusinessModel;
    allowed.add(modelKey);
  }
  
  wizardData.secondaryBusinessModels.forEach(model => {
    const modelKey = model === 'trailer-sales' ? 'trailers' : 
                     model === 'cottage-rentals' ? 'cottages' : 
                     model;
    allowed.add(modelKey);
  });
  
  return allowed;
}

/**
 * Check if a section is compatible with allowed models
 */
function isSectionAllowed(shortSectionId: string, allowedModels: Set<string>): boolean {
  // Convert short ID to kebab-case ID
  const kebabId = REVERSE_SECTION_ID_MAP[shortSectionId];
  if (!kebabId) return true; // If not mapped, allow it
  
  const section = allSections.find(s => s.id === kebabId);
  if (!section) return true; // If not found, allow it
  
  // If section has no model tags, it's allowed for all
  if (!section.tags.businessModel || section.tags.businessModel.length === 0) {
    return true;
  }
  
  // Check if section's required models overlap with allowed models
  return section.tags.businessModel.some(model => allowedModels.has(model));
}

/**
 * BASE STACKS - Predefined starting points for each business model + goal combination
 */
const BASE_STACKS: Record<string, ShortSectionId[]> = {
  // SEASONAL
  'seasonal-bookings': [
    'NAV_CTA',
    'HERO_STATS',
    'SEASONAL_STATS',
    'AMEN_GRID',
    'RATES',
    'REVIEWS',
    'GALLERY_MASONRY',
    'CTA_GRADIENT',
    'CONTACT',
  ],
  'seasonal-inquiries': [
    'NAV_CENTER',
    'HERO_CINEMATIC',
    'SEASONAL_ALT',
    'AMEN_GRID',
    'REVIEWS',
    'GALLERY_MASONRY',
    'FAQ',
    'CTA_SOLID',
    'CONTACT',
  ],
  'seasonal-trailer-leads': [
    'NAV_CTA',
    'HERO_SPLIT',
    'SEASONAL_ICONS',
    'TRAILER_FEATURED',
    'REVIEWS',
    'FAQ',
    'CTA_IMAGE',
    'CONTACT',
  ],

  // OVERNIGHT
  'overnight-bookings': [
    'NAV_CTA',
    'HERO_SPLIT',
    'STAY_STRUCTURED',
    'AMEN_GRID',
    'RATES',
    'ATTRACTIONS',
    'REVIEWS',
    'CTA_GRADIENT',
    'CONTACT',
  ],
  'overnight-inquiries': [
    'NAV_TOPBAR',
    'HERO_BANNER',
    'STAY_IMAGE',
    'AMEN_GRID',
    'REVIEWS',
    'FAQ',
    'GALLERY_UNIFORM',
    'CTA_SOLID',
    'CONTACT',
  ],
  'overnight-trailer-leads': [
    'NAV_CTA',
    'HERO_STATS',
    'STAY_SPOTLIGHT',
    'TRAILER_GRID',
    'REVIEWS',
    'FAQ',
    'CTA_IMAGE',
    'CONTACT',
  ],

  // TRAILERS
  'trailers-bookings': [
    'NAV_CTA',
    'HERO_SPLIT',
    'TRAILER_FEATURED',
    'AMEN_GRID',
    'RATES',
    'REVIEWS',
    'CTA_GRADIENT',
    'CONTACT',
  ],
  'trailers-inquiries': [
    'NAV_TOPBAR',
    'HERO_CINEMATIC',
    'TRAILER_GRID',
    'SEASONAL_STATS',
    'REVIEWS',
    'FAQ',
    'CTA_SOLID',
    'CONTACT',
  ],
  'trailers-trailer-leads': [
    'NAV_CTA',
    'HERO_SPLIT',
    'TRAILER_FEATURED',
    'TRAILER_SCROLL',
    'REVIEWS',
    'FAQ',
    'CTA_IMAGE',
    'CONTACT',
  ],

  // COTTAGES
  'cottages-bookings': [
    'NAV_CTA',
    'HERO_CINEMATIC',
    'STAY_IMAGE',
    'AMEN_GRID',
    'RATES',
    'ATTRACTIONS',
    'GALLERY_MASONRY',
    'REVIEWS',
    'CTA_GRADIENT',
    'CONTACT',
  ],
  'cottages-inquiries': [
    'NAV_CENTER',
    'HERO_STATS',
    'STAY_STRUCTURED',
    'AMEN_GRID',
    'REVIEWS',
    'FAQ',
    'GALLERY_UNIFORM',
    'CTA_SOLID',
    'CONTACT',
  ],
  'cottages-trailer-leads': [
    'NAV_CTA',
    'HERO_SPLIT',
    'STAY_SPOTLIGHT',
    'TRAILER_FEATURED',
    'REVIEWS',
    'FAQ',
    'CTA_IMAGE',
    'CONTACT',
  ],
};

/**
 * MAIN ENGINE - Generate recommendations with deterministic rules
 */
export function getRecommendedStack(
  primaryBusinessModel: BusinessModel | '',
  primaryGoal: Goal | '',
  wizardData?: WizardData
): string[] {
  if (!primaryBusinessModel || !primaryGoal) {
    return [];
  }

  // Initialize rule result
  const result: RuleResult = {
    sections: new Set(),
    avoidSections: new Set(),
    preferSections: new Set(),
    sectionReasons: new Map(),
    maxSections: 15,
  };

  // STEP 1: Load base stack
  const baseStackKey = getBaseStackKey(primaryBusinessModel, primaryGoal);
  const baseStack = BASE_STACKS[baseStackKey] || [];
  baseStack.forEach(id => {
    result.sections.add(id);
    result.sectionReasons.set(id, 'Core component for your business model and goal');
  });

  if (!wizardData) {
    return convertToKebabIds(Array.from(result.sections));
  }

  // Compute allowed models
  const allowedModels = getAllowedModels(wizardData);

  // Filter base stack to only include allowed sections
  result.sections = new Set(
    Array.from(result.sections).filter(id => isSectionAllowed(id, allowedModels))
  );

  // STEP 2: Apply global goal rules
  applyGlobalGoalRules(result, primaryGoal);

  // STEP 3: Apply pain point modifiers
  if (Array.isArray(wizardData.painPoints)) {
    wizardData.painPoints.forEach(painPoint => {
      applyPainPointRules(result, painPoint, primaryBusinessModel);
    });
  }

  // STEP 4: Apply highlight modifiers
  if (Array.isArray(wizardData.highlights)) {
    wizardData.highlights.forEach(highlight => {
      applyHighlightRules(result, highlight, primaryBusinessModel);
    });
  }

  // STEP 5: Cleanup and finalize
  const finalStack = cleanupAndFinalize(result);

  // Convert short IDs back to kebab-case IDs
  return convertToKebabIds(finalStack);
}

/**
 * Get base stack key from business model + goal
 */
function getBaseStackKey(businessModel: BusinessModel, goal: Goal): string {
  const modelKey = businessModel === 'trailer-sales' ? 'trailers' : 
                   businessModel === 'cottage-rentals' ? 'cottages' : 
                   businessModel;
  const goalKey = goal === 'trailer-leads' ? 'trailer-leads' : goal;
  return `${modelKey}-${goalKey}`;
}

/**
 * STEP 2: Apply global goal rules
 */
function applyGlobalGoalRules(result: RuleResult, primaryGoal: Goal) {
  if (primaryGoal === 'bookings') {
    requireSection(result, 'NAV_CTA', 'Prominent booking button in navigation');
    requireSection(result, 'RATES', 'Clear pricing information drives booking decisions');
    preferSection(result, 'CTA_GRADIENT', 'Eye-catching call-to-action for bookings');
  } else if (primaryGoal === 'inquiries') {
    preferSection(result, 'NAV_TOPBAR', 'Contact information prominently displayed');
    preferSection(result, 'NAV_CENTER', 'Professional navigation for information seekers');
    preferSection(result, 'CTA_SOLID', 'Clear inquiry call-to-action');
  } else if (primaryGoal === 'trailer-leads') {
    ensureOneOf(result, ['TRAILER_FEATURED', 'TRAILER_GRID'], 'Showcase trailer inventory prominently');
    requireSection(result, 'CTA_IMAGE', 'Compelling visual CTA for trailer inquiries');
  }
}

/**
 * STEP 3: Apply pain point modifier rules
 */
function applyPainPointRules(result: RuleResult, painPoint: PainPoint, primaryBusinessModel: BusinessModel) {
  switch (painPoint) {
    case 'PP_CALLS':
      requireSection(result, 'FAQ', 'Reduces repetitive phone inquiries with self-service answers');
      preferSection(result, 'NAV_TOPBAR', 'Easy access to contact information');
      // Move FAQ above galleries (handled in cleanup)
      break;

    case 'PP_LOW_SEASONAL':
      ensureOneOf(
        result,
        ['SEASONAL_ALT', 'SEASONAL_ICONS', 'SEASONAL_STATS'],
        'Highlights seasonal site benefits to drive conversions'
      );
      requireSection(result, 'REVIEWS', 'Social proof builds confidence for seasonal commitments');
      break;

    case 'PP_LOW_TRAILER':
      ensureOneOf(
        result,
        ['TRAILER_FEATURED', 'TRAILER_GRID'],
        'Showcases trailer inventory to generate more leads'
      );
      // Move trailer section directly below hero (handled in cleanup)
      break;

    case 'PP_LOW_BOOKINGS':
      requireSection(result, 'NAV_CTA', 'Prominent booking button increases conversions');
      requireSection(result, 'RATES', 'Transparent pricing removes booking friction');
      // Move RATES above REVIEWS (handled in cleanup)
      break;

    case 'PP_OUTDATED':
      preferSection(result, 'HERO_CINEMATIC', 'Modern, cinematic hero elevates brand perception');
      preferSection(result, 'GALLERY_MASONRY', 'Contemporary gallery layout showcases visual appeal');
      avoidOriginalVariants(result, 'Avoids dated design patterns');
      break;

    case 'PP_CONFUSION':
      requireSection(result, 'STAY_STRUCTURED', 'Clear, structured layout improves navigation');
      requireSection(result, 'FAQ', 'Proactively answers common visitor questions');
      avoidSection(result, 'HERO_CINEMATIC', 'Avoids overwhelming hero design');
      break;

    case 'PP_TRUST':
      requireSection(result, 'REVIEWS', 'Authentic testimonials build credibility and trust');
      preferSection(result, 'HERO_STATS', 'Data-driven hero section establishes authority');
      break;

    case 'PP_HARD_UPDATE':
      result.maxSections = 10; // Simplify layout
      avoidSection(result, 'GALLERY_MASONRY', 'Simpler gallery options for easier management');
      avoidSection(result, 'TRAILER_SCROLL', 'Reduces complex interactive components');
      preferSection(result, 'CTA_SOLID', 'Simple, easy-to-maintain CTA design');
      break;

    case 'PP_SEO':
      requireSection(result, 'FAQ', 'FAQ content improves search engine visibility');
      requireSection(result, 'STAY_STRUCTURED', 'Structured content enhances SEO');
      break;
  }
}

/**
 * STEP 4: Apply highlight modifier rules
 */
function applyHighlightRules(result: RuleResult, highlight: Highlight, primaryBusinessModel: BusinessModel) {
  switch (highlight) {
    case 'HL_SCENIC':
      ensureOneOf(
        result,
        ['GALLERY_MASONRY', 'GALLERY_SCROLL'],
        'Showcases scenic views and waterfront positioning'
      );
      preferSection(result, 'HERO_CINEMATIC', 'Dramatic hero highlights visual appeal');
      break;

    case 'HL_POOL':
      requireSection(result, 'AMEN_GRID', 'Features pool and water amenities prominently');
      break;

    case 'HL_EVENTS':
      requireSection(result, 'GALLERY_MASONRY', 'Gallery showcases seasonal events and activities');
      break;

    case 'HL_SPACIOUS':
      ensureOneOf(
        result,
        ['SEASONAL_ALT', 'SEASONAL_STATS'],
        'Highlights spacious site benefits'
      );
      break;

    case 'HL_FAMILY':
      requireSection(result, 'AMEN_GRID', 'Showcases family-friendly amenities');
      if (primaryBusinessModel === 'overnight' || primaryBusinessModel === 'cottage-rentals') {
        requireSection(result, 'ATTRACTIONS', 'Highlights nearby family activities');
      }
      break;

    case 'HL_ADULT':
      preferSection(result, 'HERO_STATS', 'Professional, mature presentation');
      preferSection(result, 'CTA_SOLID', 'Sophisticated, understated design');
      break;

    case 'HL_PREMIUM':
      requireSection(result, 'HERO_CINEMATIC', 'Premium hero establishes luxury positioning');
      requireSection(result, 'GALLERY_MASONRY', 'High-end gallery showcases premium features');
      avoidOriginalVariants(result, 'Premium design avoids basic layouts');
      break;

    case 'HL_TRAILER_SALES':
      ensureOneOf(
        result,
        ['TRAILER_FEATURED', 'TRAILER_GRID'],
        'Features trailer sales inventory'
      );
      break;

    case 'HL_COTTAGES':
      requireSection(result, 'STAY_IMAGE', 'Visual cottage showcase with image overlays');
      break;

    case 'HL_AWARD':
      requireSection(result, 'REVIEWS', 'Highlights awards and top ratings');
      preferSection(result, 'HERO_STATS', 'Stats-driven hero showcases achievements');
      break;
  }
}

/**
 * STEP 5: Cleanup and finalize
 */
function cleanupAndFinalize(result: RuleResult): ShortSectionId[] {
  let sections = Array.from(result.sections);

  // Apply AVOID rules (AVOID wins over PREFER)
  sections = sections.filter(id => !result.avoidSections.has(id));

  // Apply PREFER rules (replace existing sections)
  result.preferSections.forEach(preferredId => {
    const category = getSectionCategory(preferredId);
    if (category) {
      // Remove other sections in same category
      sections = sections.filter(id => getSectionCategory(id) !== category);
      sections.push(preferredId);
    }
  });

  // Remove duplicates
  sections = [...new Set(sections)];

  // Ensure only ONE hero section
  const heroSections = sections.filter(id => id.startsWith('HERO_'));
  if (heroSections.length > 1) {
    // Keep preferred hero if exists
    const preferredHero = heroSections.find(id => result.preferSections.has(id));
    const keepHero = preferredHero || heroSections[0];
    sections = sections.filter(id => !id.startsWith('HERO_') || id === keepHero);
  }

  // Ensure CONTACT is last
  sections = sections.filter(id => id !== 'CONTACT');
  sections.push('CONTACT');

  // Ensure REVIEWS appears before final CTA
  const reviewIndex = sections.indexOf('REVIEWS');
  const lastCTAIndex = findLastCTAIndex(sections);
  if (reviewIndex > lastCTAIndex && lastCTAIndex !== -1) {
    sections.splice(reviewIndex, 1);
    sections.splice(lastCTAIndex, 0, 'REVIEWS');
  }

  // Ensure FAQ appears before CONTACT
  const faqIndex = sections.indexOf('FAQ');
  if (faqIndex !== -1) {
    sections.splice(faqIndex, 1);
    const contactIndex = sections.indexOf('CONTACT');
    sections.splice(contactIndex, 0, 'FAQ');
  }

  // Enforce min/max sections
  const minSections = 8;
  const maxSections = result.maxSections;

  if (sections.length < minSections) {
    // Add filler sections if needed
    const fillers = ['AMEN_GRID', 'REVIEWS', 'GALLERY_UNIFORM', 'FAQ'];
    for (const filler of fillers) {
      if (sections.length >= minSections) break;
      if (!sections.includes(filler)) {
        sections.splice(sections.length - 1, 0, filler); // Add before CONTACT
      }
    }
  }

  if (sections.length > maxSections) {
    // Remove non-essential sections
    const essential = ['NAV_CTA', 'NAV_CENTER', 'NAV_TOPBAR', 'HERO_', 'REVIEWS', 'CONTACT', 'CTA_'];
    const removable = sections.filter(id => !essential.some(e => id.startsWith(e)));
    while (sections.length > maxSections && removable.length > 0) {
      const toRemove = removable.pop()!;
      sections = sections.filter(id => id !== toRemove);
    }
  }

  return sections;
}

/**
 * Helper: Require a section
 */
function requireSection(result: RuleResult, sectionId: ShortSectionId, reason: string) {
  result.sections.add(sectionId);
  result.sectionReasons.set(sectionId, reason);
}

/**
 * Helper: Prefer a section (replaces others in category)
 */
function preferSection(result: RuleResult, sectionId: ShortSectionId, reason?: string) {
  result.preferSections.add(sectionId);
  if (reason) {
    result.sectionReasons.set(sectionId, reason);
  }
}

/**
 * Helper: Avoid a section
 */
function avoidSection(result: RuleResult, sectionId: ShortSectionId, reason?: string) {
  result.avoidSections.add(sectionId);
}

/**
 * Helper: Ensure at least one of the specified sections exists
 */
function ensureOneOf(result: RuleResult, sectionIds: ShortSectionId[], reason: string) {
  const hasOne = sectionIds.some(id => result.sections.has(id));
  if (!hasOne) {
    requireSection(result, sectionIds[0], reason);
  }
}

/**
 * Helper: Avoid all *_ORIGINAL variants
 */
function avoidOriginalVariants(result: RuleResult, reason: string) {
  avoidSection(result, 'HERO_BANNER', reason);
  avoidSection(result, 'GALLERY_ORIGINAL', reason);
  avoidSection(result, 'TRAILER_ORIGINAL', reason);
}

/**
 * Helper: Get section category
 */
function getSectionCategory(sectionId: ShortSectionId): string | null {
  if (sectionId.startsWith('NAV_')) return 'navigation';
  if (sectionId.startsWith('HERO_')) return 'hero';
  if (sectionId.startsWith('CTA_')) return 'cta';
  if (sectionId.startsWith('GALLERY_')) return 'gallery';
  if (sectionId.startsWith('STAY_')) return 'stay';
  if (sectionId.startsWith('SEASONAL_')) return 'seasonal';
  if (sectionId.startsWith('TRAILER_')) return 'trailer';
  return null;
}

/**
 * Helper: Find last CTA index
 */
function findLastCTAIndex(sections: ShortSectionId[]): number {
  for (let i = sections.length - 1; i >= 0; i--) {
    if (sections[i].startsWith('CTA_')) {
      return i;
    }
  }
  return -1;
}

/**
 * Convert short IDs back to kebab-case IDs
 */
function convertToKebabIds(shortIds: ShortSectionId[]): string[] {
  return shortIds
    .map(id => REVERSE_SECTION_ID_MAP[id])
    .filter(Boolean); // Filter out any unmapped IDs
}

/**
 * Get reason for a section (for Strategy Summary)
 */
export function getSectionReason(sectionId: string, wizardData: WizardData): string {
  // This will be used by StrategySummary to display reasons
  // For now, return generic reason
  return 'Selected based on your business model, goals, and preferences';
}

/**
 * Determine if a section should be hidden by default
 */
export function shouldHideByDefault(
  sectionId: string,
  businessModel: BusinessModel | ''
): boolean {
  if (!businessModel) {
    return false;
  }

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