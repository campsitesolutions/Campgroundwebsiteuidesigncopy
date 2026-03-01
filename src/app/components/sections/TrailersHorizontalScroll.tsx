import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useRef, useState } from 'react';

interface TrailerCard {
  id: string;
  image: string;
  name: string;
  model: string;
  price: string;
  badge?: string;
  href: string;
}

interface TrailersHorizontalScrollProps {
  headline?: string;
  subheadline?: string;
  trailers?: TrailerCard[];
}

export function TrailersHorizontalScroll({
  headline = "Explore Our Trailer Collection",
  subheadline = "Browse our curated selection of quality trailers ready for your camping adventures.",
  trailers = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1722199672067-b53b2359fba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBSViUyMHRyYWlsZXIlMjBzdW5zZXR8ZW58MXx8fHwxNzcxNzk1MDk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Grand Design Reflection',
      model: "2024 38' Fifth Wheel",
      price: '$68,500',
      badge: 'Featured',
      href: '#contact',
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1739257599500-85ff0ff1b359?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0cmF2ZWwlMjB0cmFpbGVyJTIwY2FtcGdyb3VuZHxlbnwxfHx8fDE3NzE3OTUwOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Forest River Salem',
      model: "2023 32' Travel Trailer",
      price: '$42,900',
      href: '#contact',
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1650951088885-de907072bd46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWZ0aCUyMHdoZWVsJTIwUlYlMjBwYXJrZWR8ZW58MXx8fHwxNzcxNzk1MDk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Jayco Eagle',
      model: "2023 35' Fifth Wheel",
      price: '$56,900',
      href: '#contact',
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1764565689058-b7f6ff624f19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJzdHJlYW0lMjB0cmFpbGVyJTIwc2NlbmljfGVufDF8fHx8MTc3MTc5NTA5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Airstream Flying Cloud',
      model: "2024 30' Travel Trailer",
      price: '$125,000',
      badge: 'New',
      href: '#contact',
    },
    {
      id: '5',
      image: 'https://images.unsplash.com/photo-1591447722629-2d3ecd3b2d62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1waW5nJTIwdHJhaWxlciUyMG1vdW50YWluc3xlbnwxfHx8fDE3NzE3OTUwOTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Keystone Hideout',
      model: "2022 28' Travel Trailer",
      price: '$34,900',
      href: '#contact',
    },
    {
      id: '6',
      image: 'https://images.unsplash.com/photo-1721931373745-861d4cc7e629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSViUyMG1vdG9yaG9tZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MTc5NTA5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Coachmen Catalina',
      model: "2022 26' Travel Trailer",
      price: '$29,900',
      href: '#contact',
    },
  ],
}: TrailersHorizontalScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 400;
    const newScrollLeft = direction === 'left'
      ? scrollContainerRef.current.scrollLeft - scrollAmount
      : scrollContainerRef.current.scrollLeft + scrollAmount;
    
    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{headline}</h2>
          <p className="text-xl text-gray-600">{subheadline}</p>
        </div>

        {/* Scroll Container with Navigation */}
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white shadow-lg rounded-full p-3 transition-all hover:scale-110"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-gray-900" />
            </button>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white shadow-lg rounded-full p-3 transition-all hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-gray-900" />
            </button>
          )}

          {/* Horizontal Scroll Container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {trailers.map((trailer) => (
              <div
                key={trailer.id}
                className="flex-shrink-0 w-[340px] sm:w-[380px] snap-start group"
              >
                {/* Image Card with Overlay */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-900 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  {/* Background Image */}
                  <ImageWithFallback
                    src={trailer.image}
                    alt={`${trailer.name} ${trailer.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Badge (if present) */}
                  {trailer.badge && (
                    <div className="absolute top-4 left-4 bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-bold text-sm uppercase tracking-wide">
                      {trailer.badge}
                    </div>
                  )}

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Name & Model */}
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {trailer.name}
                    </h3>
                    <p className="text-white/90 mb-4">
                      {trailer.model}
                    </p>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-white">
                        {trailer.price}
                      </div>
                      <a
                        href={trailer.href}
                        className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-900 px-5 py-3 rounded-lg font-semibold transition-colors"
                      >
                        Details
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

      {/* Custom CSS to hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
