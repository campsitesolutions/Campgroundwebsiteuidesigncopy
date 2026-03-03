import { Suspense, lazy } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/sections/Footer';

// Lazy load all section components to isolate import errors
const NavigationCentered = lazy(() => import('../components/sections/NavigationCentered').then(m => ({ default: m.NavigationCentered })));
const NavigationWithCTA = lazy(() => import('../components/sections/NavigationWithCTA').then(m => ({ default: m.NavigationWithCTA })));
const NavigationWithTopBar = lazy(() => import('../components/sections/NavigationWithTopBar').then(m => ({ default: m.NavigationWithTopBar })));

const Hero = lazy(() => import('../components/sections/Hero').then(m => ({ default: m.Hero })));
const HeroCinematicOverlay = lazy(() => import('../components/sections/HeroCinematicOverlay').then(m => ({ default: m.HeroCinematicOverlay })));
const HeroSplitLayout = lazy(() => import('../components/sections/HeroSplitLayout').then(m => ({ default: m.HeroSplitLayout })));
const HeroCenteredWithStats = lazy(() => import('../components/sections/HeroCenteredWithStats').then(m => ({ default: m.HeroCenteredWithStats })));
const HeroWeather = lazy(() => import('../components/sections/HeroWeather').then(m => ({ default: m.HeroWeather })));

const StayTypeCards = lazy(() => import('../components/sections/StayTypeCards').then(m => ({ default: m.StayTypeCards })));
const StayTypeCardsImageOverlay = lazy(() => import('../components/sections/StayTypeCardsImageOverlay').then(m => ({ default: m.StayTypeCardsImageOverlay })));
const StayTypeCardsStructured = lazy(() => import('../components/sections/StayTypeCardsStructured').then(m => ({ default: m.StayTypeCardsStructured })));
const StayTypeCardsSpotlight = lazy(() => import('../components/sections/StayTypeCardsSpotlight').then(m => ({ default: m.StayTypeCardsSpotlight })));

const RatesTeaserStrip = lazy(() => import('../components/sections/RatesTeaserStrip').then(m => ({ default: m.RatesTeaserStrip })));
const AmenitiesGrid = lazy(() => import('../components/sections/AmenitiesGrid').then(m => ({ default: m.AmenitiesGrid })));

const SeasonalBenefits = lazy(() => import('../components/sections/SeasonalBenefits').then(m => ({ default: m.SeasonalBenefits })));
const SeasonalBenefitsIconCards = lazy(() => import('../components/sections/SeasonalBenefitsIconCards').then(m => ({ default: m.SeasonalBenefitsIconCards })));
const SeasonalBenefitsAlternating = lazy(() => import('../components/sections/SeasonalBenefitsAlternating').then(m => ({ default: m.SeasonalBenefitsAlternating })));
const SeasonalBenefitsStats = lazy(() => import('../components/sections/SeasonalBenefitsStats').then(m => ({ default: m.SeasonalBenefitsStats })));

const OvernightExperienceHighlight = lazy(() => import('../components/sections/OvernightExperienceHighlight').then(m => ({ default: m.OvernightExperienceHighlight })));
const CottageRentalsHighlight = lazy(() => import('../components/sections/CottageRentalsHighlight').then(m => ({ default: m.CottageRentalsHighlight })));
const TrailerSalesHighlight = lazy(() => import('../components/sections/TrailerSalesHighlight').then(m => ({ default: m.TrailerSalesHighlight })));

const TrailersGrid = lazy(() => import('../components/sections/TrailersGrid').then(m => ({ default: m.TrailersGrid })));
const TrailersCleanGrid = lazy(() => import('../components/sections/TrailersCleanGrid').then(m => ({ default: m.TrailersCleanGrid })));
const TrailersFeaturedGrid = lazy(() => import('../components/sections/TrailersFeaturedGrid').then(m => ({ default: m.TrailersFeaturedGrid })));
const TrailersHorizontalScroll = lazy(() => import('../components/sections/TrailersHorizontalScroll').then(m => ({ default: m.TrailersHorizontalScroll })));

const GalleryGrid = lazy(() => import('../components/sections/GalleryGrid').then(m => ({ default: m.GalleryGrid })));
const GalleryMasonry = lazy(() => import('../components/sections/GalleryMasonry').then(m => ({ default: m.GalleryMasonry })));
const GalleryUniformGrid = lazy(() => import('../components/sections/GalleryUniformGrid').then(m => ({ default: m.GalleryUniformGrid })));
const GalleryHorizontalScroll = lazy(() => import('../components/sections/GalleryHorizontalScroll').then(m => ({ default: m.GalleryHorizontalScroll })));

const Reviews = lazy(() => import('../components/sections/Reviews').then(m => ({ default: m.Reviews })));
const LocalAttractions = lazy(() => import('../components/sections/LocalAttractions').then(m => ({ default: m.LocalAttractions })));
const FAQ = lazy(() => import('../components/sections/FAQ').then(m => ({ default: m.FAQ })));

const CTABanner = lazy(() => import('../components/sections/CTABanner').then(m => ({ default: m.CTABanner })));
const CTAImageBackground = lazy(() => import('../components/sections/CTAImageBackground').then(m => ({ default: m.CTAImageBackground })));
const CTASolidBand = lazy(() => import('../components/sections/CTASolidBand').then(m => ({ default: m.CTASolidBand })));
const CTASplitLayout = lazy(() => import('../components/sections/CTASplitLayout').then(m => ({ default: m.CTASplitLayout })));

const ContactSection = lazy(() => import('../components/sections/ContactSection').then(m => ({ default: m.ContactSection })));

interface VariationGroup {
  categoryTitle: string;
  variations: {
    label: string;
    Component: React.LazyExoticComponent<React.ComponentType<any>>;
  }[];
}

