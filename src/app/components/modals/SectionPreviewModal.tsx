import { X } from 'lucide-react';
import { SectionConfig } from '../../data/sections';
import { Hero } from '../sections/Hero';
import { HeroWeather } from '../sections/HeroWeather';
import { HeroCinematicOverlay } from '../sections/HeroCinematicOverlay';
import { HeroSplitLayout } from '../sections/HeroSplitLayout';
import { HeroCenteredWithStats } from '../sections/HeroCenteredWithStats';
import { StayTypeCards } from '../sections/StayTypeCards';
import { StayTypeCardsImageOverlay } from '../sections/StayTypeCardsImageOverlay';
import { StayTypeCardsSpotlight } from '../sections/StayTypeCardsSpotlight';
import { StayTypeCardsStructured } from '../sections/StayTypeCardsStructured';
import { RatesTeaserStrip } from '../sections/RatesTeaserStrip';
import { AmenitiesGrid } from '../sections/AmenitiesGrid';
import { SeasonalBenefits } from '../sections/SeasonalBenefits';
import { SeasonalBenefitsAlternating } from '../sections/SeasonalBenefitsAlternating';
import { SeasonalBenefitsIconCards } from '../sections/SeasonalBenefitsIconCards';
import { SeasonalBenefitsStats } from '../sections/SeasonalBenefitsStats';
import { TrailersGrid } from '../sections/TrailersGrid';
import { TrailersCleanGrid } from '../sections/TrailersCleanGrid';
import { TrailersFeaturedGrid } from '../sections/TrailersFeaturedGrid';
import { TrailersHorizontalScroll } from '../sections/TrailersHorizontalScroll';
import { LocalAttractions } from '../sections/LocalAttractions';
import { CTABanner } from '../sections/CTABanner';
import { CTAImageBackground } from '../sections/CTAImageBackground';
import { CTASolidBand } from '../sections/CTASolidBand';
import { CTASplitLayout } from '../sections/CTASplitLayout';
import { ContactSection } from '../sections/ContactSection';
import { GalleryGrid } from '../sections/GalleryGrid';
import { GalleryHorizontalScroll } from '../sections/GalleryHorizontalScroll';
import { GalleryMasonry } from '../sections/GalleryMasonry';
import { GalleryUniformGrid } from '../sections/GalleryUniformGrid';
import { Reviews } from '../sections/Reviews';
import { FAQ } from '../sections/FAQ';
import { NavigationCentered } from '../sections/NavigationCentered';
import { NavigationWithCTA } from '../sections/NavigationWithCTA';
import { NavigationWithTopBar } from '../sections/NavigationWithTopBar';
import { Footer } from '../sections/Footer';
import { useEffect } from 'react';

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

interface SectionPreviewModalProps {
  section: SectionConfig;
  onClose: () => void;
}

export function SectionPreviewModal({ section, onClose }: SectionPreviewModalProps) {
  const Component = componentMap[section.component];

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!Component) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-2xl max-w-7xl w-full max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{section.name}</h2>
              <p className="text-sm text-gray-600">{section.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              title="Close preview (Esc)"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Preview Content - Scrollable */}
          <div className="flex-1 overflow-auto bg-gray-100">
            <div className="bg-white">
              <Component customization={{}} />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-lg">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4">
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
                <div>
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
                Press Esc or click outside to close
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
