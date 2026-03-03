export interface SectionConfig {
  id: string;
  name: string;
  description: string;
  tags: {
    businessModel: ('seasonal' | 'overnight' | 'trailers' | 'cottages')[];
    goal: ('bookings' | 'inquiries' | 'trailer-leads')[];
  };
  component: string;
}

export const sections: SectionConfig[] = [
  {
    id: 'nav-centered',
    name: 'Navigation - Centered Links',
    description: 'Clean navigation with centered menu links and contact info. Modern and minimal.',
    tags: {
      businessModel: ['seasonal', 'overnight', 'trailers', 'cottages'],
      goal: ['bookings', 'inquiries', 'trailer-leads'],
    },
    component: 'NavigationCentered',
  },
  {
    id: 'nav-with-cta',
    name: 'Navigation - With CTA Button',
    description: 'Bold navigation with prominent "Book Now" button. Great for conversions.',
    tags: {
      businessModel: ['seasonal', 'overnight', 'cottages'],
      goal: ['bookings'],
    },
    component: 'NavigationWithCTA',
  },
  {
    id: 'nav-with-topbar',
    name: 'Navigation - With Top Info Bar',
    description: 'Two-tier navigation with contact info bar. Professional and informative.',
    tags: {
      businessModel: ['seasonal', 'overnight', 'trailers', 'cottages'],
      goal: ['bookings', 'inquiries', 'trailer-leads'],
    },
    component: 'NavigationWithTopBar',
  },
  {
    id: 'hero',
    name: 'Hero Banner',
    description: 'High-impact hero with imagery and CTAs. Great for first impressions.',
    tags: {
      businessModel: ['seasonal', 'overnight', 'trailers', 'cottages'],
      goal: ['bookings', 'inquiries', 'trailer-leads'],
    },
    component: 'Hero',
  },
  {
    id: 'hero-cinematic-overlay',
    name: 'Hero - Cinematic Overlay',
    description: 'Full-width cinematic hero with dark gradient overlay, seasonal tagline, and dual CTAs. Premium and dramatic.',
    tags: {
      businessModel: ['seasonal', 'overnight', 'trailers', 'cottages'],
      goal: ['bookings', 'inquiries', 'trailer-leads'],
    },
    component: 'HeroCinematicOverlay',
  },
  {
    id: 'hero-split-layout',
    name: 'Hero - Split Layout',
    description: 'Structured split hero with content on left, large image on right. Clean, conversion-focused with trust indicators.',
    tags: {
      businessModel: ['seasonal', 'overnight', 'trailers', 'cottages'],
      goal: ['bookings', 'inquiries', 'trailer-leads'],
    },
    component: 'HeroSplitLayout',
  },
  {
    id: 'hero-centered-stats',
    name: 'Hero - Centered with Stats',
    description: 'Full-width hero with centered content and stat highlights row. Balanced, premium presentation with social proof.',
    tags: {
      businessModel: ['seasonal', 'overnight', 'trailers', 'cottages'],
      goal: ['bookings', 'inquiries', 'trailer-leads'],
    },
    component: 'HeroCenteredWithStats',
  },
  {
    id: 'hero-weather',
    name: 'Hero with Weather Card',
    description: 'Hero section with live weather display. Perfect for seasonal parks.',
    tags: {
      businessModel: ['seasonal', 'overnight'],
      goal: ['bookings'],
    },
    component: 'HeroWeather',
  },
  {
    id: 'stay-type-cards',
    name: 'Stay Type Cards',
    description: 'Three-card layout showcasing overnight, seasonal, and cottage options.',
    tags: {
      businessModel: ['seasonal', 'overnight', 'cottages'],
      goal: ['bookings', 'inquiries'],
    },
    component: 'StayTypeCards',
  },
  {
    id: 'stay-type-cards-image-overlay',
    name: 'Stay Types - Image Overlay',
    description: 'Full-image background cards with centered text overlay. Entire card clickable with hover elevation effect.',
    tags: {
      businessModel: ['seasonal', 'overnight', 'cottages'],
      goal: ['bookings', 'inquiries'],
    },
    component: 'StayTypeCardsImageOverlay',
  },
  {
    id: 'stay-type-cards-structured',
    name: 'Stay Types - Structured Info',
    description: 'Clean 3-column layout with icons, headings, and text CTA links. Minimal and informative design.',
    tags: {
      businessModel: ['seasonal', 'overnight', 'cottages'],
      goal: ['bookings', 'inquiries'],
    },
    component: 'StayTypeCardsStructured',
  },
  {
    id: 'stay-type-cards-spotlight',
    name: 'Stay Types - Spotlight Layout',
    description: 'Asymmetric layout with large featured Seasonal Sites card on left, two stacked cards on right. Clear hierarchy.',
    tags: {
      businessModel: ['seasonal', 'overnight', 'cottages'],
      goal: ['bookings', 'inquiries'],
    },
    component: 'StayTypeCardsSpotlight',
  },
  {
    id: 'rates-teaser-strip',
    name: 'Rates Teaser Strip',
    description: 'Compact pricing preview encouraging visitors to view full rate details.',
    tags: {
      businessModel: ['seasonal', 'overnight', 'cottages'],
      goal: ['bookings'],
    },
    component: 'RatesTeaserStrip',
  },
  {
    id: 'amenities-grid',
    name: 'Amenities Icon Grid',
    description: 'Six-item grid highlighting park features. Essential for all sites.',
    tags: {
      businessModel: ['seasonal', 'overnight', 'trailers', 'cottages'],
      goal: ['bookings', 'inquiries'],
    },
    component: 'AmenitiesGrid',
  },
  {
    id: 'seasonal-benefits',
    name: 'Seasonal Benefits',
    description: 'Two-column layout with image and checklist of seasonal benefits.',
    tags: {
      businessModel: ['seasonal'],
      goal: ['bookings'],
    },
    component: 'SeasonalBenefits',
  },
  {
    id: 'seasonal-benefits-icon-cards',
    name: 'Seasonal Benefits - Icon Cards',
    description: 'Grid of icon cards showcasing seasonal benefits. Subtle gradient background with centered CTA.',
    tags: {
      businessModel: ['seasonal'],
      goal: ['bookings'],
    },
    component: 'SeasonalBenefitsIconCards',
  },
  {
    id: 'seasonal-benefits-alternating',
    name: 'Seasonal Benefits - Alternating Rows',
    description: 'Two-row layout alternating image/text sides. Headline, paragraph, and text CTA per row.',
    tags: {
      businessModel: ['seasonal'],
      goal: ['bookings'],
    },
    component: 'SeasonalBenefitsAlternating',
  },
  {
    id: 'seasonal-benefits-stats',
    name: 'Seasonal Benefits - Large Stats',
    description: 'Horizontal stat blocks with prominent numbers and supporting labels. Clean, confident presentation.',
    tags: {
      businessModel: ['seasonal'],
      goal: ['bookings'],
    },
    component: 'SeasonalBenefitsStats',
  },
  {
    id: 'overnight-experience-highlight',
    name: 'Overnight Experience Highlight',
    description: 'Two-column layout highlighting overnight camping option when both seasonal and overnight are offered. Only renders for dual-model configurations.',
    tags: {
      businessModel: ['seasonal', 'overnight'],
      goal: ['bookings'],
    },
    component: 'OvernightExperienceHighlight',
  },
  {
    id: 'trailer-sales-highlight',
    name: 'Trailer Sales Highlight',
    description: 'Two-column layout highlighting trailer sales option when both seasonal and trailer sales are offered. Only renders for dual-model configurations.',
    tags: {
      businessModel: ['seasonal', 'trailers'],
      goal: ['bookings', 'inquiries'],
    },
    component: 'TrailerSalesHighlight',
  },
  {
    id: 'trailers-grid',
    name: 'Trailers for Sale - Original',
    description: 'Grid layout showcasing park model trailers for sale. Traditional design with image, title, and specs.',
    tags: {
      businessModel: ['seasonal', 'trailers'],
      goal: ['inquiries'],
    },
    component: 'TrailersGrid',
  },
  {
    id: 'trailers-clean-grid',
    name: 'Trailers - Clean Grid',
    description: 'Minimal 3-column grid with trailer cards, filter bar, and refined styling. Conversion-focused layout.',
    tags: {
      businessModel: ['trailers'],
      goal: ['trailer-leads', 'inquiries'],
    },
    component: 'TrailersCleanGrid',
  },
  {
    id: 'trailers-featured-grid',
    name: 'Trailers - Featured + Grid',
    description: 'Large featured trailer card with split layout, followed by 3-column grid. Strong hierarchy and detail-focused.',
    tags: {
      businessModel: ['trailers'],
      goal: ['trailer-leads', 'inquiries'],
    },
    component: 'TrailersFeaturedGrid',
  },
  {
    id: 'trailers-horizontal-scroll',
    name: 'Trailers - Horizontal Scroll',
    description: 'Image-forward horizontal scrolling cards with overlay text. Modern, touch-friendly navigation with arrows.',
    tags: {
      businessModel: ['trailers'],
      goal: ['trailer-leads', 'inquiries'],
    },
    component: 'TrailersHorizontalScroll',
  },
  {
    id: 'gallery-grid',
    name: 'Photo Gallery - Original',
    description: 'Eight-image grid showcasing your campground\'s best visuals.',
    tags: {
      businessModel: ['seasonal', 'overnight', 'cottages'],
      goal: ['bookings'],
    },
    component: 'GalleryGrid',
  },
  {
    id: 'gallery-masonry',
    name: 'Photo Gallery - Masonry',
    description: 'Responsive masonry-style image grid with subtle hover zoom. Dynamic, Pinterest-like layout.',
    tags: {
      businessModel: ['seasonal', 'overnight', 'cottages'],
      goal: ['bookings'],
    },
    component: 'GalleryMasonry',
  },
  {
    id: 'gallery-uniform-grid',
    name: 'Photo Gallery - Uniform Grid',
    description: '4-column uniform image grid with hover overlay. Clean, structured, and professional.',
    tags: {
      businessModel: ['seasonal', 'overnight', 'cottages'],
      goal: ['bookings'],
    },
    component: 'GalleryUniformGrid',
  },
  {
    id: 'gallery-horizontal-scroll',
    name: 'Photo Gallery - Horizontal Scroll',
    description: 'Large horizontally scrollable image strip with minimal UI. Immersive, touch-friendly experience.',
    tags: {
      businessModel: ['seasonal', 'overnight', 'cottages'],
      goal: ['bookings'],
    },
    component: 'GalleryHorizontalScroll',
  },
  {
    id: 'reviews',
    name: 'Customer Reviews',
    description: 'Three-card testimonial section. Builds trust and credibility.',
    tags: {
      businessModel: ['seasonal', 'overnight', 'trailers', 'cottages'],
      goal: ['bookings', 'inquiries', 'trailer-leads'],
    },
    component: 'Reviews',
  },
  {
    id: 'local-attractions',
    name: 'Local Attractions',
    description: 'Showcase nearby activities and points of interest.',
    tags: {
      businessModel: ['overnight', 'cottages'],
      goal: ['bookings'],
    },
    component: 'LocalAttractions',
  },
  {
    id: 'faq',
    name: 'FAQ Accordion',
    description: 'Common questions answered. Reduces support inquiries.',
    tags: {
      businessModel: ['seasonal', 'overnight', 'trailers', 'cottages'],
      goal: ['bookings', 'inquiries', 'trailer-leads'],
    },
    component: 'FAQ',
  },
  {
    id: 'cta-banner',
    name: 'CTA Banner - Gradient',
    description: 'Bold gradient call-to-action banner. Great for conversion points.',
    tags: {
      businessModel: ['seasonal', 'overnight', 'trailers', 'cottages'],
      goal: ['bookings', 'inquiries', 'trailer-leads'],
    },
    component: 'CTABanner',
  },
  {
    id: 'cta-image-background',
    name: 'CTA Banner - Image Background',
    description: 'Full-width scenic background with dark overlay and centered CTA. High-impact and bold.',
    tags: {
      businessModel: ['seasonal', 'overnight', 'trailers', 'cottages'],
      goal: ['bookings', 'inquiries', 'trailer-leads'],
    },
    component: 'CTAImageBackground',
  },
  {
    id: 'cta-solid-band',
    name: 'CTA Banner - Solid Band',
    description: 'Full-width solid color band with left headline and right button. Minimal and conversion-focused.',
    tags: {
      businessModel: ['seasonal', 'overnight', 'trailers', 'cottages'],
      goal: ['bookings', 'inquiries', 'trailer-leads'],
    },
    component: 'CTASolidBand',
  },
  {
    id: 'cta-split-layout',
    name: 'CTA Banner - Split Layout',
    description: 'Split layout with text and CTA on left, supporting image on right. Balanced and modern.',
    tags: {
      businessModel: ['seasonal', 'overnight', 'trailers', 'cottages'],
      goal: ['bookings', 'inquiries', 'trailer-leads'],
    },
    component: 'CTASplitLayout',
  },
  {
    id: 'contact-section',
    name: 'Contact Form + Details',
    description: 'Full contact section with form and park information.',
    tags: {
      businessModel: ['seasonal', 'overnight', 'trailers', 'cottages'],
      goal: ['inquiries', 'trailer-leads'],
    },
    component: 'ContactSection',
  },
];