import { MapPin, Tent, UtensilsCrossed } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useColorPalette } from '../../hooks/useColorPalette';

export function LocalAttractions() {
  const palette = useColorPalette();
  
  const attractions = [
    {
      icon: Tent,
      name: 'Algonquin Provincial Park',
      distance: '15 km',
      description: 'World-class hiking, canoeing, and wildlife viewing.',
      image: 'https://images.unsplash.com/photo-1635902991114-19ad41bce874?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    },
    {
      icon: UtensilsCrossed,
      name: 'Downtown Huntsville',
      distance: '8 km',
      description: 'Charming shops, restaurants, and local farmers market.',
      image: 'https://images.unsplash.com/photo-1564934926690-c075eaf3cc3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    },
    {
      icon: MapPin,
      name: 'Arrowhead Provincial Park',
      distance: '12 km',
      description: 'Beautiful beaches and scenic lookout points.',
      image: 'https://images.unsplash.com/photo-1762130099350-fe6c5325dd01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore the Area</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our campground is perfectly located near Ontario's best attractions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {attractions.map((attraction) => {
            const Icon = attraction.icon;
            return (
              <div key={attraction.name} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 relative">
                  <ImageWithFallback
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                    {attraction.distance}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: `${palette.colors.accent}20`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: palette.colors.accent }} />
                    </div>
                    <h3 className="font-bold text-lg">{attraction.name}</h3>
                  </div>
                  <p className="text-gray-600">{attraction.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}