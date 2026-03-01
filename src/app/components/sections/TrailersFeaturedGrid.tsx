import { ArrowRight, Bed, Bath, Users, Calendar, Ruler } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface FeaturedTrailer {
  id: string;
  image: string;
  badge?: string;
  name: string;
  model: string;
  year: string;
  length: string;
  bedrooms: string;
  bathrooms: string;
  sleeps: string;
  description: string;
  price: string;
  href: string;
}

interface TrailerCard {
  id: string;
  image: string;
  name: string;
  model: string;
  specs: string;
  price: string;
  href: string;
}

interface TrailersFeaturedGridProps {
  headline?: string;
  subheadline?: string;
  featured?: FeaturedTrailer;
  trailers?: TrailerCard[];
}

export function TrailersFeaturedGrid({
  headline = "Featured Trailers For Sale",
  subheadline = "Premium selection of quality trailers ready for your next adventure.",
  featured = {
    id: 'featured-1',
    image: 'https://images.unsplash.com/photo-1651902387099-787f4a62a3e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBSViUyMHRyYXZlbCUyMHRyYWlsZXIlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzE3OTUwMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Featured',
    name: 'Grand Design Reflection',
    model: 'Fifth Wheel',
    year: '2024',
    length: "38'",
    bedrooms: '3',
    bathrooms: '2',
    sleeps: '8',
    description: 'Luxurious fifth wheel with premium finishes, residential-style kitchen, spacious master suite, and outdoor entertainment center. Perfect for extended seasonal stays.',
    price: '$68,500',
    href: '#contact',
  },
  trailers = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1759752783876-a7016334eb34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYW1wZXIlMjB0cmFpbGVyJTIwZXh0ZXJpb3IlMjBzdW5ueXxlbnwxfHx8fDE3NzE3OTUwMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Forest River Salem',
      model: "2023 32' Travel Trailer",
      specs: '2 bed • 1 bath • Sleeps 6',
      price: '$42,900',
      href: '#contact',
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1739257599500-85ff0ff1b359?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWZ0aCUyMHdoZWVsJTIwUlYlMjBjYW1wc2l0ZXxlbnwxfHx8fDE3NzE3OTUwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Jayco Eagle',
      model: "2023 35' Fifth Wheel",
      specs: '2 bed • 1.5 bath • Sleeps 6',
      price: '$56,900',
      href: '#contact',
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1649621991444-6ff6ca66b0b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wZXIlMjBSViUyMGZvcmVzdHxlbnwxfHx8fDE3NzE3OTUwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Keystone Hideout',
      model: "2022 28' Travel Trailer",
      specs: '1 bed • 1 bath • Sleeps 4',
      price: '$34,900',
      href: '#contact',
    },
  ],
}: TrailersFeaturedGridProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{headline}</h2>
          <p className="text-xl text-gray-600">{subheadline}</p>
        </div>

        {/* Featured Trailer Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-gray-100">
              <ImageWithFallback
                src={featured.image}
                alt={`${featured.name} ${featured.model}`}
                className="w-full h-full object-cover"
              />
              {featured.badge && (
                <div className="absolute top-6 left-6 bg-emerald-700 text-white px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wide">
                  {featured.badge}
                </div>
              )}
            </div>

            {/* Details Side */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              {/* Title */}
              <div className="mb-6">
                <h3 className="text-3xl lg:text-4xl font-bold mb-2">{featured.name}</h3>
                <p className="text-xl text-gray-600">{featured.model}</p>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-8 leading-relaxed">
                {featured.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-700" />
                  <div>
                    <div className="text-xs text-gray-500">Year</div>
                    <div className="font-bold">{featured.year}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-emerald-700" />
                  <div>
                    <div className="text-xs text-gray-500">Length</div>
                    <div className="font-bold">{featured.length}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-emerald-700" />
                  <div>
                    <div className="text-xs text-gray-500">Bedrooms</div>
                    <div className="font-bold">{featured.bedrooms}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5 text-emerald-700" />
                  <div>
                    <div className="text-xs text-gray-500">Bathrooms</div>
                    <div className="font-bold">{featured.bathrooms}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-700" />
                  <div>
                    <div className="text-xs text-gray-500">Sleeps</div>
                    <div className="font-bold">{featured.sleeps}</div>
                  </div>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Starting at</div>
                  <div className="text-4xl font-bold text-emerald-700">{featured.price}</div>
                </div>
                <a
                  href={featured.href}
                  className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
                >
                  View Details
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* More Trailers Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6">More Available Trailers</h3>
        </div>

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
                <h4 className="font-bold text-xl mb-1">{trailer.name}</h4>
                <p className="text-gray-600 mb-3">{trailer.model}</p>

                {/* Specs */}
                <p className="text-sm text-gray-500 mb-4 pb-4 border-b border-gray-200">
                  {trailer.specs}
                </p>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Starting at</div>
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
