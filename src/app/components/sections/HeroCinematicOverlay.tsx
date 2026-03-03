import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useWizard, getAllowedModels } from '../../context/WizardContext';
import { getCTATexts } from '../../utils/ctaTextMapper';
import { sanitizeCopy, getDefaultTagline, getDefaultHeadline } from '../../utils/copySanitizer';
import { getContrastTextColor } from '../../utils/colorUtils';
import { useColorPalette } from '../../hooks/useColorPalette';
import { Button } from '../ui/button';

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
  
  // Compute allowed models using helper
  const allowedModels = getAllowedModels(wizardData);
  
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
    href: ctaTexts.primaryHref
  };
  
  // Secondary CTA only if goal is set
  const secondaryCTA = props.secondaryCTA || (ctaTexts.secondary ? {
    text: ctaTexts.secondary,
    href: ctaTexts.secondaryHref || '#'
  } : null);
  
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
          className="absolute inset-0 opacity-50"
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

        {/* Main Headline - Uses theme H1: 56px, line-height 1.1 */}
        <h1 className="mb-6 text-white">
          {headline}
        </h1>

        {/* Supporting Text - 18px body text */}
        <p className="mb-6 max-w-3xl mx-auto text-white/95">
          {supportingText}
        </p>
        
        {/* Context Microcopy for Seasonal-Only */}
        {isSeasonalOnly && ctaTexts.contextMicrocopy && (
          <p className="text-sm mb-6 text-white/80 font-medium">
            {ctaTexts.contextMicrocopy}
          </p>
        )}

        {/* CTA Buttons - Unified Design System */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            variant="primary"
            href={primaryCTA.href}
            className="text-white"
          >
            {primaryCTA.text}
          </Button>
          
          {secondaryCTA && (
            <Button
              variant="ds-secondary"
              href={secondaryCTA.href}
              className="border-white/80 text-white hover:bg-white/10 hover:text-white"
            >
              {secondaryCTA.text}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}