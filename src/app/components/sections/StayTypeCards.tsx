import { Calendar, Home, Tent, ArrowRight } from 'lucide-react';
import { useColorPalette } from '../../hooks/useColorPalette';
import { useWizard, getAllowedModels } from '../../context/WizardContext';
import { sanitizeCopy } from '../../utils/copySanitizer';

export function StayTypeCards() {
  const palette = useColorPalette();
  const { wizardData } = useWizard();
  
  // Compute allowed models using helper
  const allowedModels = getAllowedModels(wizardData);
  
  // Define all stay types
  const allStayTypes = [
    {
      model: 'overnight',
      icon: Tent,
      title: 'Overnight Camping',
      description: 'Perfect for weekend getaways and short trips. Full hookups available.',
      cta: 'Book Overnight',
    },
    {
      model: 'seasonal',
      icon: Calendar,
      title: 'Seasonal Sites',
      description: 'Make us your home for the season. May through October availability.',
      cta: 'View Seasonal',
    },
    {
      model: 'cottage-rentals',
      icon: Home,
      title: 'Cottage Rentals',
      description: 'Fully equipped cottages with all the comforts of home.',
      cta: 'Explore Cottages',
    },
  ];
  
  // Filter to only show allowed models
  const stayTypes = allStayTypes.filter(type => allowedModels.has(type.model));
  
  // If no models selected or empty, return null
  if (stayTypes.length === 0) {
    return null;
  }
  
  // Get section title based on what's selected
  const getSectionTitle = () => {
    if (stayTypes.length === 1) {
      if (allowedModels.has('seasonal')) return 'Seasonal Site Options';
      if (allowedModels.has('overnight')) return 'Camping Options';
      if (allowedModels.has('cottage-rentals')) return 'Cottage Options';
    }
    return 'Choose Your Stay';
  };
  
  const getSectionSubtitle = () => {
    if (stayTypes.length === 1) {
      if (allowedModels.has('seasonal')) {
        return 'Find the perfect seasonal site for your summer home away from home.';
      }
      if (allowedModels.has('overnight')) {
        return 'Whether it\'s a quick getaway or a week-long adventure, we have the perfect site for you.';
      }
      if (allowedModels.has('cottage-rentals')) {
        return 'Experience the comfort of home with the beauty of nature.';
      }
    }
    return 'Whether it\'s a quick getaway or a full season, we have the perfect option for you.';
  };

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{getSectionTitle()}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {getSectionSubtitle()}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {stayTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div
                key={type.title}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${palette.colors.accent}33` }}
                >
                  <Icon className="w-8 h-8" style={{ color: palette.colors.primary }} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{type.title}</h3>
                <p className="text-gray-600 mb-6">{type.description}</p>
                <button 
                  className="font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                  style={{ color: palette.colors.primary }}
                >
                  {type.cta}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}