import { Header } from '../components/layout/Header';
import { Footer } from '../components/sections/Footer';
import { useSections } from '../context/SectionContext';
import { useWizard } from '../context/WizardContext';
import { sections } from '../data/sections';
import { ChevronUp, ChevronDown, X, ArrowRight, AlertCircle, Edit, Building2, Palette, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router';
import { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { EditSectionModal } from '../components/modals/EditSectionModal';
import { BrandingModal } from '../components/modals/BrandingModal';
import { getColorPalette } from '../data/colorPalettes';
import { DraggableSectionCard } from '../components/layout/DraggableSectionCard';

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
import { TrailerSalesHighlight } from '../components/sections/TrailerSalesHighlight';
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
  TrailerSalesHighlight,
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

export function MyLayout() {
  const { selectedSections, removeSection, moveSectionUp, moveSectionDown, reorderSections, updateCustomization, getCustomization, branding, updateBranding, setWizardGoal, setCampgroundName } = useSections();
  const { wizardData } = useWizard();
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [showBrandingModal, setShowBrandingModal] = useState(false);
  const [isControlsOpen, setIsControlsOpen] = useState(true);

  // Sync wizard data to section context
  useEffect(() => {
    if (wizardData.isCompleted) {
      setWizardGoal(wizardData.primaryGoal);
      setCampgroundName(wizardData.campgroundName);
    }
  }, [wizardData.isCompleted, wizardData.primaryGoal, wizardData.campgroundName, setWizardGoal, setCampgroundName]);

  const selectedSectionData = selectedSections
    .map(id => sections.find(s => s.id === id))
    .filter(Boolean) as typeof sections;

  const selectedPalette = branding.colorPaletteId ? getColorPalette(branding.colorPaletteId) : null;
  const hasBranding = branding.companyName || branding.logoUrl || branding.colorPaletteId;

  const handleSaveAndClose = () => {
    setIsControlsOpen(false);
    // The sections are already saved in localStorage via context, so we just close
  };

  const moveCard = useCallback((fromIndex: number, toIndex: number) => {
    reorderSections(fromIndex, toIndex);
  }, [reorderSections]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {selectedSections.length === 0 ? (
        <main className="flex-grow flex items-center justify-center bg-gray-50">
          <div className="text-center px-4 max-w-lg">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">No Sections Selected</h1>
            <p className="text-xl text-gray-600 mb-8">
              Head to the Section Library to start building your custom layout.
            </p>
            <Link
              to="/library"
              className="inline-flex items-center gap-2 bg-[#E8D5B5] hover:bg-[#D4C5A5] text-[#2C3E50] px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Browse Section Library
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </main>
      ) : (
        <>
          {/* Controls Section */}
          <section className="bg-white border-b border-gray-200 py-6 sticky top-16 z-40 shadow-sm">
            <div className="container mx-auto px-4">
              <div className="flex flex-col gap-4">
                {/* Top Row: Title and Generate Button */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-1">My Custom Layout</h1>
                    <p className="text-gray-600">
                      {selectedSections.length} section{selectedSections.length !== 1 ? 's' : ''} • Reorder or remove sections below
                    </p>
                  </div>
                  <Link
                    to="/lead"
                    className="bg-[#E8D5B5] hover:bg-[#D4C5A5] text-[#2C3E50] px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                  >
                    Generate My Plan
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
                
                {/* Branding Button */}
                <button
                  onClick={() => setShowBrandingModal(true)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-lg font-semibold text-base transition-all border-2 ${
                    hasBranding
                      ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
                      : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-300'
                  }`}
                >
                  <Building2 className="w-5 h-5" />
                  <div className="text-left flex-1">
                    <div className="font-bold flex items-center gap-2">
                      {hasBranding ? '✓ Campground Branding Set' : 'Set Campground Branding'}
                      {selectedPalette && (
                        <div className="flex gap-1 ml-2">
                          <div className="w-4 h-4 rounded-full border border-white/30" style={{ backgroundColor: selectedPalette.colors.primary }} />
                          <div className="w-4 h-4 rounded-full border border-white/30" style={{ backgroundColor: selectedPalette.colors.accent }} />
                        </div>
                      )}
                    </div>
                    <div className={`text-sm ${hasBranding ? 'text-blue-100' : 'text-blue-600'}`}>
                      {branding.companyName ? `${branding.companyName}${selectedPalette ? ` • ${selectedPalette.name}` : ''}` : 'Set logo, name & color palette'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedPalette && <Palette className="w-5 h-5" />}
                    <Edit className="w-5 h-5" />
                  </div>
                </button>
              </div>
            </div>
          </section>

          {/* Section Management - Collapsible */}
          <aside className="bg-gray-50 border-b border-gray-200">
            <div className="container mx-auto px-4 py-4">
              <button
                onClick={() => setIsControlsOpen(!isControlsOpen)}
                className="w-full flex items-center justify-between mb-2 text-left hover:text-emerald-700 transition-colors"
              >
                <h2 className="font-bold text-lg">Section Order & Controls</h2>
                <div className="flex items-center gap-3">
                  {!isControlsOpen && (
                    <span className="text-sm text-gray-500">
                      {selectedSections.length} section{selectedSections.length !== 1 ? 's' : ''}
                    </span>
                  )}
                  <ChevronDown className={`w-5 h-5 transition-transform ${isControlsOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>
              
              {isControlsOpen && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-600">
                      💡 <strong className="text-[#2C3E50]">Drag cards</strong> to reorder • Use <strong className="text-[#2C3E50]">Edit</strong> to customize
                    </div>
                    <button
                      onClick={handleSaveAndClose}
                      className="bg-[#E8D5B5] hover:bg-[#D4C5A5] text-[#2C3E50] px-4 py-2 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
                    >
                      <span>Save & Close</span>
                      <ChevronUp className="w-4 h-4" />
                    </button>
                  </div>
                  <DndProvider backend={HTML5Backend}>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {selectedSectionData.map((section, index) => {
                        const customization = getCustomization(section.id);
                        const hasCustomization = Object.keys(customization).length > 0;
                        
                        return (
                          <DraggableSectionCard
                            key={section.id}
                            section={section}
                            index={index}
                            onDragEnd={moveCard}
                            onMoveUp={() => moveSectionUp(section.id)}
                            onMoveDown={() => moveSectionDown(section.id)}
                            onRemove={() => removeSection(section.id)}
                            onEdit={() => setEditingSectionId(section.id)}
                            hasCustomization={hasCustomization}
                            isLast={index === selectedSectionData.length - 1}
                          />
                        );
                      })}
                    </div>
                  </DndProvider>
                </>
              )}
            </div>
          </aside>

          {/* Preview */}
          <main className="flex-grow">
            <div className="bg-gray-100 py-8">
              <div className="container mx-auto px-4 mb-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-900">
                    <strong>Preview Mode:</strong> This is how your selected sections will appear on your website. 
                    Use the controls above to reorder, edit, or remove sections. <strong className="text-emerald-700">Click the Edit button to customize text and images!</strong>
                  </p>
                </div>
              </div>
            </div>

            {selectedSectionData.map(section => {
              const Component = componentMap[section.component];
              if (!Component) return null;
              const customization = getCustomization(section.id);
              return (
                <div key={`${section.id}-${selectedSections.indexOf(section.id)}`} className="relative group">
                  <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    {section.name}
                  </div>
                  <Component key={section.id} customization={customization} />
                </div>
              );
            })}
          </main>
        </>
      )}

      <Footer />
      
      {editingSectionId && (() => {
        const editingSection = sections.find(s => s.id === editingSectionId);
        return editingSection ? (
          <EditSectionModal
            sectionId={editingSectionId}
            sectionName={editingSection.name}
            currentCustomization={getCustomization(editingSectionId)}
            onSave={(data) => updateCustomization(editingSectionId, data)}
            onClose={() => setEditingSectionId(null)}
          />
        ) : null;
      })()}

      {showBrandingModal && (
        <BrandingModal
          currentBranding={branding}
          onSave={(data) => updateBranding(data)}
          onClose={() => setShowBrandingModal(false)}
        />
      )}
    </div>
  );
}