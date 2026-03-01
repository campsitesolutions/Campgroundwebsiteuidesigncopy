import { Bed, Ruler, Calendar, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useColorPalette } from '../../hooks/useColorPalette';
import { getContrastTextColor } from '../../utils/colorUtils';

export function TrailersGrid() {
  const palette = useColorPalette();
  const accentTextColor = getContrastTextColor(palette.colors.accent);
  
  const trailers = [
    {
      name: '2018 Forest River Cherokee',
      price: '$24,900',
      specs: { length: "32'", beds: '2', year: '2018' },
      image: 'https://images.unsplash.com/photo-1588100249910-3bbdd5cec019?w=600',
    },
    {
      name: '2020 Jayco Jay Flight',
      price: '$32,500',
      specs: { length: "36'", beds: '3', year: '2020' },
      image: 'https://images.unsplash.com/photo-1628448160306-7f9a5db0b7c7?w=600',
    },
    {
      name: '2017 Keystone Hideout',
      price: '$21,900',
      specs: { length: "28'", beds: '2', year: '2017' },
      image: 'https://images.unsplash.com/photo-1603373659283-f0728b2621c2?w=600',
    },
    {
      name: '2019 Grand Design Imagine',
      price: '$29,900',
      specs: { length: "34'", beds: '2', year: '2019' },
      image: 'https://images.unsplash.com/photo-1565076644173-5f7c6dfc0abd?w=600',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Trailers for Sale</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quality pre-owned trailers on beautiful seasonal sites. Financing available.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trailers.map((trailer) => (
            <div key={trailer.name} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="relative h-48">
                <ImageWithFallback
                  src={trailer.image}
                  alt={trailer.name}
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute top-4 right-4 px-3 py-1 rounded-full font-bold"
                  style={{ 
                    backgroundColor: palette.colors.accent,
                    color: accentTextColor
                  }}
                >
                  {trailer.price}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-4">{trailer.name}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Ruler className="w-4 h-4" />
                    <span>{trailer.specs.length} length</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Bed className="w-4 h-4" />
                    <span>{trailer.specs.beds} bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{trailer.specs.year}</span>
                  </div>
                </div>
                <button 
                  className="w-full py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  style={{ 
                    backgroundColor: palette.colors.accent,
                    color: accentTextColor
                  }}
                >
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button 
            className="font-semibold text-lg hover:underline"
            style={{ color: palette.colors.accent }}
          >
            View All Trailers →
          </button>
        </div>
      </div>
    </section>
  );
}