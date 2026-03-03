import { Calendar, Home, Tent, ArrowRight, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useWizard, getAllowedModels } from '../../context/WizardContext';
import { useColorPalette } from '../../hooks/useColorPalette';
import { Button } from '../ui/button';

interface FeaturedStayType {
  model: string;
  icon: typeof Calendar;
  image: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
}

interface StayType {
  model: string;
  icon: typeof Tent | typeof Home;
  image: string;
  title: string;
  description: string;
  cta: string;
  href: string;
}

interface StayTypeCardsSpotlightProps {
  headline?: string;
  subheadline?: string;
  featured?: FeaturedStayType;
  stayTypes?: StayType[];
}

export function StayTypeCardsSpotlight(props: StayTypeCardsSpotlightProps) {
  const { wizardData } = useWizard();
  const palette = useColorPalette();
  
  // Compute allowed models using helper
  const allowedModels = getAllowedModels(wizardData);
  
  const defaultFeatured: FeaturedStayType = {
    model: 'seasonal',
    icon: Calendar,
    image: 'https://images.unsplash.com/photo-1588100249910-3bbdd5cec019?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    title: 'Seasonal Sites',
    description: 'Make us your home for the season with premium amenities and a vibrant community.',
    features: [
      'May through October availability',
      'Premium full hookup sites',
      'Community events & activities',
      'Dedicated seasonal community',
    ],
    cta: 'View Seasonal Options',
    href: '#rates',
  };
  
  const defaultStayTypes: StayType[] = [
    {
      model: 'overnight',
      icon: Tent,
      image: 'https://images.unsplash.com/photo-1605620622858-ea62b0a2059c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      title: 'Overnight Camping',
      description: 'Perfect for weekend getaways and short trips. Full hookups available.',
      cta: 'Book Overnight',
      href: '#rates',
    },
    {
      model: 'cottage-rentals',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1625926144749-11eef44b0cdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      title: 'Cottage Rentals',
      description: 'Fully equipped cottages with all the comforts of home.',
      cta: 'Explore Cottages',
      href: '#contact',
    },
  ];
  
  const featured = props.featured || defaultFeatured;
  const allTypes = props.stayTypes || defaultStayTypes;
  
  // Filter featured and stay types by allowed models
  const showFeatured = allowedModels.has(featured.model);
  const stayTypes = allTypes.filter(type => allowedModels.has(type.model));
  
  // If nothing to show, return null
  if (!showFeatured && stayTypes.length === 0) {
    return null;
  }
  
  const headline = props.headline || 'Choose Your Stay';
  const subheadline = props.subheadline || 'Whether it\'s a quick getaway or a full season, we have the perfect option for you.';

  const FeaturedIcon = featured.icon;

  return (
    <section className="py-[88px] bg-[var(--background-muted)]">
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

        {/* Grid Layout - Responsive */}
        <div className={`grid gap-6 ${showFeatured && stayTypes.length > 0 ? 'lg:grid-cols-2' : 'grid-cols-1 max-w-2xl mx-auto'}`}>
          {/* Featured Large Card - Left */}
          {showFeatured && (
            <div className={stayTypes.length > 0 ? 'lg:row-span-2' : ''}>
              <div className="bg-white rounded-lg shadow-[0_8px_24px_0_rgb(0_0_0/0.1)] overflow-hidden h-full flex flex-col hover:shadow-[0_12px_32px_0_rgb(0_0_0/0.15)] transition-shadow duration-300">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div 
                    className="absolute top-6 left-6 text-white px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wide"
                    style={{ backgroundColor: palette.colors.accent }}
                  >
                    Featured
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  {/* Icon */}
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${palette.colors.accent}20` }}
                  >
                    <FeaturedIcon className="w-8 h-8" style={{ color: palette.colors.primary }} />
                  </div>

                  {/* Title - H3: 24px from theme */}
                  <h3 className="mb-4">{featured.title}</h3>

                  {/* Description - Body: 18px */}
                  <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                    {featured.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {featured.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: palette.colors.primary }} />
                        <span className="text-[var(--text-secondary)]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    variant="primary"
                    href={featured.href}
                    className="w-full justify-center"
                  >
                    {featured.cta}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Smaller Cards - Right (Stacked) or Centered if no featured */}
          {stayTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div key={type.title}>
                <div className="bg-white rounded-lg shadow-[0_8px_24px_0_rgb(0_0_0/0.1)] overflow-hidden h-full flex flex-col hover:shadow-[0_12px_32px_0_rgb(0_0_0/0.15)] transition-shadow duration-300">
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={type.image}
                      alt={type.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    {/* Icon */}
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${palette.colors.accent}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: palette.colors.primary }} />
                    </div>

                    {/* Title - H3: 24px from theme */}
                    <h3 className="mb-3">{type.title}</h3>

                    {/* Description - Body: 18px */}
                    <p className="text-[var(--text-secondary)] mb-6 flex-grow leading-relaxed">
                      {type.description}
                    </p>

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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}