import { ArrowRight, Cloud, Droplets, Wind } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useColorPalette } from '../../hooks/useColorPalette';
import { getContrastTextColor } from '../../utils/colorUtils';
import { Button } from '../ui/button';

export function HeroWeather() {
  const palette = useColorPalette();
  const accentTextColor = getContrastTextColor(palette.colors.accent);
  
  return (
    <section className="relative bg-gray-900 text-white">
      <div className="absolute inset-0 opacity-50">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1747833423201-5daa71aacc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
          alt="Muskoka Seasonal Campground"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative container mx-auto px-4 py-[88px]">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            {/* Headline - Uses theme H1: 56px, line-height 1.1 */}
            <h1 className="mb-6 text-white">
              Your Seasonal Home Away From Home
            </h1>
            
            {/* Supporting text - 18px from theme */}
            <p className="mb-6 text-gray-200">
              Join our community for the full season. Perfect sites, lasting friendships.
            </p>
            
            {/* CTAs - Unified Design System */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                variant="primary"
                className="text-white"
                style={{ 
                  backgroundColor: palette.colors.accent,
                  color: accentTextColor
                }}
              >
                View Seasonal Sites
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="ds-secondary"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white"
              >
                Send an Inquiry
              </Button>
            </div>
          </div>
          
          {/* Weather Card - Updated with design system spacing */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8 text-white shadow-[0_8px_24px_0_rgb(0_0_0/0.1)]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-300">Today's Weather</p>
                <p className="text-3xl font-bold">22°C</p>
              </div>
              <Cloud className="w-16 h-16 text-yellow-300" />
            </div>
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/20">
              <div className="text-center">
                <Droplets className="w-6 h-6 mx-auto mb-1 text-blue-300" />
                <p className="text-sm text-gray-300">Humidity</p>
                <p className="font-semibold">65%</p>
              </div>
              <div className="text-center">
                <Wind className="w-6 h-6 mx-auto mb-1 text-gray-300" />
                <p className="text-sm text-gray-300">Wind</p>
                <p className="font-semibold">12 km/h</p>
              </div>
              <div className="text-center">
                <Cloud className="w-6 h-6 mx-auto mb-1 text-gray-400" />
                <p className="text-sm text-gray-300">Conditions</p>
                <p className="font-semibold">Sunny</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}