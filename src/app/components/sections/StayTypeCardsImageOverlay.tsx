import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface StayType {
  image: string;
  title: string;
  description: string;
  cta: string;
  href: string;
}

interface StayTypeCardsImageOverlayProps {
  headline?: string;
  subheadline?: string;
  stayTypes?: StayType[];
}

export function StayTypeCardsImageOverlay({
  headline = "Choose Your Stay",
  subheadline = "Whether it's a quick getaway or a full season, we have the perfect option for you.",
  stayTypes = [
    {
      image: 'https://images.unsplash.com/photo-1588100249910-3bbdd5cec019?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      title: 'Overnight Camping',
      description: 'Perfect for weekend getaways and short trips. Full hookups available.',
      cta: 'Book Overnight',
      href: '#rates',
    },
    {
      image: 'https://images.unsplash.com/photo-1624299449684-b26570eab5ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      title: 'Seasonal Sites',
      description: 'Make us your home for the season. May through October availability.',
      cta: 'View Seasonal',
      href: '#rates',
    },
    {
      image: 'https://images.unsplash.com/photo-1578275054004-61e08676833c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      title: 'Cottage Rentals',
      description: 'Fully equipped cottages with all the comforts of home.',
      cta: 'Explore Cottages',
      href: '#contact',
    },
  ],
}: StayTypeCardsImageOverlayProps) {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{headline}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {subheadline}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {stayTypes.map((type) => (
            <a
              key={type.title}
              href={type.href}
              className="group relative block aspect-[3/4] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Background Image */}
              <ImageWithFallback
                src={type.image}
                alt={type.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

              {/* Content - Centered */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {type.title}
                </h3>
                <p className="text-white/90 text-lg mb-6 max-w-xs leading-relaxed">
                  {type.description}
                </p>
                <span className="inline-flex items-center gap-2 text-white font-semibold text-lg group-hover:gap-3 transition-all">
                  {type.cta}
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}