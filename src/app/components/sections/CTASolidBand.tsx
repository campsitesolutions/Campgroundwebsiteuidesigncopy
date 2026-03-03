import { ArrowRight } from 'lucide-react';
import { SectionCustomization } from '../../context/SectionContext';
import { useColorPalette } from '../../hooks/useColorPalette';
import { useWizard } from '../../context/WizardContext';
import { getCTATexts } from '../../utils/ctaTextMapper';
import { sanitizeCopy } from '../../utils/copySanitizer';

interface CTASolidBandProps {
  customization?: SectionCustomization;
}

export function CTASolidBand({ customization = {} }: CTASolidBandProps) {
  const palette = useColorPalette();
  const { wizardData } = useWizard();
  const ctaTexts = getCTATexts(wizardData);
  
  const headline = customization.headline 
    ? sanitizeCopy(customization.headline, wizardData)
    : sanitizeCopy(ctaTexts.bannerHeadline, wizardData);
  
  const buttonText = customization.buttonText || ctaTexts.banner;

  return (
    <section 
      className="py-8 md:py-10 text-white"
      style={{ 
        backgroundColor: palette.colors.primary
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left-aligned Headline */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center md:text-left flex-1 text-white">
            {headline}
          </h2>
          
          {/* Right-aligned CTA Button */}
          <button
            className="px-8 py-4 bg-white text-gray-900 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 duration-200 inline-flex items-center gap-3 flex-shrink-0"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            {buttonText}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}