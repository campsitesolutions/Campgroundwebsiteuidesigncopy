import { Calendar, Users, Home, Shield, PartyPopper, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { useColorPalette } from '../../hooks/useColorPalette';
import { getContrastTextColor } from '../../utils/colorUtils';

interface Benefit {
  icon: typeof Calendar;
  title: string;
  description: string;
}

interface SeasonalBenefitsIconCardsProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  benefits?: Benefit[];
}

export function SeasonalBenefitsIconCards({
  headline = "Why Choose Seasonal?",
  subheadline = "Make the most of Ontario's beautiful summers with your own seasonal site. It's more than camping—it's a lifestyle.",
  ctaText = "View Available Sites",
  ctaHref = "#rates",
  benefits = [
    {
      icon: Calendar,
      title: 'Season-Long Convenience',
      description: 'Reserve your favorite site for the entire season. No setup or teardown every weekend—just arrive and relax.',
    },
    {
      icon: Users,
      title: 'Community & Friendships',
      description: 'Build lasting friendships with fellow seasonal campers. Join our vibrant community of outdoor enthusiasts.',
    },
    {
      icon: Shield,
      title: 'Secure Storage',
      description: 'Leave your RV and equipment safely stored on-site with peace of mind throughout the season.',
    },
    {
      icon: PartyPopper,
      title: 'Exclusive Events',
      description: 'Access to seasonal-only activities, potlucks, tournaments, and special community gatherings.',
    },
    {
      icon: Star,
      title: 'Priority Booking',
      description: 'Get first choice for site selection and priority booking status for future seasons.',
    },
    {
      icon: CheckCircle,
      title: 'Premium Amenities',
      description: 'Full hookups, premium sites, and access to all campground facilities throughout your stay.',
    },
  ],
}: SeasonalBenefitsIconCardsProps) {
  const palette = useColorPalette();
  const accentTextColor = getContrastTextColor(palette.colors.accent);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{headline}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subheadline}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: palette.colors.accent }}
                >
                  <Icon className="w-7 h-7" style={{ color: accentTextColor }} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-lg"
            style={{ 
              backgroundColor: palette.colors.accent,
              color: accentTextColor
            }}
          >
            {ctaText}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
