import { useColorPalette } from '../../hooks/useColorPalette';

interface Stat {
  number: string;
  label: string;
  subtext?: string;
}

interface SeasonalBenefitsStatsProps {
  headline?: string;
  subheadline?: string;
  stats?: Stat[];
}

export function SeasonalBenefitsStats({
  headline = "Seasonal Camping by the Numbers",
  subheadline = "Join a thriving community of campers who have made us their summer home.",
  stats = [
    {
      number: '150+',
      label: 'Seasonal Sites',
      subtext: 'Premium locations',
    },
    {
      number: '6',
      label: 'Month Season',
      subtext: 'May to October',
    },
    {
      number: '95%',
      label: 'Return Rate',
      subtext: 'Year over year',
    },
    {
      number: '25+',
      label: 'Years Experience',
      subtext: 'Family operated',
    },
  ],
}: SeasonalBenefitsStatsProps) {
  const palette = useColorPalette();

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{headline}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subheadline}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center"
            >
              {/* Number */}
              <div
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 tracking-tight"
                style={{ color: palette.colors.accent }}
              >
                {stat.number}
              </div>

              {/* Label */}
              <div className="text-xl md:text-2xl font-bold mb-2">
                {stat.label}
              </div>

              {/* Subtext */}
              {stat.subtext && (
                <div className="text-base text-gray-600">
                  {stat.subtext}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Optional Divider Line */}
        <div className="mt-12 md:mt-16 pt-12 md:pt-16 border-t border-gray-200">
          <p className="text-center text-lg text-gray-700 max-w-2xl mx-auto">
            <strong>Ready to become a seasonal camper?</strong> Reserve your site today and experience the freedom and community that comes with seasonal living.
          </p>
        </div>
      </div>
    </section>
  );
}
