import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface HeroCinematicOverlayProps {
  seasonalTagline?: string;
  headline: string;
  supportingText: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
}

export function HeroCinematicOverlay({
  seasonalTagline = "2025 Season Now Booking",
  headline = "Where Summer Becomes a Way of Life.",
  supportingText = "Secure your seasonal site and enjoy waterfront mornings, campfire evenings, and a community that returns year after year.",
  primaryCTA = {
    text: "Explore Seasonal Living",
    href: "#contact"
  },
  secondaryCTA = {
    text: "Book a Tour",
    href: "#amenities"
  },
  backgroundImage = "https://images.unsplash.com/photo-1504201958709-5df18407bb4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
}: HeroCinematicOverlayProps) {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={backgroundImage}
          alt="Scenic campground view"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-gray-900/60 via-gray-900/50 to-gray-900/70" />

      {/* Content Container */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        {/* Seasonal Tagline */}
        {seasonalTagline && (
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white">
              {seasonalTagline}
            </span>
          </div>
        )}

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
          {headline}
        </h1>

        {/* Supporting Text */}
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          {supportingText}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary CTA */}
          <a
            href={primaryCTA.href}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            {primaryCTA.text}
            <ArrowRight className="w-5 h-5" />
          </a>

          {/* Secondary CTA */}
          <a
            href={secondaryCTA.href}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 hover:border-white/40 transition-all duration-200"
          >
            {secondaryCTA.text}
          </a>
        </div>
      </div>

      {/* Scroll Indicator (Optional Enhancement) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:block">
        <div className="flex flex-col items-center gap-2 text-white/60 animate-bounce">
          <span className="text-xs font-medium tracking-wide">SCROLL</span>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}