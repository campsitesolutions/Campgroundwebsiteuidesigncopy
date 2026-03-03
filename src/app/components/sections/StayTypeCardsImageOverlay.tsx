import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// Full-image background cards with centered text overlay. Entire card clickable with hover elevation effect.
export function StayTypeCardsImageOverlay() {
  // ALWAYS show all three stay types - this is promotional content
  const stayTypes = [
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
  ];

  return (
    <section className="py-[88px] bg-[var(--background-muted)]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="mb-4">Choose Your Stay</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Whether it's a quick getaway or a full season, we have the perfect option for you.
          </p>
        </div>

        {/* Three-card grid - full-image cards with hover elevation */}
        <div className="grid md:grid-cols-3 gap-6">
          {stayTypes.map((type) => (
            <a
              key={type.title}
              href={type.href}
              className="group relative block aspect-[3/4] rounded-lg overflow-hidden shadow-[0_8px_24px_0_rgb(0_0_0/0.1)] hover:shadow-[0_12px_32px_0_rgb(0_0_0/0.15)] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Background Image */}
              <ImageWithFallback
                src={type.image}
                alt={type.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Unified Overlay - 50% opacity */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

              {/* Content - Centered */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                <h3 className="text-white mb-4">
                  {type.title}
                </h3>
                <p className="text-white/90 mb-6 max-w-xs leading-relaxed">
                  {type.description}
                </p>
                <span className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
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