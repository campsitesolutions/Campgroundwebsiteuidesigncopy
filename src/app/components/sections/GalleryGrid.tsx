import { ImageWithFallback } from '../figma/ImageWithFallback';

export function GalleryGrid() {
  const images = [
    { url: 'https://images.unsplash.com/photo-1605620622858-ea62b0a2059c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', alt: 'Ontario lake camping tent' },
    { url: 'https://images.unsplash.com/photo-1708927764431-eb9ea284a5ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', alt: 'Canadian forest pines' },
    { url: 'https://images.unsplash.com/photo-1747833423201-5daa71aacc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', alt: 'Muskoka cottage dock' },
    { url: 'https://images.unsplash.com/photo-1635902991114-19ad41bce874?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', alt: 'Algonquin Park Ontario' },
    { url: 'https://images.unsplash.com/photo-1504201958709-5df18407bb4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', alt: 'Canadian campfire sunset' },
    { url: 'https://images.unsplash.com/photo-1564934926690-c075eaf3cc3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', alt: 'Ontario provincial park' },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See Our Park</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the beauty and comfort of our campground.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-xl shadow-lg group">
              <ImageWithFallback
                src={image.url}
                alt={image.alt}
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}