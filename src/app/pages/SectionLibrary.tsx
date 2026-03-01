import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/sections/Footer';
import { sections } from '../data/sections';
import { useSections } from '../context/SectionContext';
import { Plus, Check, Filter, X, Building2, Palette, Edit, Eye, Sparkles, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router';
import { BrandingModal } from '../components/modals/BrandingModal';
import { SectionPreviewModal } from '../components/modals/SectionPreviewModal';
import { getColorPalette } from '../data/colorPalettes';
import { SectionConfig } from '../data/sections';
import { useWizard } from '../context/WizardContext';
import { getRecommendedStack, shouldHideByDefault } from '../data/recommendationMapping';

export function SectionLibrary() {
  const { addSection, removeSection, isSelected, selectedSections, branding, updateBranding, setWizardGoal, setCampgroundName } = useSections();
  const { wizardData } = useWizard();
  
  const [businessFilter, setBusinessFilter] = useState<string[]>([]);
  const [goalFilter, setGoalFilter] = useState<string[]>([]);
  const [showBrandingModal, setShowBrandingModal] = useState(false);
  const [previewSection, setPreviewSection] = useState<SectionConfig | null>(null);
  const [showOnlyRecommended, setShowOnlyRecommended] = useState(wizardData.isCompleted);
  const [showAllSections, setShowAllSections] = useState(false);
  const [showRecommendationPanel, setShowRecommendationPanel] = useState(true);

  // Sync wizard data to section context
  useEffect(() => {
    if (wizardData.isCompleted) {
      setWizardGoal(wizardData.primaryGoal);
      setCampgroundName(wizardData.campgroundName);
    }
  }, [wizardData.isCompleted, wizardData.primaryGoal, wizardData.campgroundName, setWizardGoal, setCampgroundName]);

  // Auto-preselect recommended sections when wizard is completed (only once)
  useEffect(() => {
    if (wizardData.isCompleted && validRecommendedSectionIds.length > 0) {
      // Create a key based on business model and goal to track if we've preselected for this combination
      const preselectionKey = `${wizardData.primaryBusinessModel}-${wizardData.primaryGoal}`;
      const hasPreselected = localStorage.getItem('recommendedPreselected');
      
      // Only preselect if we haven't already done it for this specific combination
      if (hasPreselected !== preselectionKey) {
        // Clear existing selections before adding new recommended ones
        // This ensures the user gets a fresh recommended stack if they change their wizard answers
        
        // Add all recommended sections
        validRecommendedSectionIds.forEach(id => {
          if (!isSelected(id)) {
            addSection(id);
          }
        });
        
        // Mark as preselected with the specific combination
        localStorage.setItem('recommendedPreselected', preselectionKey);
      }
    }
  }, [wizardData.isCompleted, wizardData.primaryBusinessModel, wizardData.primaryGoal]);

  // Get recommended sections using predefined mapping
  const recommendedSectionIds = getRecommendedStack(
    wizardData.primaryBusinessModel,
    wizardData.primaryGoal,
    wizardData // Pass full wizard data for intelligent analysis
  );

  // Filter out any section IDs that don't exist in the library
  const validRecommendedSectionIds = recommendedSectionIds.filter(id => 
    sections.some(section => section.id === id)
  );

  // Check if a section is compatible with wizard selections
  const isSectionCompatible = (section: SectionConfig): boolean => {
    if (!wizardData.isCompleted) return true;

    const { primaryBusinessModel, primaryGoal } = wizardData;

    // Check business model compatibility
    const businessModelMatch = section.tags.businessModel.includes(
      primaryBusinessModel === 'seasonal' ? 'seasonal' :
      primaryBusinessModel === 'overnight' ? 'overnight' :
      primaryBusinessModel === 'trailer-sales' ? 'trailers' :
      primaryBusinessModel === 'cottage-rentals' ? 'cottages' : 'seasonal'
    );

    // Check goal compatibility
    const goalMatch = section.tags.goal.includes(
      primaryGoal === 'bookings' ? 'bookings' :
      primaryGoal === 'inquiries' ? 'inquiries' :
      primaryGoal === 'trailer-leads' ? 'trailer-leads' : 'bookings'
    );

    // Section is compatible if it matches either business model OR goal
    // (We use OR because some sections work across models but are specific to goals)
    return businessModelMatch || goalMatch;
  };

  // Get CTA text based on goal
  const getCtaText = (): { primary: string; secondary: string } => {
    if (!wizardData.isCompleted) {
      return { primary: 'Book Now', secondary: 'Learn More' };
    }

    switch (wizardData.primaryGoal) {
      case 'bookings':
        return { primary: 'Book Now', secondary: 'Check Availability' };
      case 'inquiries':
        return { primary: 'Request Info', secondary: 'Contact Us' };
      case 'trailer-leads':
        return { primary: 'View Inventory', secondary: 'Request Pricing' };
      default:
        return { primary: 'Book Now', secondary: 'Learn More' };
    }
  };

  const ctaText = getCtaText();

  const toggleBusinessFilter = (value: string) => {
    setBusinessFilter(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const toggleGoalFilter = (value: string) => {
    setGoalFilter(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const clearFilters = () => {
    setBusinessFilter([]);
    setGoalFilter([]);
  };

  const filteredSections = sections.filter(section => {
    // Apply visibility filtering based on business model (unless "Show All" is toggled)
    if (wizardData.isCompleted && !showAllSections) {
      if (shouldHideByDefault(section.id, wizardData.primaryBusinessModel)) {
        return false;
      }
    }

    // Filter by recommended if toggle is on
    if (showOnlyRecommended && validRecommendedSectionIds.length > 0) {
      if (!validRecommendedSectionIds.includes(section.id)) {
        return false;
      }
    }
    
    if (businessFilter.length > 0) {
      if (!section.tags.businessModel.some(m => businessFilter.includes(m))) {
        return false;
      }
    }
    if (goalFilter.length > 0) {
      if (!section.tags.goal.some(g => goalFilter.includes(g))) {
        return false;
      }
    }
    return true;
  });

  // Sort sections within each category to show recommended first
  const sortSectionsByRecommendation = (sectionsArray: SectionConfig[]): SectionConfig[] => {
    return [...sectionsArray].sort((a, b) => {
      const aRecommended = validRecommendedSectionIds.includes(a.id);
      const bRecommended = validRecommendedSectionIds.includes(b.id);
      
      if (aRecommended && !bRecommended) return -1;
      if (!aRecommended && bRecommended) return 1;
      return 0;
    });
  };

  // Group sections by category
  const sectionCategories = [
    {
      name: 'Navigation',
      icon: '🧭',
      sections: sortSectionsByRecommendation(filteredSections.filter(s => s.id.startsWith('nav-')))
    },
    {
      name: 'Hero Sections',
      icon: '🌄',
      sections: sortSectionsByRecommendation(filteredSections.filter(s => s.id.startsWith('hero')))
    },
    {
      name: 'Stay Types',
      icon: '🏕️',
      sections: sortSectionsByRecommendation(filteredSections.filter(s => s.id.startsWith('stay-type')))
    },
    {
      name: 'Rates & Amenities',
      icon: '⭐',
      sections: sortSectionsByRecommendation(filteredSections.filter(s => s.id === 'rates-teaser-strip' || s.id === 'amenities-grid'))
    },
    {
      name: 'Seasonal Benefits',
      icon: '🌲',
      sections: sortSectionsByRecommendation(filteredSections.filter(s => s.id.startsWith('seasonal-benefits')))
    },
    {
      name: 'Trailers for Sale',
      icon: '🚐',
      sections: sortSectionsByRecommendation(filteredSections.filter(s => s.id.startsWith('trailers-')))
    },
    {
      name: 'Photo Galleries',
      icon: '📸',
      sections: sortSectionsByRecommendation(filteredSections.filter(s => s.id.startsWith('gallery-')))
    },
    {
      name: 'Social Proof & Info',
      icon: '💬',
      sections: sortSectionsByRecommendation(filteredSections.filter(s => ['reviews', 'local-attractions', 'faq'].includes(s.id)))
    },
    {
      name: 'Call-to-Action',
      icon: '🎯',
      sections: sortSectionsByRecommendation(filteredSections.filter(s => s.id.startsWith('cta-')))
    },
    {
      name: 'Contact',
      icon: '📧',
      sections: sortSectionsByRecommendation(filteredSections.filter(s => s.id === 'contact-section'))
    },
  ].filter(category => category.sections.length > 0); // Only show categories with sections

  const selectedPalette = branding.colorPaletteId ? getColorPalette(branding.colorPaletteId) : null;
  const hasBranding = branding.companyName || branding.logoUrl || branding.colorPaletteId;

  // Get business model display name
  const getBusinessModelName = () => {
    switch (wizardData.primaryBusinessModel) {
      case 'seasonal': return 'Seasonal Sites';
      case 'overnight': return 'Overnight Camping';
      case 'trailer-sales': return 'Trailer Sales';
      case 'cottage-rentals': return 'Cottage Rentals';
      default: return '';
    }
  };

  // Get goal display name
  const getGoalName = () => {
    switch (wizardData.primaryGoal) {
      case 'bookings': return 'Bookings';
      case 'inquiries': return 'Inquiries';
      case 'trailer-leads': return 'Trailer Leads';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Header */}
        <section className="bg-white border-b border-gray-200 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {wizardData.isCompleted && wizardData.campgroundName 
                    ? `Build ${wizardData.campgroundName}'s Homepage`
                    : 'Section Library'
                  }
                </h1>
                <p className="text-gray-600">
                  {wizardData.isCompleted 
                    ? `Personalized recommendations for ${wizardData.campgroundName}. ${selectedSections.length} section${selectedSections.length !== 1 ? 's' : ''} selected.`
                    : `Browse and select sections to build your custom layout. ${selectedSections.length} section${selectedSections.length !== 1 ? 's' : ''} selected.`
                  }
                </p>
              </div>
              {selectedSections.length > 0 && (
                <div className="flex gap-3">
                  <Link
                    to="/strategy-summary"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                  >
                    View Strategy Summary
                  </Link>
                  <Link
                    to="/my-layout"
                    className="bg-[#E8D5B5] hover:bg-[#D4C5A5] text-[#2C3E50] px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                  >
                    View My Layout
                    <span className="bg-[#2C3E50] text-[#E8D5B5] text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {selectedSections.length}
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Recommended Stack Panel */}
        {wizardData.isCompleted && validRecommendedSectionIds.length > 0 && (
          <section className="bg-white border-b border-gray-200 py-8">
            <div className="container mx-auto px-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Recommended for {wizardData.campgroundName}</h2>
                  <p className="text-gray-600 mb-4">
                    Based on your {getBusinessModelName()} business model and {getGoalName()} goal, 
                    we've selected {validRecommendedSectionIds.length} sections that will maximize your conversion rate.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <button
                      onClick={() => {
                        console.log('🚀 Add All Recommended button clicked!');
                        console.log('📋 validRecommendedSectionIds:', validRecommendedSectionIds);
                        console.log('📋 Number of recommendations:', validRecommendedSectionIds.length);
                        console.log('📋 Currently selected sections:', selectedSections);
                        
                        let addedCount = 0;
                        let skippedCount = 0;
                        
                        // Add all recommended sections
                        validRecommendedSectionIds.forEach(id => {
                          if (!isSelected(id)) {
                            console.log(`  ✅ Adding section: ${id}`);
                            addSection(id);
                            addedCount++;
                          } else {
                            console.log(`  ⏭️  Skipping (already selected): ${id}`);
                            skippedCount++;
                          }
                        });
                        
                        console.log(`✅ Added ${addedCount} sections`);
                        console.log(`⏭️  Skipped ${skippedCount} sections (already selected)`);
                        console.log('📋 Selected sections after adding:', selectedSections);
                      }}
                      className="px-6 py-3 bg-[#E8D5B5] text-[#2C3E50] hover:bg-[#D4C5A5] rounded-lg font-semibold transition-colors"
                    >
                      Add All Recommended ({validRecommendedSectionIds.length})
                    </button>
                    <button
                      onClick={() => setShowOnlyRecommended(!showOnlyRecommended)}
                      className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                        showOnlyRecommended 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {showOnlyRecommended ? 'Show All Sections' : 'Show Only Recommended'}
                    </button>
                  </div>

                  {/* Why These Recommendations Panel */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <button
                      onClick={() => setShowRecommendationPanel(!showRecommendationPanel)}
                      className="flex items-center justify-between w-full text-gray-900 font-semibold mb-2"
                    >
                      <span className="flex items-center gap-2">
                        <Info className="w-5 h-5 text-blue-600" />
                        Why these recommendations?
                      </span>
                      {showRecommendationPanel ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                    
                    {showRecommendationPanel && (
                      <div className="text-gray-700 space-y-3 pt-2">
                        {wizardData.primaryBusinessModel === 'seasonal' && (
                          <p><strong className="text-gray-900">Seasonal Sites:</strong> We've selected hero sections that highlight lifestyle benefits and community, plus sections showcasing seasonal perks like storage and year-round amenities.</p>
                        )}
                        {wizardData.primaryBusinessModel === 'overnight' && (
                          <p><strong className="text-gray-900">Overnight Camping:</strong> Your recommendations focus on quick booking flows, stay type comparisons, and availability-focused CTAs to capture spontaneous travelers.</p>
                        )}
                        {wizardData.primaryBusinessModel === 'trailer-sales' && (
                          <p><strong className="text-gray-900">Trailer Sales:</strong> We've prioritized inventory showcase sections, search functionality, and lead capture CTAs optimized for browsing and inquiries.</p>
                        )}
                        {wizardData.primaryBusinessModel === 'cottage-rentals' && (
                          <p><strong className="text-gray-900">Cottage Rentals:</strong> Your sections emphasize property showcases, booking availability, and family-friendly amenities to attract vacation renters.</p>
                        )}

                        {wizardData.primaryGoal === 'bookings' && (
                          <div className="bg-blue-50 rounded p-3 mt-2 border border-blue-200">
                            <p className="mb-1"><strong className="text-gray-900">Bookings Goal:</strong> All CTAs are optimized with booking-focused messaging to drive immediate reservations.</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="bg-white text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">"{ctaText.primary}"</span>
                              <span className="bg-white text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">"{ctaText.secondary}"</span>
                            </div>
                          </div>
                        )}
                        {wizardData.primaryGoal === 'inquiries' && (
                          <div className="bg-emerald-50 rounded p-3 mt-2 border border-emerald-200">
                            <p className="mb-1"><strong className="text-gray-900">Inquiries Goal:</strong> CTAs are set to encourage visitors to reach out with questions and request more information.</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="bg-white text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">"{ctaText.primary}"</span>
                              <span className="bg-white text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">"{ctaText.secondary}"</span>
                            </div>
                          </div>
                        )}
                        {wizardData.primaryGoal === 'trailer-leads' && (
                          <div className="bg-amber-50 rounded p-3 mt-2 border border-amber-200">
                            <p className="mb-1"><strong className="text-gray-900">Trailer Leads Goal:</strong> CTAs use sales-oriented messaging to generate qualified leads and schedule tours.</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="bg-white text-amber-700 px-3 py-1 rounded-full text-xs font-bold border border-amber-200">"{ctaText.primary}"</span>
                              <span className="bg-white text-amber-700 px-3 py-1 rounded-full text-xs font-bold border border-amber-200">"{ctaText.secondary}"</span>
                            </div>
                          </div>
                        )}

                        <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
                          💡 You can add, remove, or reorder any section in the custom layout builder.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Filters */}
        <section className="bg-white border-b border-gray-200 py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-4 h-4 text-gray-600" />
                  <span className="font-semibold text-sm">Business Model:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['seasonal', 'overnight', 'trailers', 'cottages'].map(model => (
                    <button
                      key={model}
                      onClick={() => toggleBusinessFilter(model)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        businessFilter.includes(model)
                          ? 'bg-[#E8D5B5] text-[#2C3E50]'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {model.charAt(0).toUpperCase() + model.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-4 h-4 text-gray-600" />
                  <span className="font-semibold text-sm">Goal:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'bookings', label: 'Bookings' },
                    { value: 'inquiries', label: 'Inquiries' },
                    { value: 'trailer-leads', label: 'Trailer Leads' },
                  ].map(goal => (
                    <button
                      key={goal.value}
                      onClick={() => toggleGoalFilter(goal.value)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        goalFilter.includes(goal.value)
                          ? 'bg-[#E8D5B5] text-[#2C3E50]'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {goal.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-end">
                {wizardData.isCompleted && (
                  <button
                    onClick={() => setShowAllSections(!showAllSections)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      showAllSections
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {showAllSections ? 'Hide Irrelevant' : 'Show All Sections'}
                  </button>
                )}
                {(businessFilter.length > 0 || goalFilter.length > 0) && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Branding */}
        <section className="bg-white border-b border-gray-200 py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Branding & Color Palettes
                </h2>
                <p className="text-gray-600">
                  {hasBranding 
                    ? `${branding.companyName || 'Custom branding set'}${selectedPalette ? ` • ${selectedPalette.name}` : ''}`
                    : 'Customize your layout with a brand name, logo, and color palette.'
                  }
                </p>
              </div>
              <button
                onClick={() => setShowBrandingModal(true)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2 ${
                  hasBranding
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-[#E8D5B5] hover:bg-[#D4C5A5] text-[#2C3E50]'
                }`}
              >
                <Edit className="w-4 h-4" />
                {hasBranding ? 'Edit Branding' : 'Set Up Branding'}
              </button>
            </div>
          </div>
        </section>

        {/* Branding Modal */}
        {showBrandingModal && (
          <BrandingModal
            currentBranding={branding}
            onSave={(data) => updateBranding(data)}
            onClose={() => setShowBrandingModal(false)}
          />
        )}

        {/* Sections Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredSections.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-500">No sections match your filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-emerald-700 font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="space-y-12">
                {sectionCategories.map((category, idx) => (
                  <div key={idx}>
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-3xl">{category.icon}</span>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                        <p className="text-sm text-gray-600">{category.sections.length} section{category.sections.length !== 1 ? 's' : ''} available</p>
                      </div>
                    </div>

                    {/* Category Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.sections.map(section => {
                        const selected = isSelected(section.id);
                        const isRecommended = validRecommendedSectionIds.includes(section.id);
                        return (
                          <div
                            key={section.id}
                            className={`bg-white rounded-xl p-6 border-2 transition-all relative ${
                              selected
                                ? 'border-[#E8D5B5] shadow-lg'
                                : 'border-gray-200 hover:border-[#E8D5B5] shadow-sm hover:shadow-md'
                            }`}
                          >
                            {/* Recommended Badge */}
                            {isRecommended && (
                              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                                <Sparkles className="w-3 h-3" />
                                Recommended
                              </div>
                            )}
                            
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="font-bold text-lg flex-1">{section.name}</h3>
                              {selected && (
                                <div className="w-6 h-6 bg-[#E8D5B5] rounded-full flex items-center justify-center">
                                  <Check className="w-4 h-4 text-[#2C3E50]" />
                                </div>
                              )}
                            </div>
                            <p className="text-gray-600 mb-4">{section.description}</p>
                            <div className="flex flex-wrap gap-1 mb-4">
                              {section.tags.businessModel.slice(0, 2).map(tag => (
                                <span
                                  key={tag}
                                  className="bg-[#E8D5B5]/20 text-[#2C3E50] px-2 py-1 rounded text-xs font-medium"
                                >
                                  {tag}
                                </span>
                              ))}
                              {section.tags.businessModel.length > 2 && (
                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                                  +{section.tags.businessModel.length - 2}
                                </span>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setPreviewSection(section)}
                                className="flex-1 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200"
                              >
                                <Eye className="w-4 h-4" />
                                Preview
                              </button>
                              <button
                                onClick={() => selected ? removeSection(section.id) : addSection(section.id)}
                                className={`flex-1 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                                  selected
                                    ? 'bg-[#E8D5B5]/30 text-[#2C3E50] hover:bg-[#E8D5B5]/40 border border-[#E8D5B5]'
                                    : 'bg-[#E8D5B5] text-[#2C3E50] hover:bg-[#D4C5A5]'
                                }`}
                              >
                                {selected ? (
                                  <>
                                    <Check className="w-4 h-4" />
                                    Added
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-4 h-4" />
                                    Add
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Preview Modal */}
      {previewSection && (
        <SectionPreviewModal
          section={previewSection}
          onClose={() => setPreviewSection(null)}
        />
      )}
    </div>
  );
}