const variationGroups: VariationGroup[] = [
  {
    categoryTitle: 'Navigation Variations',
    variations: [
      { label: 'Navigation – Centered Links', Component: NavigationCentered },
      { label: 'Navigation – With CTA Button', Component: NavigationWithCTA },
      { label: 'Navigation – With Top Info Bar', Component: NavigationWithTopBar },
    ],
  },
  {
    categoryTitle: 'Hero Banner Variations',
    variations: [
      { label: 'Hero – Original', Component: Hero },
      { label: 'Hero – Cinematic Seasonal Lifestyle – v1', Component: HeroCinematicOverlay },
      { label: 'Hero – Split Seasonal Home – v1', Component: HeroSplitLayout },
      { label: 'Hero – Centered with Stats', Component: HeroCenteredWithStats },
      { label: 'Hero – Weather Card', Component: HeroWeather },
    ],
  },
  {
    categoryTitle: 'Stay Types Variations',
    variations: [
      { label: 'Stay Types – Original Cards', Component: StayTypeCards },
      { label: 'Stay Types – Image Overlay', Component: StayTypeCardsImageOverlay },
      { label: 'Stay Types – Structured Info', Component: StayTypeCardsStructured },
      { label: 'Stay Types – Spotlight Layout', Component: StayTypeCardsSpotlight },
    ],
  },
  {
    categoryTitle: 'Rates & Amenities',
    variations: [
      { label: 'Rates Teaser Strip', Component: RatesTeaserStrip },
      { label: 'Amenities Grid', Component: AmenitiesGrid },
    ],
  },
  {
    categoryTitle: 'Seasonal Benefits Variations',
    variations: [
      { label: 'Seasonal Benefits – Original', Component: SeasonalBenefits },
      { label: 'Seasonal Benefits – Icon Cards', Component: SeasonalBenefitsIconCards },
      { label: 'Seasonal Benefits – Alternating Rows', Component: SeasonalBenefitsAlternating },
      { label: 'Seasonal Benefits – Large Stats', Component: SeasonalBenefitsStats },
    ],
  },
  {
    categoryTitle: 'Business Model Highlight Sections',
    variations: [
      { label: 'Overnight Experience Highlight', Component: OvernightExperienceHighlight },
      { label: 'Cottage Rentals Highlight', Component: CottageRentalsHighlight },
      { label: 'Trailer Sales Highlight', Component: TrailerSalesHighlight },
    ],
  },
  {
    categoryTitle: 'Trailers for Sale Variations',
    variations: [
      { label: 'Trailers – Original Grid', Component: TrailersGrid },
      { label: 'Trailers – Clean Grid', Component: TrailersCleanGrid },
      { label: 'Trailers – Featured + Grid', Component: TrailersFeaturedGrid },
      { label: 'Trailers – Horizontal Scroll', Component: TrailersHorizontalScroll },
    ],
  },
  {
    categoryTitle: 'Photo Gallery Variations',
    variations: [
      { label: 'Photo Gallery – Original Grid', Component: GalleryGrid },
      { label: 'Photo Gallery – Masonry', Component: GalleryMasonry },
      { label: 'Photo Gallery – Uniform Grid', Component: GalleryUniformGrid },
      { label: 'Photo Gallery – Horizontal Scroll', Component: GalleryHorizontalScroll },
    ],
  },
  {
    categoryTitle: 'Social Proof & Information',
    variations: [
      { label: 'Reviews / Testimonials', Component: Reviews },
      { label: 'Local Attractions', Component: LocalAttractions },
      { label: 'FAQ Section', Component: FAQ },
    ],
  },
  {
    categoryTitle: 'CTA Banner Variations',
    variations: [
      { label: 'CTA Banner – Gradient', Component: CTABanner },
      { label: 'CTA Banner – Image Background', Component: CTAImageBackground },
      { label: 'CTA Banner – Solid Band', Component: CTASolidBand },
      { label: 'CTA Banner – Split Layout', Component: CTASplitLayout },
    ],
  },
  {
    categoryTitle: 'Contact Section',
    variations: [
      { label: 'Contact Section', Component: ContactSection },
    ],
  },
];

export function ComponentReviewBoard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-white border-b border-gray-200 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Component Review Board</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Internal review board displaying all homepage section variations. Each variation is grouped by section type for easy comparison and review.
            </p>
          </div>
        </section>

        {/* Variation Groups */}
        <div className="py-12 space-y-16">
          {variationGroups.map((group, groupIndex) => (
            <section key={groupIndex} className="space-y-8">
              {/* Category Heading */}
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {group.categoryTitle}
                </h2>
                <div className="h-1 w-24 bg-[#E8D5B5] rounded-full"></div>
              </div>

              {/* Variations Container - Vertical Stack */}
              <div className="space-y-12">
                <div className="container mx-auto px-4">
                  {group.variations.map((variation, varIndex) => (
                    <div key={varIndex} className="mb-12">
                      {/* Variation Label */}
                      <div className="mb-4 bg-[#E8D5B5] text-[#2C3E50] px-6 py-3 rounded-lg inline-block">
                        <h3 className="font-bold text-lg">{variation.label}</h3>
                      </div>
                      
                      {/* Variation Component */}
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden border-4 border-gray-200">
                        <Suspense fallback={
                          <div className="p-12 text-center text-gray-500">
                            Loading component...
                          </div>
                        }>
                          <variation.Component />
                        </Suspense>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Bottom Info */}
        <section className="bg-white border-t border-gray-200 py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600">
              <strong>Total Variations:</strong> {variationGroups.reduce((sum, group) => sum + group.variations.length, 0)} components across {variationGroups.length} categories
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}