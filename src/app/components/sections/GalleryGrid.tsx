import { ImageWithFallback } from '../figma/ImageWithFallback';

export function GalleryGrid() {
  const images = [
    { url: 'https://images.unsplash.com/photo-1605620622858-ea62b0a2059c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', alt: 'Ontario lake camping tent' },
    { url: 'https://images.unsplash.com/photo-1708927764431-eb9ea284a5ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', alt: 'Canadian forest pines' },
    { url: 'https://images.unsplash.com/photo-1747833423201-5daa71aacc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', alt: 'Muskoka cottage dock' },
    { url: 'https://images.unsplash.com/photo-1635902991114-19ad41bce874?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', alt: 'Algonquin Park Ontario' },
    { url: 'https://images.unsplash.com/photo-1504201958709-5df18407bb4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', alt: 'Canadian campfire sunset' },
    { url: 'https://images.unsplash.com/photo-1564934926690-c075eaf3cc3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', alt: 'Ontario provincial park' },
    { url: 'https://images.unsplash.com/photo-1762130099350-fe6c5325dd01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', alt: 'Canadian wilderness camping' },
    { url: 'https://images.unsplash.com/photo-1584680678084-6dcd6e1baaff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', alt: 'Georgian Bay sunset' },
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See Our Park</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the beauty and comfort of our campground.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="aspect-square overflow-hidden rounded-lg">
              <ImageWithFallback
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}