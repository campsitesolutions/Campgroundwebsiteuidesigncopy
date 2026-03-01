import { ArrowRight } from 'lucide-react';
import { SectionCustomization } from '../../context/SectionContext';
import { useColorPalette } from '../../hooks/useColorPalette';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CTAImageBackgroundProps {
  customization?: SectionCustomization;
}

export function CTAImageBackground({ customization = {} }: CTAImageBackgroundProps) {
  const palette = useColorPalette();
  const headline = customization.headline || 'Your Perfect Campground Escape Awaits';
  const description = customization.description || 'Book your stay today and experience the beauty of nature with all the comforts of home.';
  const buttonText = customization.buttonText || 'Reserve Your Spot';
  const backgroundImage = customization.backgroundImage || 'https://images.unsplash.com/photo-1592599371910-706644753baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920';

  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={backgroundImage}
          alt="Campground scenic view"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {headline}
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
            {description}
          </p>
          <button
            className="px-10 py-5 rounded-lg font-bold text-lg transition-all shadow-2xl hover:shadow-xl hover:scale-105 transform duration-200 inline-flex items-center gap-3"
            style={{
              backgroundColor: palette.colors.primary,
              color: 'white'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = palette.colors.primaryHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = palette.colors.primary;
            }}
          >
            {buttonText}
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}