import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface TrailerCard {
  id: string;
  image: string;
  name: string;
  model: string;
  specs: string;
  price: string;
  href: string;
}

interface TrailersCleanGridProps {
  headline?: string;
  subheadline?: string;
  showFilters?: boolean;
  trailers?: TrailerCard[];
}

export function TrailersCleanGrid({
  headline = "Trailers For Sale",
  subheadline = "Find your perfect home away from home with our selection of quality pre-owned and new trailers.",
  showFilters = true,
  trailers = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1769888594832-76988416b5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBSViUyMGNhbXBlciUyMHRyYWlsZXIlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzE3OTQ5MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Forest River Salem',
      model: "2023 32' Travel Trailer",
      specs: '2 bed • 1 bath • Sleeps 6',
      price: '$42,900',
      href: '#contact',
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1760982136283-4d65075ac619?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cmF2ZWwlMjB0cmFpbGVyJTIwY2FtcGluZ3xlbnwxfHx8fDE3NzE3OTQ5MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Grand Design Reflection',
      model: "2024 38' Fifth Wheel",
      specs: '3 bed • 2 bath • Sleeps 8',
      price: '$68,500',
      href: '#contact',
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1659259541374-22a6df2fee1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjBwYXJrJTIwbW9kZWwlMjBSViUyMGhvbWV8ZW58MXx8fHwxNzcxNzk0OTEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Keystone Hideout',
      model: "2022 28' Travel Trailer",
      specs: '1 bed • 1 bath • Sleeps 4',
      price: '$34,900',
      href: '#contact',
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1565126703573-3537bb43cd46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWZ0aCUyMHdoZWVsJTIwdHJhaWxlciUyMGNhbXBpbmd8ZW58MXx8fHwxNzcxNzk0OTEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Jayco Eagle',
      model: "2023 35' Fifth Wheel",
      specs: '2 bed • 1.5 bath • Sleeps 6',
      price: '$56,900',
      href: '#contact',
    },
    {
      id: '5',
      image: 'https://images.unsplash.com/photo-1761519609306-db98f314c843?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJzdHJlYW0lMjB0cmF2ZWwlMjB0cmFpbGVyJTIwc2lsdmVyfGVufDF8fHx8MTc3MTc5NDkxMHww&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Airstream Flying Cloud',
      model: "2024 30' Travel Trailer",
      specs: '1 bed • 1 bath • Sleeps 4',
      price: '$125,000',
      href: '#contact',
    },
    {
      id: '6',
      image: 'https://images.unsplash.com/photo-1769888594832-76988416b5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBSViUyMGNhbXBlciUyMHRyYWlsZXIlMjBleHRlcmlvcnxlbnwxfHx8fDE3NzE3OTQ5MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Coachmen Catalina',
      model: "2022 26' Travel Trailer",
      specs: '1 bed • 1 bath • Sleeps 5',
      price: '$29,900',
      href: '#contact',
    },
  ],
}: TrailersCleanGridProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{headline}</h2>
          <p className="text-xl text-gray-600">{subheadline}</p>
        </div>

        {/* Filter Bar Placeholder */}
        {showFilters && (
          <div className="mb-10 flex flex-wrap gap-3">
            <button className="px-5 py-2.5 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800 transition-colors">
              All Trailers
            </button>
            <button className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              Travel Trailers
            </button>
            <button className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              Fifth Wheels
            </button>
            <button className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              Under $40K
            </button>
            <button className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              New Arrivals
            </button>
          </div>
        )}

        {/* 3-Column Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trailers.map((trailer) => (
            <div
              key={trailer.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={trailer.image}
                  alt={`${trailer.name} ${trailer.model}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Name & Model */}
                <h3 className="font-bold text-xl mb-1">{trailer.name}</h3>
                <p className="text-gray-600 mb-3">{trailer.model}</p>

                {/* Specs */}
                <p className="text-sm text-gray-500 mb-4 pb-4 border-b border-gray-200">
                  {trailer.specs}
                </p>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Starting at</div>
                    <div className="text-2xl font-bold text-emerald-700">{trailer.price}</div>
                  </div>
                  <a
                    href={trailer.href}
                    className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Details
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-bold text-lg group"
          >
            View All Available Trailers
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}