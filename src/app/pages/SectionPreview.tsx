import { useParams } from 'react-router';
import { sections } from '../data/sections';
import { Hero } from '../components/sections/Hero';
import { HeroWeather } from '../components/sections/HeroWeather';
import { HeroCinematicOverlay } from '../components/sections/HeroCinematicOverlay';
import { HeroSplitLayout } from '../components/sections/HeroSplitLayout';
import { HeroCenteredWithStats } from '../components/sections/HeroCenteredWithStats';
import { StayTypeCards } from '../components/sections/StayTypeCards';
import { StayTypeCardsImageOverlay } from '../components/sections/StayTypeCardsImageOverlay';
import { StayTypeCardsSpotlight } from '../components/sections/StayTypeCardsSpotlight';
import { StayTypeCardsStructured } from '../components/sections/StayTypeCardsStructured';
import { RatesTeaserStrip } from '../components/sections/RatesTeaserStrip';
import { AmenitiesGrid } from '../components/sections/AmenitiesGrid';
import { SeasonalBenefits } from '../components/sections/SeasonalBenefits';
import { SeasonalBenefitsAlternating } from '../components/sections/SeasonalBenefitsAlternating';
import { SeasonalBenefitsIconCards } from '../components/sections/SeasonalBenefitsIconCards';
import { SeasonalBenefitsStats } from '../components/sections/SeasonalBenefitsStats';
import { OvernightExperienceHighlight } from '../components/sections/OvernightExperienceHighlight';
import { TrailersGrid } from '../components/sections/TrailersGrid';
import { TrailersCleanGrid } from '../components/sections/TrailersCleanGrid';
import { TrailersFeaturedGrid } from '../components/sections/TrailersFeaturedGrid';
import { TrailersHorizontalScroll } from '../components/sections/TrailersHorizontalScroll';
import { LocalAttractions } from '../components/sections/LocalAttractions';
import { CTABanner } from '../components/sections/CTABanner';
import { CTAImageBackground } from '../components/sections/CTAImageBackground';
import { CTASolidBand } from '../components/sections/CTASolidBand';
import { CTASplitLayout } from '../components/sections/CTASplitLayout';
import { ContactSection } from '../components/sections/ContactSection';
import { GalleryGrid } from '../components/sections/GalleryGrid';
import { GalleryHorizontalScroll } from '../components/sections/GalleryHorizontalScroll';
import { GalleryMasonry } from '../components/sections/GalleryMasonry';
import { GalleryUniformGrid } from '../components/sections/GalleryUniformGrid';
import { Reviews } from '../components/sections/Reviews';
import { FAQ } from '../components/sections/FAQ';
import { NavigationCentered } from '../components/sections/NavigationCentered';
import { NavigationWithCTA } from '../components/sections/NavigationWithCTA';
import { NavigationWithTopBar } from '../components/sections/NavigationWithTopBar';
import { Footer } from '../components/sections/Footer';
import { X } from 'lucide-react';

const componentMap: Record<string, React.ComponentType<any>> = {
  Hero,
  HeroWeather,
  HeroCinematicOverlay,
  HeroSplitLayout,
  HeroCenteredWithStats,
  StayTypeCards,
  StayTypeCardsImageOverlay,
  StayTypeCardsSpotlight,
  StayTypeCardsStructured,
  RatesTeaserStrip,
  AmenitiesGrid,
  SeasonalBenefits,
  SeasonalBenefitsAlternating,
  SeasonalBenefitsIconCards,
  SeasonalBenefitsStats,
  OvernightExperienceHighlight,
  TrailersGrid,
  TrailersCleanGrid,
  TrailersFeaturedGrid,
  TrailersHorizontalScroll,
  LocalAttractions,
  CTABanner,
  CTAImageBackground,
  CTASolidBand,
  CTASplitLayout,
  ContactSection,
  GalleryGrid,
  GalleryHorizontalScroll,
  GalleryMasonry,
  GalleryUniformGrid,
  Reviews,
  FAQ,
  NavigationCentered,
  NavigationWithCTA,
  NavigationWithTopBar,
  Footer,
};

export function SectionPreview() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const section = sections.find(s => s.id === sectionId);

  console.log('SectionPreview rendering', { sectionId, section });

  if (!section) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Section Not Found</h1>
          <p className="text-gray-600">The section you're looking for doesn't exist.</p>
          <p className="text-sm text-gray-500 mt-2">Section ID: {sectionId}</p>
        </div>
      </div>
    );
  }

  const Component = componentMap[section.component];

  console.log('Component lookup', { componentName: section.component, Component, hasComponent: !!Component });

  if (!Component) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Component Not Available</h1>
          <p className="text-gray-600">This section component is not available for preview.</p>
          <p className="text-sm text-gray-500 mt-2">Component: {section.component}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-500">
      <h1 style={{ color: 'white', padding: '20px', fontSize: '24px' }}>PREVIEW LOADED - Section: {section.name}</h1>
      
      {/* Preview Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{section.name}</h1>
              <p className="text-sm text-gray-600">{section.description}</p>
            </div>
            <button
              onClick={() => window.close()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Close preview"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Section Preview */}
      <div className="bg-white">
        <Component customization={{}} />
      </div>

      {/* Preview Footer Info */}
      <div className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <div>
                <span className="text-sm font-semibold text-gray-700">Business Models:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {section.tags.businessModel.map(tag => (
                    <span
                      key={tag}
                      className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="ml-4">
                <span className="text-sm font-semibold text-gray-700">Goals:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {section.tags.goal.map(tag => (
                    <span
                      key={tag}
                      className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Preview Mode • Close this window to return to the library
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}