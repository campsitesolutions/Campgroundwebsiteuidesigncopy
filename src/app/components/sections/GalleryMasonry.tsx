import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useState } from 'react';

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryMasonryProps {
  headline?: string;
  subheadline?: string;
  images?: GalleryImage[];
}

export function GalleryMasonry({
  headline = "Gallery",
  subheadline = "Explore our beautiful campground through photos from our community.",
  images = [
    {
      src: 'https://images.unsplash.com/photo-1692469487396-b2094bfe4689?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      alt: 'Aerial view of Ontario campground',
    },
    {
      src: 'https://images.unsplash.com/photo-1504201958709-5df18407bb4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      alt: 'Evening campfire Canadian lake',
    },
    {
      src: 'https://images.unsplash.com/photo-1605620622858-ea62b0a2059c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      alt: 'Tent camping Ontario forest',
    },
    {
      src: 'https://images.unsplash.com/photo-1708927764431-eb9ea284a5ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      alt: 'Canadian pine forest wilderness',
    },
    {
      src: 'https://images.unsplash.com/photo-1747833423201-5daa71aacc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      alt: 'Muskoka lake cottage dock',
    },
    {
      src: 'https://images.unsplash.com/photo-1635902991114-19ad41bce874?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      alt: 'Algonquin Park Ontario',
    },
    {
      src: 'https://images.unsplash.com/photo-1564934926690-c075eaf3cc3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      alt: 'Ontario provincial park scenery',
    },
    {
      src: 'https://images.unsplash.com/photo-1762130099350-fe6c5325dd01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      alt: 'Canadian wilderness camping',
    },
    {
      src: 'https://images.unsplash.com/photo-1584680678084-6dcd6e1baaff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      alt: 'Georgian Bay sunset',
    },
    {
      src: 'https://images.unsplash.com/photo-1601662408847-2b3f79efb76c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      alt: 'Ontario lake camping scenic',
    },
    {
      src: 'https://images.unsplash.com/photo-1761010785765-7c9ccb8a44b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      alt: 'RV camping Ontario park',
    },
    {
      src: 'https://images.unsplash.com/photo-1692469487396-b2094bfe4689?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      alt: 'Canadian campground overview',
    },
  ],
}: GalleryMasonryProps) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set([...prev, index]));
  };

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

        {/* Masonry Grid */}
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 640: 2, 768: 3, 1024: 4 }}
        >
          <Masonry gutter="16px">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-md bg-gray-200 group cursor-pointer"
              >
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className={`w-full h-auto block transition-all duration-500 group-hover:scale-110 ${
                    loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(index)}
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </section>
  );
}