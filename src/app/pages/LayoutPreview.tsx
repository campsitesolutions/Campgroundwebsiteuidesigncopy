import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { sections } from '../data/sections';
import { ArrowLeft, CheckCircle } from 'lucide-react';

// Import all section components
import { NavigationCentered } from '../components/sections/NavigationCentered';
import { NavigationWithCTA } from '../components/sections/NavigationWithCTA';
import { NavigationWithTopBar } from '../components/sections/NavigationWithTopBar';
import { Hero } from '../components/sections/Hero';
import { HeroCinematicOverlay } from '../components/sections/HeroCinematicOverlay';
import { HeroSplitLayout } from '../components/sections/HeroSplitLayout';
import { HeroCenteredWithStats } from '../components/sections/HeroCenteredWithStats';
import { HeroWeather } from '../components/sections/HeroWeather';
import { StayTypeCards } from '../components/sections/StayTypeCards';
import { StayTypeCardsImageOverlay } from '../components/sections/StayTypeCardsImageOverlay';
import { StayTypeCardsStructured } from '../components/sections/StayTypeCardsStructured';
import { StayTypeCardsSpotlight } from '../components/sections/StayTypeCardsSpotlight';
import { GalleryGrid } from '../components/sections/GalleryGrid';
import { GalleryMasonry } from '../components/sections/GalleryMasonry';
import { GalleryUniformGrid } from '../components/sections/GalleryUniformGrid';
import { GalleryHorizontalScroll } from '../components/sections/GalleryHorizontalScroll';
import { Reviews } from '../components/sections/Reviews';
import { LocalAttractions } from '../components/sections/LocalAttractions';
import { FAQ } from '../components/sections/FAQ';
import { CTABanner } from '../components/sections/CTABanner';
import { CTAImageBackground } from '../components/sections/CTAImageBackground';
import { CTASolidBand } from '../components/sections/CTASolidBand';
import { CTASplitLayout } from '../components/sections/CTASplitLayout';
import { ContactSection } from '../components/sections/ContactSection';
import { RatesTeaserStrip } from '../components/sections/RatesTeaserStrip';
import { AmenitiesGrid } from '../components/sections/AmenitiesGrid';
import { SeasonalBenefits } from '../components/sections/SeasonalBenefits';
import { SeasonalBenefitsIconCards } from '../components/sections/SeasonalBenefitsIconCards';
import { SeasonalBenefitsAlternating } from '../components/sections/SeasonalBenefitsAlternating';
import { SeasonalBenefitsStats } from '../components/sections/SeasonalBenefitsStats';
import { OvernightExperienceHighlight } from '../components/sections/OvernightExperienceHighlight';
import { TrailersGrid } from '../components/sections/TrailersGrid';
import { TrailersCleanGrid } from '../components/sections/TrailersCleanGrid';
import { TrailersFeaturedGrid } from '../components/sections/TrailersFeaturedGrid';
import { TrailersHorizontalScroll } from '../components/sections/TrailersHorizontalScroll';

const componentMap: { [key: string]: React.ComponentType<any> } = {
  NavigationCentered,
  NavigationWithCTA,
  NavigationWithTopBar,
  Hero,
  HeroCinematicOverlay,
  HeroSplitLayout,
  HeroCenteredWithStats,
  HeroWeather,
  StayTypeCards,
  StayTypeCardsImageOverlay,
  StayTypeCardsStructured,
  StayTypeCardsSpotlight,
  RatesTeaserStrip,
  AmenitiesGrid,
  SeasonalBenefits,
  SeasonalBenefitsIconCards,
  SeasonalBenefitsAlternating,
  SeasonalBenefitsStats,
  OvernightExperienceHighlight,
  TrailersGrid,
  TrailersCleanGrid,
  TrailersFeaturedGrid,
  TrailersHorizontalScroll,
  GalleryGrid,
  GalleryMasonry,
  GalleryUniformGrid,
  GalleryHorizontalScroll,
  Reviews,
  LocalAttractions,
  FAQ,
  CTABanner,
  CTAImageBackground,
  CTASolidBand,
  CTASplitLayout,
  ContactSection,
};

interface PreviewData {
  sectionIds: string[];
  branding: {
    companyName: string;
    logoUrl?: string;
  };
  paletteColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  contactInfo: {
    parkName: string;
    contactName: string;
    email: string;
    phone?: string;
    website?: string;
    primaryModel: string;
    notes?: string;
  };
  timestamp: number;
}

