import { Calendar, Home, Tent, ArrowRight } from 'lucide-react';
import { useColorPalette } from '../../hooks/useColorPalette';
import { Button } from '../ui/button';

// Three-card layout showcasing overnight, seasonal, and cottage options
export function StayTypeCards() {
  const palette = useColorPalette();
  
  // ALWAYS show all three stay types - this is promotional content
  const stayTypes = [
    {
      icon: Tent,
      title: 'Overnight Camping',
      description: 'Perfect for weekend getaways and short trips. Full hookups available.',
      cta: 'Book Overnight',
    },
    {
      icon: Calendar,
      title: 'Seasonal Sites',
      description: 'Make us your home for the season. May through October availability.',
      cta: 'View Seasonal',
    },
    {
      icon: Home,
      title: 'Cottage Rentals',
      description: 'Fully equipped cottages with all the comforts of home.',
      cta: 'Explore Cottages',
    },
  ];

  return (
    <section className="py-[88px] bg-[var(--background-muted)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-4">Choose Your Stay</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Whether it's a quick getaway or a full season, we have the perfect option for you.
          </p>
        </div>

        {/* Three-card layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {stayTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div
                key={type.title}
                className="bg-white rounded-lg p-8 shadow-[0_8px_24px_0_rgb(0_0_0/0.1)] hover:shadow-[0_12px_32px_0_rgb(0_0_0/0.15)] transition-shadow border border-gray-100"
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${palette.colors.accent}33` }}
                >
                  <Icon className="w-8 h-8" style={{ color: palette.colors.primary }} />
                </div>
                <h3 className="mb-3">{type.title}</h3>
                <p className="text-[var(--text-secondary)] mb-6">{type.description}</p>
                <Button 
                  variant="ds-secondary"
                  className="w-full justify-center"
                  href="#rates"
                >
                  {type.cta}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}