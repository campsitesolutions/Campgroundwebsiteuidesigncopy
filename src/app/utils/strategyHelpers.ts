import { PainPoint, Highlight } from '../context/WizardContext';

/**
 * Format pain point IDs into human-readable labels
 */
export function formatPainPoint(id: PainPoint): string {
  const map: Record<PainPoint, string> = {
    PP_CALLS: 'Too many repetitive phone calls',
    PP_LOW_SEASONAL: 'Low seasonal site bookings',
    PP_LOW_TRAILER: 'Low trailer sales/leads',
    PP_LOW_BOOKINGS: 'Low overnight bookings',
    PP_OUTDATED: 'Website looks outdated',
    PP_CONFUSION: 'Visitors confused by layout',
    PP_TRUST: 'Credibility/trust issues',
    PP_HARD_UPDATE: 'Difficult to update/maintain',
    PP_SEO: 'Poor search visibility',
  };
  return map[id] || id;
}

/**
 * Format highlight IDs into human-readable labels
 */
export function formatHighlight(id: Highlight): string {
  const map: Record<Highlight, string> = {
    HL_SCENIC: 'Scenic views/waterfront',
    HL_POOL: 'Pool or water amenities',
    HL_EVENTS: 'Seasonal events/activities',
    HL_SPACIOUS: 'Large/spacious sites',
    HL_FAMILY: 'Family-friendly focus',
    HL_ADULT: 'Adult-only or quiet',
    HL_PREMIUM: 'Luxury/premium positioning',
    HL_TRAILER_SALES: 'Trailer sales/inventory',
    HL_COTTAGES: 'Cottage rentals',
    HL_AWARD: 'Award-winning/highly rated',
  };
  return map[id] || id;
}

/**
 * Generate strategic focus areas from pain points and highlights
 */
export function generateKeyFocusAreas(painPoints: PainPoint[], highlights: Highlight[], primaryGoal: string): string[] {
  const focuses: string[] = [];

  // Ensure arrays are valid
  const safePainPoints = Array.isArray(painPoints) ? painPoints : [];
  const safeHighlights = Array.isArray(highlights) ? highlights : [];

  // Pain point-based focuses
  if (safePainPoints.includes('PP_CALLS')) {
    focuses.push('Reduce repetitive inquiries and clarify policies with strategic FAQ placement');
  }
  if (safePainPoints.includes('PP_OUTDATED')) {
    focuses.push('Modernize brand perception and elevate visual quality');
  }
  if (safePainPoints.includes('PP_LOW_BOOKINGS')) {
    focuses.push('Increase booking conversion rate with clear pricing and prominent CTAs');
  }
  if (safePainPoints.includes('PP_TRUST')) {
    focuses.push('Strengthen credibility and social proof through reviews and testimonials');
  }
  if (safePainPoints.includes('PP_CONFUSION')) {
    focuses.push('Improve site clarity and navigation with structured content layout');
  }
  if (safePainPoints.includes('PP_SEO')) {
    focuses.push('Enhance search visibility with SEO-optimized content structure');
  }
  if (safePainPoints.includes('PP_HARD_UPDATE')) {
    focuses.push('Simplify site management with streamlined, maintainable layout');
  }
  if (safePainPoints.includes('PP_LOW_SEASONAL')) {
    focuses.push('Drive seasonal site sales with compelling benefits presentation');
  }
  if (safePainPoints.includes('PP_LOW_TRAILER')) {
    focuses.push('Generate trailer leads with prominent inventory showcase');
  }

  // Highlight-based focuses
  if (safeHighlights.includes('HL_SCENIC')) {
    focuses.push('Showcase visual assets and waterfront positioning through strategic galleries');
  }
  if (safeHighlights.includes('HL_POOL')) {
    focuses.push('Feature upgraded amenities prominently to differentiate from competitors');
  }
  if (safeHighlights.includes('HL_EVENTS')) {
    focuses.push('Emphasize seasonal events and unique experiences');
  }
  if (safeHighlights.includes('HL_SPACIOUS')) {
    focuses.push('Promote spacious site benefits and premium positioning');
  }
  if (safeHighlights.includes('HL_FAMILY')) {
    focuses.push('Highlight family-friendly amenities and activities');
  }
  if (safeHighlights.includes('HL_PREMIUM')) {
    focuses.push('Establish luxury positioning with premium design and imagery');
  }
  if (safeHighlights.includes('HL_AWARD')) {
    focuses.push('Leverage awards and ratings to build trust and credibility');
  }

  // Goal-based focus if not covered
  if (primaryGoal === 'bookings' && !focuses.some(f => f.includes('booking'))) {
    focuses.push('Streamline the path to booking with early pricing visibility');
  }
  if (primaryGoal === 'inquiries' && !focuses.some(f => f.includes('inquiries'))) {
    focuses.push('Drive qualified inquiries through clear contact pathways');
  }
  if (primaryGoal === 'trailer-leads' && !focuses.some(f => f.includes('trailer'))) {
    focuses.push('Generate trailer sales leads with compelling inventory presentation');
  }

  return focuses.slice(0, 5); // Max 5 focus areas
}

