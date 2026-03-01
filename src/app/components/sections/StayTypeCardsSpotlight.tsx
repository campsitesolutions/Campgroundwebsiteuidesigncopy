import { Calendar, Home, Tent, ArrowRight, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface FeaturedStayType {
  icon: typeof Calendar;
  image: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
}

interface StayType {
  icon: typeof Tent | typeof Home;
  image: string;
  title: string;
  description: string;
  cta: string;
  href: string;
}

interface StayTypeCardsSpotlightProps {
  headline?: string;
  subheadline?: string;
  featured?: FeaturedStayType;
  stayTypes?: StayType[];
}

export function StayTypeCardsSpotlight({
  headline = "Choose Your Stay",
  subheadline = "Whether it's a quick getaway or a full season, we have the perfect option for you.",
  featured = {
    icon: Calendar,
    image: 'https://images.unsplash.com/photo-1588100249910-3bbdd5cec019?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    title: 'Seasonal Sites',
    description: 'Make us your home for the season with premium amenities and a vibrant community.',
    features: [
      'May through October availability',
      'Premium full hookup sites',
      'Community events & activities',
      'Dedicated seasonal community',
    ],
    cta: 'View Seasonal Options',
    href: '#rates',
  },
  stayTypes = [
    {
      icon: Tent,
      image: 'https://images.unsplash.com/photo-1605620622858-ea62b0a2059c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      title: 'Overnight Camping',
      description: 'Perfect for weekend getaways and short trips. Full hookups available.',
      cta: 'Book Overnight',
      href: '#rates',
    },
    {
      icon: Home,
      image: 'https://images.unsplash.com/photo-1625926144749-11eef44b0cdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      title: 'Cottage Rentals',
      description: 'Fully equipped cottages with all the comforts of home.',
      cta: 'Explore Cottages',
      href: '#contact',
    },
  ],
}: StayTypeCardsSpotlightProps) {
  const FeaturedIcon = featured.icon;

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

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Featured Large Card - Left */}
          <div className="lg:row-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col hover:shadow-2xl transition-shadow duration-300">
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-6 left-6 bg-emerald-700 text-white px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wide">
                  Featured
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
                  <FeaturedIcon className="w-8 h-8 text-emerald-700" />
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold mb-4">{featured.title}</h3>

                {/* Description */}
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  {featured.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {featured.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href={featured.href}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors w-full"
                >
                  {featured.cta}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Smaller Cards - Right (Stacked) */}
          {stayTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div key={type.title}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={type.image}
                      alt={type.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-emerald-700" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-3">{type.title}</h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                      {type.description}
                    </p>

                    {/* CTA Link */}
                    <a
                      href={type.href}
                      className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-semibold text-lg group"
                    >
                      {type.cta}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}