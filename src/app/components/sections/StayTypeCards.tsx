import { Calendar, Home, Tent, ArrowRight } from 'lucide-react';
import { useColorPalette } from '../../hooks/useColorPalette';
import { useWizard, getAllowedModels } from '../../context/WizardContext';
import { sanitizeCopy } from '../../utils/copySanitizer';
import { Button } from '../ui/button';

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

  // Dynamic grid classes based on number of cards
  const getGridClass = () => {
    if (stayTypes.length === 1) return 'grid-cols-1 max-w-md mx-auto';
    if (stayTypes.length === 2) return 'md:grid-cols-2 max-w-4xl mx-auto';
    return 'md:grid-cols-3';
  };

  return (
    <section className="py-[88px] bg-[var(--background-muted)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {/* H2: 36px from theme */}
          <h2 className="mb-4">{getSectionTitle()}</h2>
          {/* Body: 18px from theme */}
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            {getSectionSubtitle()}
          </p>
        </div>

        <div className={`grid gap-6 ${getGridClass()}`}>
          {stayTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div
                key={type.title}
                className="bg-white rounded-lg p-8 shadow-[0_8px_24px_0_rgb(0_0_0/0.1)] hover:shadow-[0_12px_32px_0_rgb(0_0_0/0.15)] transition-shadow border border-gray-100"
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${palette.colors.accent}33` }}
                >
                  <Icon className="w-8 h-8" style={{ color: palette.colors.primary }} />
                </div>
                {/* H3: 24px from theme */}
                <h3 className="mb-3">{type.title}</h3>
                {/* Body: 18px from theme */}
                <p className="text-[var(--text-secondary)] mb-6">{type.description}</p>
                <Button 
                  variant="ds-secondary"
                  className="w-full justify-center"
                  href="#rates"
                >
                  {type.cta}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}