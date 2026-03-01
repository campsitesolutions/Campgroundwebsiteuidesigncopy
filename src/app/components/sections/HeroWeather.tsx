import { ArrowRight, Cloud, Droplets, Wind } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useColorPalette } from '../../hooks/useColorPalette';
import { getContrastTextColor } from '../../utils/colorUtils';

export function HeroWeather() {
  const palette = useColorPalette();
  const accentTextColor = getContrastTextColor(palette.colors.accent);
  
  return (
    <section className="relative bg-gray-900 text-white">
      <div className="absolute inset-0 opacity-60">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1747833423201-5daa71aacc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
          alt="Muskoka Seasonal Campground"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Seasonal Home Away From Home
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Join our community for the full season. Perfect sites, lasting friendships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
                style={{ 
                  backgroundColor: palette.colors.accent,
                  color: accentTextColor
                }}
              >
                View Seasonal Sites
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-white/30 transition-colors">
                Send an Inquiry
              </button>
            </div>
          </div>
          
          {/* Weather Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-300">Today's Weather</p>
                <p className="text-3xl font-bold">22°C</p>
              </div>
              <Cloud className="w-16 h-16 text-yellow-300" />
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
              <div className="text-center">
                <Droplets className="w-6 h-6 mx-auto mb-1 text-blue-300" />
                <p className="text-xs text-gray-300">Humidity</p>
                <p className="font-semibold">65%</p>
              </div>
              <div className="text-center">
                <Wind className="w-6 h-6 mx-auto mb-1 text-gray-300" />
                <p className="text-xs text-gray-300">Wind</p>
                <p className="font-semibold">12 km/h</p>
              </div>
              <div className="text-center">
                <Cloud className="w-6 h-6 mx-auto mb-1 text-gray-400" />
                <p className="text-xs text-gray-300">Conditions</p>
                <p className="font-semibold">Sunny</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}