/**
 * Generate strategic rationale paragraph
 */
export function generateStrategicRationale(
  painPoints: PainPoint[],
  highlights: Highlight[],
  primaryGoal: string,
  primaryBusinessModel: string
): string {
  let rationale = '';

  // Opening based on goal
  if (primaryGoal === 'bookings') {
    rationale += 'This layout is structured to move visitors efficiently toward booking decisions. ';
  } else if (primaryGoal === 'inquiries') {
    rationale += 'This layout is designed to build trust and encourage meaningful inquiries. ';
  } else if (primaryGoal === 'trailer-leads') {
    rationale += 'This layout showcases your trailer inventory while driving qualified sales leads. ';
  } else {
    rationale += 'This layout balances information delivery with conversion optimization. ';
  }

  // Address pain points
  if (painPoints.includes('PP_OUTDATED')) {
    rationale += 'By leading with modern, cinematic visuals, we immediately shift brand perception and signal a premium experience. ';
  }
  if (painPoints.includes('PP_CALLS') || painPoints.includes('PP_CONFUSION')) {
    rationale += 'Strategic FAQ placement reduces repetitive inquiries by proactively addressing common questions, freeing your team to focus on qualified leads. ';
  }
  if (painPoints.includes('PP_TRUST')) {
    rationale += 'Social proof through reviews and stat-driven hero sections builds immediate credibility with skeptical visitors. ';
  }
  if (painPoints.includes('PP_LOW_BOOKINGS')) {
    rationale += 'Prominent pricing visibility and multiple booking CTAs remove friction from the conversion path. ';
  }
  if (painPoints.includes('PP_HARD_UPDATE')) {
    rationale += 'The streamlined layout prioritizes ease of maintenance without sacrificing visual impact. ';
  }

  // Address highlights
  if (highlights.includes('HL_SCENIC')) {
    rationale += 'Visual galleries leverage your waterfront positioning as a competitive differentiator. ';
  }
  if (highlights.includes('HL_PREMIUM')) {
    rationale += 'Premium design elements and cinematic imagery establish your luxury market positioning. ';
  }
  if (highlights.includes('HL_FAMILY')) {
    rationale += 'Family-focused sections like amenities and local attractions speak directly to decision-makers researching kid-friendly stays. ';
  }
  if (highlights.includes('HL_EVENTS')) {
    rationale += 'Event showcases through galleries create urgency and highlight unique experiences. ';
  }

  // Closing
  rationale += 'The flow prioritizes clarity, reduces friction, and guides visitors naturally toward your primary conversion goal.';

  return rationale;
}

/**
 * Generate section-specific reasons
 */
