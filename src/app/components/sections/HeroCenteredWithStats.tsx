import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useWizard, getAllowedModels } from '../../context/WizardContext';
import { getCTATexts } from '../../utils/ctaTextMapper';
import { sanitizeCopy, getDefaultTagline, getDefaultHeadline } from '../../utils/copySanitizer';
import { Button } from '../ui/button';

interface StatItem {
  number: string;
  label: string;
}

interface HeroCenteredWithStatsProps {
  headline?: string;
  supportingText?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  stats?: StatItem[];
  backgroundImage?: string;
}

export function HeroCenteredWithStats(props: HeroCenteredWithStatsProps) {
  const { wizardData } = useWizard();
  const ctaTexts = getCTATexts(wizardData);
  
  // Get model-specific defaults
  const defaultTagline = getDefaultTagline(wizardData);
  const defaultHeadline = getDefaultHeadline(wizardData);
  
  // Compute allowed models using helper
  const allowedModels = getAllowedModels(wizardData);
  
  // Check if seasonal-only
  const isSeasonalOnly = allowedModels.size === 1 && allowedModels.has('seasonal');
  
  // Use props or model-specific defaults
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
  
  const stats = props.stats || [
    { number: "200+", label: "Seasonal Sites" },
    { number: "25", label: "Years of Service" },
    { number: "4.9★", label: "Guest Rating" }
  ];
  
  const backgroundImage = props.backgroundImage || "https://images.unsplash.com/photo-1584680678084-6dcd6e1baaff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";

  return (
    <section className="relative w-full min-h-[700px] flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={backgroundImage}
          alt="Scenic campground background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Subtle Overlay - Unified treatment */}
      <div className="absolute inset-0 z-10 bg-gray-900/40" />

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 py-[88px] text-center">
        {/* Main Content */}
        <div className="mb-12">
          {/* Headline - Uses theme H1: 56px, line-height 1.1 */}
          <h1 className="text-white mb-6 tracking-tight">
            {headline}
          </h1>

          {/* Supporting Text - 18px from theme */}
          <p className="mb-8 max-w-3xl mx-auto text-white/90">
            {supportingText}
          </p>
          
          {/* Context Microcopy for Seasonal-Only */}
          {isSeasonalOnly && ctaTexts.contextMicrocopy && (
            <p className="text-sm mb-6 text-white/80 font-medium">
              {ctaTexts.contextMicrocopy}
            </p>
          )}

          {/* Primary CTA - Unified Design System */}
          <Button
            variant="primary"
            href={primaryCTA.href}
            className="bg-white text-[var(--text-primary)] hover:bg-white/90"
          >
            {primaryCTA.text}
            <ArrowRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Stats Row */}
        <div className="border-t border-white/20 pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-white/80 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}