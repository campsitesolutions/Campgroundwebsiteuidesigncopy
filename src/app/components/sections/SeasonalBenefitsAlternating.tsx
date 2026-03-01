import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useColorPalette } from '../../hooks/useColorPalette';

interface BenefitRow {
  image: string;
  imageAlt: string;
  headline: string;
  paragraph: string;
  ctaText: string;
  ctaHref: string;
}

interface SeasonalBenefitsAlternatingProps {
  sectionHeadline?: string;
  sectionSubheadline?: string;
  rows?: BenefitRow[];
}

export function SeasonalBenefitsAlternating({
  sectionHeadline = "The Seasonal Lifestyle",
  sectionSubheadline = "Experience the freedom and community that comes with seasonal camping. More than a vacation—it's a way of life.",
  rows = [
    {
      image: 'https://images.unsplash.com/photo-1588100249910-3bbdd5cec019?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      imageAlt: 'Seasonal RV sites at Canadian campground',
      headline: 'Your Own Slice of Paradise',
      paragraph: 'Reserve your favorite site for the entire season and make it your summer home. No need to pack up every weekend—just arrive and relax. Set up once in May, and enjoy all summer long until October. Your site becomes your personal retreat with all the comforts you need.',
      ctaText: 'View Seasonal Rates',
      ctaHref: '#rates',
    },
    {
      image: 'https://images.unsplash.com/photo-1504201958709-5df18407bb4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      imageAlt: 'Campers gathering at Ontario lake campfire',
      headline: 'Join Our Community',
      paragraph: 'Become part of a vibrant community of outdoor enthusiasts. Build lasting friendships with fellow seasonal campers through organized events, potlucks, tournaments, and spontaneous gatherings. Our seasonal family creates memories that last a lifetime—share stories around the campfire and watch your kids grow up with lifelong friends.',
      ctaText: 'Learn About Events',
      ctaHref: '#events',
    },
  ],
}: SeasonalBenefitsAlternatingProps) {
  const palette = useColorPalette();

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{sectionHeadline}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {sectionSubheadline}
          </p>
        </div>

        {/* Alternating Rows */}
        <div className="space-y-16 md:space-y-24">
          {rows.map((row, index) => {
            const isReversed = index % 2 !== 0;
            
            return (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  isReversed ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className={`${isReversed ? 'md:order-2' : 'md:order-1'}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-gray-100">
                    <ImageWithFallback
                      src={row.image}
                      alt={row.imageAlt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className={`${isReversed ? 'md:order-1' : 'md:order-2'}`}>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    {row.headline}
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {row.paragraph}
                  </p>
                  <a
                    href={row.ctaHref}
                    className="inline-flex items-center gap-2 font-semibold text-lg group transition-colors"
                    style={{ color: palette.colors.accent }}
                  >
                    {row.ctaText}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}