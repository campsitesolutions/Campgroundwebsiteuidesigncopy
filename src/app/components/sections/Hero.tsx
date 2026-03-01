import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { SectionCustomization } from '../../context/SectionContext';
import { useColorPalette } from '../../hooks/useColorPalette';
import { getContrastTextColor } from '../../utils/colorUtils';

interface HeroProps {
  variant?: 'default' | 'trailers';
  customization?: SectionCustomization;
}

export function Hero({ variant = 'default', customization = {} }: HeroProps) {
  const palette = useColorPalette();
  
  const headline = customization.headline || (variant === 'trailers' 
    ? 'Find Your Perfect RV or Trailer'
    : 'Your Perfect Ontario Getaway Awaits');
  
  const subheadline = customization.subheadline || (variant === 'trailers'
    ? 'Quality pre-owned trailers on a beautiful seasonal site.'
    : 'Modern amenities, natural beauty, and unforgettable memories.');
  
  const buttonText = customization.buttonText || (variant === 'trailers' ? 'View Trailers' : 'Book Now');
  
  const backgroundImage = customization.backgroundImage || 'https://images.unsplash.com/photo-1677764588649-6d01f9c29ade?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600';

  const accentTextColor = getContrastTextColor(palette.colors.accent);

  return (
    <section className="relative text-white" style={{ backgroundColor: palette.colors.primaryDark }}>
      <div className="absolute inset-0 opacity-60">
        <ImageWithFallback
          src={backgroundImage}
          alt="Campground"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            {headline}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            {subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              className="px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: palette.colors.accent,
                color: accentTextColor
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.colors.accentHover}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = palette.colors.accent}
            >
              {buttonText}
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-white/30 transition-colors">
              Send an Inquiry
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}