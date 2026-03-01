export interface Template {
  id: string;
  name: string;
  slug: string;
  description: string;
  primaryModel: 'seasonal' | 'overnight' | 'trailers';
  sections: string[];
  imageKeywords: string;
}

export const templates: Template[] = [
  {
    id: 'seasonal',
    name: 'Seasonal Trailer Park',
    slug: 'seasonal',
    description: 'Perfect for parks focused on long-term seasonal sites. Emphasizes community, amenities, and stability.',
    primaryModel: 'seasonal',
    sections: [
      'hero-weather',
      'stay-type-cards',
      'seasonal-benefits',
      'amenities-grid',
      'trailers-grid',
      'reviews',
      'cta-banner',
      'contact-section',
    ],
    imageKeywords: 'campground trailers',
  },
  {
    id: 'overnight',
    name: 'Overnight Getaway',
    slug: 'overnight',
    description: 'Designed for campgrounds catering to short-term visitors. Highlights activities, location, and booking ease.',
    primaryModel: 'overnight',
    sections: [
      'hero',
      'stay-type-cards',
      'amenities-grid',
      'gallery-grid',
      'local-attractions',
      'reviews',
      'cta-banner',
      'contact-section',
    ],
    imageKeywords: 'camping tent forest',
  },
  {
    id: 'trailers',
    name: 'Trailers for Sale First',
    slug: 'trailers',
    description: 'Prioritizes trailer sales with inventory showcase. Great for parks with active sales programs.',
    primaryModel: 'trailers',
    sections: [
      'hero',
      'trailers-grid',
      'reviews',
      'amenities-grid',
      'seasonal-benefits',
      'cta-banner',
      'contact-section',
    ],
    imageKeywords: 'rv trailer sale',
  },
];
