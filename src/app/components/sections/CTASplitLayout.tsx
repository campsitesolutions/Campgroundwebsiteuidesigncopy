import { ArrowRight } from 'lucide-react';
import { SectionCustomization } from '../../context/SectionContext';
import { useColorPalette } from '../../hooks/useColorPalette';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CTASplitLayoutProps {
  customization?: SectionCustomization;
}

export function CTASplitLayout({ customization = {} }: CTASplitLayoutProps) {
  const palette = useColorPalette();
  const headline = customization.headline || 'Start Your Adventure Today';
  const description = customization.description || 'Join thousands of happy campers who have made unforgettable memories at our campground. Book your stay and discover why families return year after year.';
  const buttonText = customization.buttonText || 'Reserve Now';
  const image = customization.image || 'https://images.unsplash.com/photo-1588100249910-3bbdd5cec019?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Text and CTA */}
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {headline}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 duration-200 inline-flex items-center justify-center gap-3"
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
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                className="px-8 py-4 rounded-lg font-bold text-lg transition-all border-2 hover:bg-gray-50 duration-200"
                style={{
                  borderColor: palette.colors.primary,
                  color: palette.colors.primary
                }}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="order-1 md:order-2">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[4/3]">
              <ImageWithFallback
                src={image}
                alt="Happy campers enjoying the outdoors"
                className="w-full h-full object-cover"
              />
              {/* Subtle accent overlay in corner */}
              <div 
                className="absolute top-0 right-0 w-32 h-32 opacity-20"
                style={{
                  background: `linear-gradient(135deg, transparent 50%, ${palette.colors.accent} 50%)`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}