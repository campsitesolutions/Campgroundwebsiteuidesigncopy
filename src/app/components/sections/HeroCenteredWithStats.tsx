import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface StatItem {
  number: string;
  label: string;
}

interface HeroCenteredWithStatsProps {
  headline: string;
  supportingText: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  stats?: StatItem[];
  backgroundImage?: string;
}

export function HeroCenteredWithStats({
  headline = "Discover Your Perfect Seasonal Retreat",
  supportingText = "Experience the tranquility of lakeside camping with all the comforts of home. Reserve your seasonal site for an unforgettable summer.",
  primaryCTA = {
    text: "View Available Sites",
    href: "#contact"
  },
  stats = [
    { number: "200+", label: "Seasonal Sites" },
    { number: "25", label: "Years of Service" },
    { number: "4.9★", label: "Guest Rating" }
  ],
  backgroundImage = "https://images.unsplash.com/photo-1584680678084-6dcd6e1baaff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
}: HeroCenteredWithStatsProps) {
  return (
    <section className="relative w-full min-h-[700px] flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={backgroundImage}
          alt="Scenic campground background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Subtle Overlay */}
      <div className="absolute inset-0 z-10 bg-gray-900/40" />

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 py-24 text-center">
        {/* Main Content */}
        <div className="mb-16">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            {headline}
          </h1>

          {/* Supporting Text */}
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            {supportingText}
          </p>

          {/* Primary CTA */}
          <a
            href={primaryCTA.href}
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-gray-900 font-bold text-lg rounded-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-200"
          >
            {primaryCTA.text}
            <ArrowRight className="w-6 h-6" />
          </a>
        </div>

        {/* Stats Row */}
        <div className="border-t border-white/20 pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base font-medium text-white/80 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}