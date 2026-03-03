import { ArrowRight, Phone } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useWizard, getAllowedModels } from '../../context/WizardContext';
import { getCTATexts } from '../../utils/ctaTextMapper';
import { sanitizeCopy, getDefaultTagline, getDefaultHeadline } from '../../utils/copySanitizer';
import { Button } from '../ui/button';

interface HeroSplitLayoutProps {
  badge?: string;
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
  image?: string;
}

export function HeroSplitLayout(props: HeroSplitLayoutProps) {
  const { wizardData } = useWizard();
  const ctaTexts = getCTATexts(wizardData);
  
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
      return 'Seasonal Sites Available';
    }
    if (allowedModels.size === 1 && allowedModels.has('overnight')) {
      return 'Campsites Available';
    }
    return 'Now Accepting Reservations';
  };
  
  // Use props or model-specific defaults
  const badge = props.badge !== undefined 
    ? sanitizeCopy(props.badge, wizardData)
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
    href: "tel:7055552267"
  };
  
  const image = props.image || "https://images.unsplash.com/photo-1708927764431-eb9ea284a5ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[600px] py-[88px]">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            {badge && (
              <div className="inline-block self-start mb-6">
                <span className="px-4 py-2 rounded-lg text-sm font-semibold bg-[var(--background-muted)] text-[var(--text-primary)]">
                  {badge}
                </span>
              </div>
            )}

            {/* Headline - Uses theme H1: 56px, line-height 1.1 */}
            <h1 className="mb-6">
              {headline}
            </h1>

            {/* Supporting Text - 18px body from theme */}
            <p className="mb-6 text-[var(--text-secondary)]">
              {supportingText}
            </p>
            
            {/* Context Microcopy for Seasonal-Only */}
            {isSeasonalOnly && ctaTexts.contextMicrocopy && (
              <p className="text-sm mb-6 text-[var(--text-tertiary)] font-medium">
                {ctaTexts.contextMicrocopy}
              </p>
            )}

            {/* CTAs - Unified Design System */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Button variant="primary" href={primaryCTA.href}>
                {primaryCTA.text}
                <ArrowRight className="w-5 h-5" />
              </Button>

              <Button variant="ds-secondary" href={secondaryCTA.href}>
                <Phone className="w-5 h-5" />
                {secondaryCTA.text}
              </Button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative lg:h-[600px] h-[400px] rounded-lg overflow-hidden shadow-[0_8px_24px_0_rgb(0_0_0/0.1)]">
            <ImageWithFallback
              src={image}
              alt="Campground scenic view"
              className="w-full h-full object-cover"
            />
            {/* Optional overlay badge on image */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-[0_8px_24px_0_rgb(0_0_0/0.1)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-tertiary)] mb-1">Starting from</p>
                    <p className="text-3xl font-bold text-[var(--text-primary)]">$3,200<span className="text-lg font-normal text-[var(--text-secondary)]">/season</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">✓ May - October</p>
                    <p className="text-sm text-[var(--text-tertiary)] mt-1">Power • Water • Sewer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}