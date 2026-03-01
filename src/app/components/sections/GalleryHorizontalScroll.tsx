import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryHorizontalScrollProps {
  headline?: string;
  subheadline?: string;
  images?: GalleryImage[];
}

export function GalleryHorizontalScroll({
  headline = "Explore Our Campground",
  subheadline = "Scroll through our collection of beautiful campground moments.",
  images = [
    {
      src: 'https://images.unsplash.com/photo-1583250847032-01140ecd9ac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSViUyMGNhbXBncm91bmQlMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc3MTc5NjA4OXww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Aerial view of RV campground',
    },
    {
      src: 'https://images.unsplash.com/photo-1569918970203-ea053ffda098?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wZmlyZSUyMGV2ZW5pbmclMjBzdW5zZXR8ZW58MXx8fHwxNzcxNzk2MDg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Evening campfire at sunset',
    },
    {
      src: 'https://images.unsplash.com/photo-1627750166999-9283873db419?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW50JTIwY2FtcGluZyUyMGZvcmVzdCUyMG1vcm5pbmd8ZW58MXx8fHwxNzcxNzk2MDg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Tent camping in forest morning',
    },
    {
      src: 'https://images.unsplash.com/photo-1630139026564-4a2bf5670879?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwcGxheWluZyUyMGNhbXBncm91bmQlMjBwbGF5Z3JvdW5kfGVufDF8fHx8MTc3MTc5NjA4OXww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Kids playing at playground',
    },
    {
      src: 'https://images.unsplash.com/photo-1629711129507-d09c820810b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjByZXNvcnQlMjBzdW1tZXJ8ZW58MXx8fHwxNzcxNzk2MDkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Swimming pool in summer',
    },
    {
      src: 'https://images.unsplash.com/photo-1596742910522-4e3f36ebb393?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wZ3JvdW5kJTIwYW1lbml0aWVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcxNzk2MDkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Campground amenities building',
    },
    {
      src: 'https://images.unsplash.com/photo-1761792672925-d748c292e19a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwa2F5YWtpbmclMjB3YXRlciUyMHJlY3JlYXRpb258ZW58MXx8fHwxNzcxNzk2MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Kayaking on the lake',
    },
    {
      src: 'https://images.unsplash.com/photo-1759671003469-b318fa25034a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBiaWtpbmclMjB0cmFpbCUyMG91dGRvb3J8ZW58MXx8fHwxNzcxNzk2MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Family biking on trail',
    },
    {
      src: 'https://images.unsplash.com/photo-1749008078593-418ca225b82b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSViUyMGNhbXBzaXRlJTIwc2V0dXAlMjBldmVuaW5nfGVufDF8fHx8MTc3MTc5NjA5MXww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'RV campsite setup in evening',
    },
    {
      src: 'https://images.unsplash.com/photo-1766487444157-a0c9ac0e5fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wZ3JvdW5kJTIwbmF0dXJlJTIwc2NlbmljJTIwdmlld3xlbnwxfHx8fDE3NzE3OTYwOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Scenic nature view',
    },
    {
      src: 'https://images.unsplash.com/photo-1765118384650-7660293e74f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwcmVjcmVhdGlvbiUyMHBhcmslMjBhY3Rpdml0aWVzfGVufDF8fHx8MTc3MTc5NjA5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Outdoor recreation activities',
    },
    {
      src: 'https://images.unsplash.com/photo-1642609675285-f1a62bbe0f94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1waW5nJTIwc3Vuc2V0JTIwZ29sZGVuJTIwaG91cnxlbnwxfHx8fDE3NzE3OTYwOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Camping at golden hour sunset',
    },
  ],
}: GalleryHorizontalScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set([...prev, index]));
  };

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScroll();
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 md:py-20 bg-gray-900 relative overflow-hidden">
      {/* Section Header */}
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{headline}</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {subheadline}
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative group">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Scrollable Images */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-8 pb-4"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 relative overflow-hidden rounded-xl shadow-2xl bg-gray-800 group/item"
              style={{ width: '85vw', maxWidth: '600px', height: '400px' }}
            >
              <ImageWithFallback
                src={image.src}
                alt={image.alt}
                className={`w-full h-full object-cover transition-all duration-700 group-hover/item:scale-105 ${
                  loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(index)}
              />
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="container mx-auto px-4 mt-6">
        <div className="flex justify-center gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-white/30"
            />
          ))}
        </div>
      </div>

      {/* CSS to hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