export function generateSectionReasons(
  sectionIds: string[],
  painPoints: PainPoint[],
  highlights: Highlight[],
  primaryGoal: string
): Record<string, string> {
  const reasons: Record<string, string> = {};

  sectionIds.forEach(id => {
    // Hero sections
    if (id === 'hero-cinematic-overlay') {
      if (painPoints.includes('PP_OUTDATED') || highlights.includes('HL_PREMIUM')) {
        reasons[id] = 'Selected to elevate visual perception and support premium positioning';
      } else if (highlights.includes('HL_SCENIC')) {
        reasons[id] = 'Showcases scenic views with dramatic, full-width imagery';
      }
    } else if (id === 'hero-centered-stats') {
      if (painPoints.includes('PP_TRUST') || highlights.includes('HL_AWARD')) {
        reasons[id] = 'Includes social proof metrics to build immediate credibility';
      }
    } else if (id === 'hero-split-layout') {
      reasons[id] = 'Balanced layout provides clear messaging with visual appeal';
    }

    // FAQ
    if (id === 'faq') {
      if (painPoints.includes('PP_CALLS')) {
        reasons[id] = 'Positioned to reduce repetitive phone inquiries and answer common questions';
      } else if (painPoints.includes('PP_CONFUSION')) {
        reasons[id] = 'Clarifies policies and reduces visitor confusion';
      } else if (painPoints.includes('PP_SEO')) {
        reasons[id] = 'FAQ content improves search engine visibility and organic traffic';
      }
    }

    // Rates
    if (id === 'rates-teaser-strip') {
      if (primaryGoal === 'bookings' || painPoints.includes('PP_LOW_BOOKINGS')) {
        reasons[id] = 'Positioned earlier to support conversion-driven visitors seeking pricing';
      }
    }

    // Reviews
    if (id === 'reviews') {
      if (painPoints.includes('PP_TRUST')) {
        reasons[id] = 'Strengthens credibility through authentic guest testimonials';
      } else if (highlights.includes('HL_AWARD')) {
        reasons[id] = 'Showcases awards and top ratings to build trust';
      }
    }

    // Galleries
    if (id.startsWith('gallery-')) {
      if (highlights.includes('HL_SCENIC')) {
        reasons[id] = 'Showcases waterfront positioning and visual assets as key differentiators';
      } else if (highlights.includes('HL_EVENTS')) {
        reasons[id] = 'Highlights seasonal events and activities through compelling imagery';
      } else if (highlights.includes('HL_PREMIUM')) {
        reasons[id] = 'Premium gallery design reinforces luxury positioning';
      }
    }

    // Amenities
    if (id === 'amenities-grid') {
      if (highlights.includes('HL_POOL')) {
        reasons[id] = 'Features pool and water amenities as primary differentiators';
      } else if (highlights.includes('HL_FAMILY')) {
        reasons[id] = 'Highlights family-friendly amenities that appeal to target families';
      } else if (highlights.includes('HL_PREMIUM')) {
        reasons[id] = 'Showcases premium amenities and upscale facilities';
      }
    }

    // Local Attractions
    if (id === 'local-attractions') {
      if (highlights.includes('HL_FAMILY')) {
        reasons[id] = 'Positions the park as a destination hub for family activities';
      }
    }

    // Seasonal Benefits
    if (id.startsWith('seasonal-benefits')) {
      if (painPoints.includes('PP_LOW_SEASONAL')) {
        reasons[id] = 'Highlights seasonal site benefits to drive conversions';
      } else if (highlights.includes('HL_SPACIOUS')) {
        reasons[id] = 'Emphasizes spacious site benefits for seasonal campers';
      }
    }

    // Trailer sections
    if (id.startsWith('trailers-')) {
      if (painPoints.includes('PP_LOW_TRAILER') || highlights.includes('HL_TRAILER_SALES')) {
        reasons[id] = 'Showcases trailer inventory to generate qualified sales leads';
      }
    }

    // Stay Type Cards
    if (id.startsWith('stay-type-cards')) {
      if (id === 'stay-type-cards-structured' && painPoints.includes('PP_CONFUSION')) {
        reasons[id] = 'Clear, structured layout improves navigation and reduces confusion';
      } else if (id === 'stay-type-cards-image-overlay' && highlights.includes('HL_COTTAGES')) {
        reasons[id] = 'Visual showcase highlights cottage rental options';
      }
    }

    // CTAs
    if (id.startsWith('cta-')) {
      if (primaryGoal === 'bookings') {
        reasons[id] = 'Strategically placed to convert visitors at peak engagement moments';
      } else if (primaryGoal === 'inquiries') {
        reasons[id] = 'Drives qualified inquiries with clear contact pathways';
      } else if (primaryGoal === 'trailer-leads') {
        reasons[id] = 'Encourages trailer inquiry submissions and tour requests';
      }
    }
  });

  return reasons;
}