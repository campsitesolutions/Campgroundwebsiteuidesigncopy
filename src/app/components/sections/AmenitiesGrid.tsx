import { Wifi, Waves, Zap, ShoppingCart, Utensils, Trees } from 'lucide-react';
import { useColorPalette } from '../../hooks/useColorPalette';

export function AmenitiesGrid() {
  const palette = useColorPalette();
  
  const amenities = [
    { icon: Wifi, title: 'Free WiFi', description: 'High-speed internet throughout the park' },
    { icon: Waves, title: 'Beach Access', description: 'Private sandy beach and swimming area' },
    { icon: Zap, title: 'Full Hookups', description: '30/50 amp electrical, water & sewer' },
    { icon: ShoppingCart, title: 'Camp Store', description: 'Essentials, firewood, and more' },
    { icon: Utensils, title: 'Modern Facilities', description: 'Clean washrooms and showers' },
    { icon: Trees, title: 'Nature Trails', description: 'Scenic walking and hiking paths' },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Park Amenities</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need for a comfortable and enjoyable stay.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity) => {
            const Icon = amenity.icon;
            return (
              <div key={amenity.title} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${palette.colors.accent}33` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: palette.colors.primary }} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{amenity.title}</h3>
                  <p className="text-gray-600">{amenity.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}