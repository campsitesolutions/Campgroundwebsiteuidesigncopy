import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useWizard } from '../../context/WizardContext';
import { getCTATexts } from '../../utils/ctaTextMapper';
import { sanitizeCopy, getDefaultTagline, getDefaultHeadline } from '../../utils/copySanitizer';
import { getContrastTextColor } from '../../utils/colorUtils';
import { useColorPalette } from '../../hooks/useColorPalette';

interface HeroCinematicOverlayProps {
  seasonalTagline?: string;
  headline?: string;
  supportingText?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
}

export function HeroCinematicOverlay(props: HeroCinematicOverlayProps) {
  const { wizardData } = useWizard();
  const ctaTexts = getCTATexts(wizardData);
  const palette = useColorPalette();
  
  // Get model-specific defaults
  const defaultTagline = getDefaultTagline(wizardData);
  const defaultHeadline = getDefaultHeadline(wizardData);
  
  // Compute allowed models for seasonal-specific badge
  const allowedModels = new Set<string>();
  if (wizardData.primaryBusinessModel) {
    allowedModels.add(wizardData.primaryBusinessModel);
  }
  wizardData.secondaryBusinessModels.forEach(model => allowedModels.add(model));
  
  // Check if seasonal-only
  const isSeasonalOnly = allowedModels.size === 1 && allowedModels.has('seasonal');
  
  // Default badge based on model
  const getDefaultBadge = () => {
    if (isSeasonalOnly) {
      return '2025 Seasonal Sites Available';
    }
    return '2025 Season Now Booking';
  };
  
  // Use props or model-specific defaults
  const seasonalTagline = props.seasonalTagline !== undefined 
    ? sanitizeCopy(props.seasonalTagline, wizardData) 
    : getDefaultBadge();
  
  const headline = props.headline 
    ? sanitizeCopy(props.headline, wizardData)
    : defaultHeadline;
  
  const supportingText = props.supportingText 
    ? sanitizeCopy(props.supportingText, wizardData)
    : sanitizeCopy(defaultTagline, wizardData);
  
  const primaryCTA = props.primaryCTA || {
    text: ctaTexts.primary,
    href: "#contact"
  };
  
  const secondaryCTA = props.secondaryCTA || {
    text: ctaTexts.secondary,
    href: "#amenities"
  };
  
  const backgroundImage = props.backgroundImage || "https://images.unsplash.com/photo-1504201958709-5df18407bb4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={backgroundImage}
          alt="Scenic campground background"
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0 opacity-60"
          style={{ 
            background: `linear-gradient(135deg, ${palette.colors.primaryDark} 0%, ${palette.colors.primary} 50%, transparent 100%)`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto text-white">
        {/* Seasonal Tagline/Badge */}
        {seasonalTagline && (
          <div className="inline-block mb-6 px-6 py-2 rounded-full text-sm font-semibold tracking-wide"
            style={{ 
              backgroundColor: palette.colors.accent,
              color: getContrastTextColor(palette.colors.accent)
            }}
          >
            {seasonalTagline}
          </div>
        )}

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
          {headline}
        </h1>

        {/* Supporting Text */}
        <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-white/95">
          {supportingText}
        </p>
        
        {/* Context Microcopy for Seasonal-Only */}
        {isSeasonalOnly && ctaTexts.contextMicrocopy && (
          <p className="text-sm md:text-base mb-6 text-white/80 font-medium">
            {ctaTexts.contextMicrocopy}
          </p>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={primaryCTA.href}
            className="px-10 py-5 rounded-lg font-bold text-lg transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105 duration-200 inline-block text-white"
            style={{ 
              backgroundColor: palette.colors.accent
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            {primaryCTA.text}
          </a>
          
          <a
            href={secondaryCTA.href}
            className="px-10 py-5 rounded-lg font-bold text-lg transition-all border-2 border-white/80 hover:bg-white/10 duration-200 inline-block text-white"
          >
            {secondaryCTA.text}
          </a>
        </div>
      </div>
    </section>
  );
}