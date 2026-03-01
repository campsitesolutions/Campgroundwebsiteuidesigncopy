import { ArrowRight } from 'lucide-react';
import { SectionCustomization } from '../../context/SectionContext';
import { useColorPalette } from '../../hooks/useColorPalette';

interface CTABannerProps {
  customization?: SectionCustomization;
}

export function CTABanner({ customization = {} }: CTABannerProps) {
  const palette = useColorPalette();
  const headline = customization.headline || 'Ready to Book Your Stay?';
  const description = customization.description || 'Don\'t wait—our best sites fill up fast. Reserve your spot today and start making memories.';
  const buttonText = customization.buttonText || 'Book Now';

  return (
    <section 
      className="py-16 md:py-20 text-white"
      style={{ 
        background: `linear-gradient(to right, ${palette.colors.primary}, ${palette.colors.primaryHover})`
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
          {headline}
        </h2>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            className="px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 text-white"
            style={{ 
              backgroundColor: palette.colors.primaryDark
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            {buttonText}
            <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            className="px-8 py-4 rounded-lg font-bold text-lg transition-colors border-2 text-white"
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderColor: 'rgba(255,255,255,0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}