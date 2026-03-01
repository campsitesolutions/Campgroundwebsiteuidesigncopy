import { Check, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useColorPalette } from '../../hooks/useColorPalette';
import { getContrastTextColor } from '../../utils/colorUtils';

export function SeasonalBenefits() {
  const palette = useColorPalette();
  const accentTextColor = getContrastTextColor(palette.colors.accent);
  
  const benefits = [
    'Reserve your favorite site for the entire season',
    'Build lasting friendships with fellow campers',
    'No setup or teardown every weekend',
    'Secure storage and peace of mind',
    'Access to exclusive seasonal events',
    'Priority booking for future seasons',
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1635902991114-19ad41bce874?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="Ontario seasonal campsite"
              className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose Seasonal?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Make the most of Ontario's beautiful summers with your own seasonal site. 
              It's more than camping—it's a lifestyle.
            </p>
            <div className="space-y-4 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex gap-3 items-start">
                  <div 
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: palette.colors.accent }}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
            <button 
              className="px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2"
              style={{ 
                backgroundColor: palette.colors.accent,
                color: accentTextColor
              }}
            >
              View Available Sites
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}