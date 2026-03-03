import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useWizard, getAllowedModels } from '../../context/WizardContext';
import { Button } from '../ui/button';

interface StayType {
  model: string;
  image: string;
  title: string;
  description: string;
  cta: string;
  href: string;
}

interface StayTypeCardsImageOverlayProps {
  headline?: string;
  subheadline?: string;
  stayTypes?: StayType[];
}

export function StayTypeCardsImageOverlay(props: StayTypeCardsImageOverlayProps) {
  const { wizardData } = useWizard();
  
  // Compute allowed models using helper
  const allowedModels = getAllowedModels(wizardData);
  
  // Default stay types
  const defaultStayTypes: StayType[] = [
    {
      model: 'overnight',
      image: 'https://images.unsplash.com/photo-1588100249910-3bbdd5cec019?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      title: 'Overnight Camping',
      description: 'Perfect for weekend getaways and short trips. Full hookups available.',
      cta: 'Book Overnight',
      href: '#rates',
    },
    {
      model: 'seasonal',
      image: 'https://images.unsplash.com/photo-1624299449684-b26570eab5ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      title: 'Seasonal Sites',
      description: 'Make us your home for the season. May through October availability.',
      cta: 'View Seasonal',
      href: '#rates',
    },
    {
      model: 'cottage-rentals',
      image: 'https://images.unsplash.com/photo-1578275054004-61e08676833c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      title: 'Cottage Rentals',
      description: 'Fully equipped cottages with all the comforts of home.',
      cta: 'Explore Cottages',
      href: '#contact',
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
  
  const getSubtitle = () => {
    if (stayTypes.length === 1) {
      if (allowedModels.has('seasonal')) {
        return 'Find the perfect seasonal site for your summer home away from home.';
      }
    }
    return 'Whether it\'s a quick getaway or a full season, we have the perfect option for you.';
  };
  
  const headline = props.headline || getTitle();
  const subheadline = props.subheadline || getSubtitle();

  // Dynamic grid classes based on number of cards
  const getGridClass = () => {
    if (stayTypes.length === 1) return 'grid-cols-1 max-w-md mx-auto';
    if (stayTypes.length === 2) return 'md:grid-cols-2 max-w-4xl mx-auto';
    return 'md:grid-cols-3';
  };

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

        {/* Cards Grid - Responsive to card count */}
        <div className={`grid gap-6 ${getGridClass()}`}>
          {stayTypes.map((type) => (
            <a
              key={type.title}
              href={type.href}
              className="group relative block aspect-[3/4] rounded-lg overflow-hidden shadow-[0_8px_24px_0_rgb(0_0_0/0.1)] hover:shadow-[0_12px_32px_0_rgb(0_0_0/0.15)] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Background Image */}
              <ImageWithFallback
                src={type.image}
                alt={type.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Unified Overlay - 50% opacity */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

              {/* Content - Centered */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                {/* H3: 24px from theme */}
                <h3 className="text-white mb-4">
                  {type.title}
                </h3>
                {/* Body: 18px from theme */}
                <p className="text-white/90 mb-6 max-w-xs leading-relaxed">
                  {type.description}
                </p>
                <span className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                  {type.cta}
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}