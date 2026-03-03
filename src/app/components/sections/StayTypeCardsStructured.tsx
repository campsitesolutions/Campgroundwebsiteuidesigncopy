import { Calendar, Home, Tent, ArrowRight } from 'lucide-react';
import { useColorPalette } from '../../hooks/useColorPalette';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useWizard, getAllowedModels } from '../../context/WizardContext';
import { Button } from '../ui/button';

interface StayType {
  model: string;
  icon: typeof Tent;
  title: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  imageUrl: string;
}

interface StayTypeCardsStructuredProps {
  headline?: string;
  subheadline?: string;
  stayTypes?: StayType[];
}

export function StayTypeCardsStructured(props: StayTypeCardsStructuredProps) {
  const palette = useColorPalette();
  const { wizardData } = useWizard();
  
  // Compute allowed models using helper
  const allowedModels = getAllowedModels(wizardData);
  
  const defaultStayTypes: StayType[] = [
    {
      model: 'overnight',
      icon: Tent,
      title: 'Overnight Camping',
      description: 'Perfect for weekend getaways and short trips with full hookups and modern amenities.',
      features: ['Full Hookups', 'Pull-Through Sites', 'WiFi Access'],
      cta: 'Book Overnight',
      href: '#rates',
      imageUrl: 'https://images.unsplash.com/photo-1605620622858-ea62b0a2059c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    },
    {
      model: 'seasonal',
      icon: Calendar,
      title: 'Seasonal Sites',
      description: 'Make us your home for the season with premium amenities and a vibrant community.',
      features: ['May - October', 'Premium Amenities', 'Storage Available'],
      cta: 'View Seasonal',
      href: '#rates',
      imageUrl: 'https://images.unsplash.com/photo-1588100249910-3bbdd5cec019?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    },
    {
      model: 'cottage-rentals',
      icon: Home,
      title: 'Cottage Rentals',
      description: 'Fully equipped cottages with all the comforts of home for the ultimate camping experience.',
      features: ['Full Kitchen', 'Private Deck', 'AC & Heating'],
      cta: 'Explore Cottages',
      href: '#contact',
      imageUrl: 'https://images.unsplash.com/photo-1625926144749-11eef44b0cdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    },
  ];
  
  // Filter to only show allowed models
  const stayTypes = (props.stayTypes || defaultStayTypes).filter(type => allowedModels.has(type.model));
  
  // If no models, return null
  if (stayTypes.length === 0) {
    return null;
  }
  
  // Get title based on selection
  const getTitle = () => {
    if (stayTypes.length === 1) {
      if (allowedModels.has('seasonal')) return 'Seasonal Site Options';
      if (allowedModels.has('overnight')) return 'Camping Options';
      if (allowedModels.has('cottage-rentals')) return 'Cottage Options';
    }
    return 'Choose Your Stay';
  };
  
  const headline = props.headline || getTitle();
  const subheadline = props.subheadline || 'Whether it\'s a quick getaway or a full season, we have the perfect option for you.';

  // Dynamic grid classes based on number of cards
  const getGridClass = () => {
    if (stayTypes.length === 1) return 'grid-cols-1 max-w-md mx-auto';
    if (stayTypes.length === 2) return 'md:grid-cols-2 max-w-4xl mx-auto';
    return 'md:grid-cols-3';
  };

  return (
    <section className="py-[88px] bg-gradient-to-b from-white to-[var(--background-muted)]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          {/* H2: 36px from theme */}
          <h2 className="mb-4">{headline}</h2>
          {/* Body: 18px from theme */}
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            {subheadline}
          </p>
        </div>

        {/* Cards Grid - Responsive to card count */}
        <div className={`grid gap-6 ${getGridClass()}`}>
          {stayTypes.map((type, idx) => {
            const Icon = type.icon;
            return (
              <div
                key={type.title}
                className="group bg-white rounded-lg overflow-hidden shadow-[0_8px_24px_0_rgb(0_0_0/0.1)] hover:shadow-[0_12px_32px_0_rgb(0_0_0/0.15)] transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Image with Overlay */}
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={type.imageUrl}
                    alt={type.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  
                  {/* Icon Badge */}
                  <div 
                    className="absolute top-4 right-4 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_24px_0_rgb(0_0_0/0.1)]"
                    style={{ backgroundColor: palette.colors.primary }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    {/* H3: 24px from theme */}
                    <h3 className="text-white">{type.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Description - Body: 18px */}
                  <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                    {type.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    {type.features.map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
                        <div 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: palette.colors.accent }}
                        />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant="ds-secondary"
                    href={type.href}
                    className="w-full justify-center"
                  >
                    {type.cta}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}