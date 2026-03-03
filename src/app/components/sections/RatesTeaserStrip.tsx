import { DollarSign, Calendar, Users, Home } from 'lucide-react';
import { useColorPalette } from '../../hooks/useColorPalette';
import { getContrastTextColor } from '../../utils/colorUtils';

export function RatesTeaserStrip() {
  const palette = useColorPalette();
  const accentTextColor = getContrastTextColor(palette.colors.accent);
  
  // Define all rate blocks - always show all three
  const rates = [
    {
      model: 'overnight',
      icon: DollarSign,
      label: 'Overnight Sites',
      price: '$45/night',
      detail: 'Full hookup included',
    },
    {
      model: 'seasonal',
      icon: Calendar,
      label: 'Seasonal Sites',
      price: '$3,200/season',
      detail: 'May 1 – October 31',
    },
    {
      model: 'cottage-rentals',
      icon: Home,
      label: 'Cottage Rentals',
      price: '$125/night',
      detail: 'Weekly rates available',
    },
  ];
  
  return (
    <section 
      className="py-12"
      style={{ 
        backgroundColor: palette.colors.accent,
        color: accentTextColor
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-8 text-center md:grid-cols-3">
          {rates.map((rate) => {
            const Icon = rate.icon;
            return (
              <div key={rate.model}>
                <Icon className="w-12 h-12 mx-auto mb-3" />
                <p className="text-sm uppercase tracking-wide mb-1 opacity-80">{rate.label}</p>
                <p className="text-3xl font-bold">{rate.price}</p>
                <p className="opacity-80 mt-1">{rate.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}