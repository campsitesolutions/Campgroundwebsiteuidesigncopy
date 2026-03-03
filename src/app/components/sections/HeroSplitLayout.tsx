import { ArrowRight, Phone } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useWizard } from '../../context/WizardContext';
import { getCTATexts } from '../../utils/ctaTextMapper';
import { sanitizeCopy, getDefaultTagline, getDefaultHeadline } from '../../utils/copySanitizer';

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
  
  // Compute allowed models for badge
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[600px] py-16 lg:py-24">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            {badge && (
              <div className="inline-block self-start mb-6">
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                  {badge}
                </span>
              </div>
            )}

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {headline}
            </h1>

            {/* Supporting Text */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              {supportingText}
            </p>
            
            {/* Context Microcopy for Seasonal-Only */}
            {isSeasonalOnly && ctaTexts.contextMicrocopy && (
              <p className="text-sm md:text-base mb-6 text-gray-500 font-medium">
                {ctaTexts.contextMicrocopy}
              </p>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Primary CTA */}
              <a
                href={primaryCTA.href}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-700 text-white font-semibold rounded-lg shadow-lg hover:bg-emerald-800 hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                {primaryCTA.text}
                <ArrowRight className="w-5 h-5" />
              </a>

              {/* Secondary CTA */}
              <a
                href={secondaryCTA.href}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-300 hover:border-emerald-700 hover:bg-gray-50 transition-all duration-200"
              >
                <Phone className="w-5 h-5" />
                {secondaryCTA.text}
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Family Owned Since 1998</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">200+ Seasonal Sites</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Full Service Hook-ups</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative lg:h-[600px] h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            <ImageWithFallback
              src={image}
              alt="Campground scenic view"
              className="w-full h-full object-cover"
            />
            {/* Optional overlay badge on image */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Starting from</p>
                    <p className="text-3xl font-bold text-gray-900">$3,200<span className="text-lg font-normal text-gray-600">/season</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-emerald-700">✓ May - October</p>
                    <p className="text-xs text-gray-600 mt-1">Power • Water • Sewer</p>
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