export function LayoutPreview() {
  const { id } = useParams();
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (id) {
      // First, try to get data from URL parameter (works across all domains!)
      const urlParams = new URLSearchParams(window.location.search);
      const encodedData = urlParams.get('data');
      
      if (encodedData) {
        try {
          // Decode URL-safe base64 (reverse the encoding from LeadCapture)
          let base64 = encodedData.replace(/-/g, '+').replace(/_/g, '/');
          // Add padding if needed
          while (base64.length % 4) {
            base64 += '=';
          }
          const dataStr = atob(base64);
          const data = JSON.parse(dataStr);
          setPreviewData(data);
          console.log('✅ Preview data loaded from URL:', data);
          return;
        } catch (error) {
          console.error('❌ Failed to decode URL data:', error);
        }
      }
      
      // Fallback: try localStorage (for backwards compatibility)
      const stored = localStorage.getItem(`campsite_preview_${id}`);
      if (stored) {
        setPreviewData(JSON.parse(stored));
        console.log('✅ Preview data loaded from localStorage (fallback)');
      } else {
        console.error('❌ No preview data found in URL or localStorage');
        setNotFound(true);
      }
    }
  }, [id]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Preview Not Found</h1>
          <p className="text-gray-600 mb-6">
            This preview link may have expired or doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#2C3E50] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1a252f] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!previewData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#E8D5B5] border-t-[#2C3E50] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  const selectedSectionData = previewData.sectionIds
    .map(id => sections.find(s => s.id === id))
    .filter(Boolean) as typeof sections;

  const { branding, paletteColors, contactInfo } = previewData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#2C3E50] text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{contactInfo.parkName}</h1>
              <p className="text-[#E8D5B5] text-sm">Custom Website Layout Preview</p>
            </div>
            <Link
              to="/"
              className="bg-[#E8D5B5] text-[#2C3E50] px-4 py-2 rounded-lg font-semibold hover:bg-[#D4C5A5] transition-colors text-sm"
            >
              CampSite Solutions
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Contact Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Lead Submitted Successfully
              </h2>
              <p className="text-gray-600">
                This is the custom layout designed for {contactInfo.parkName}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 bg-gray-50 rounded-lg p-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Contact Name</p>
              <p className="font-semibold text-gray-900">{contactInfo.contactName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Email</p>
              <p className="font-semibold text-gray-900">{contactInfo.email}</p>
            </div>
            {contactInfo.phone && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Phone</p>
                <p className="font-semibold text-gray-900">{contactInfo.phone}</p>
              </div>
            )}
            {contactInfo.website && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Website</p>
                <p className="font-semibold text-gray-900">{contactInfo.website}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600 mb-1">Business Model</p>
              <p className="font-semibold text-gray-900 capitalize">{contactInfo.primaryModel}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Sections Selected</p>
              <p className="font-semibold text-gray-900">{selectedSectionData.length} sections</p>
            </div>
          </div>

          {contactInfo.notes && (
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-2">Additional Notes</p>
              <p className="text-gray-900 bg-gray-50 rounded-lg p-4 whitespace-pre-wrap">
                {contactInfo.notes}
              </p>
            </div>
          )}
        </div>

        {/* Layout Preview */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          {/* Branding Header */}
          <div 
            className="py-8 px-8 text-center text-white"
            style={{ backgroundColor: paletteColors.primary }}
          >
            <h2 className="text-2xl font-bold mb-2">
              Visual Preview
            </h2>
            <p className="text-white/80">Scroll to see your custom layout design</p>
          </div>
        </div>

        {/* Actual Rendered Sections */}
        <div className="space-y-0 border border-gray-200 rounded-xl overflow-hidden shadow-lg">
          {selectedSectionData.map((section) => {
            const Component = componentMap[section.component];
            if (!Component) return null;
            
            return (
              <div key={section.id} className="relative">
                {/* Section Label */}
                <div className="absolute top-4 left-4 z-10 bg-black/70 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  {section.name}
                </div>
                {/* Render the actual component */}
                <Component />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Ready to bring this vision to life?
          </p>
          <Link
            to="/"
            className="inline-block bg-[#2C3E50] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#1a252f] transition-colors"
          >
            Explore More Templates
          </Link>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Preview generated on {new Date(previewData.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}