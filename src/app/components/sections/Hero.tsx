import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { SectionCustomization } from '../../context/SectionContext';
import { useColorPalette } from '../../hooks/useColorPalette';
import { getContrastTextColor } from '../../utils/colorUtils';
import { Button } from '../ui/button';

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
      <div className="absolute inset-0 opacity-50">
        <ImageWithFallback
          src={backgroundImage}
          alt="Campground"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative container mx-auto px-4 py-[88px]">
        <div className="max-w-2xl">
          {/* Headline - Uses theme H1: 56px, line-height 1.1 */}
          <h1 className="mb-6 text-white">
            {headline}
          </h1>
          
          {/* Subheadline - 18px body text from theme */}
          <p className="mb-6 text-gray-200">
            {subheadline}
          </p>
          
          {/* CTAs - Unified Design System */}
          <div className="flex flex-col sm:flex-row gap-6">
            <Button 
              variant="primary"
              className="text-white"
              style={{ 
                backgroundColor: palette.colors.accent,
                color: accentTextColor
              }}
            >
              {buttonText}
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="ds-secondary"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white"
            >
              Send an Inquiry
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}