import { DollarSign, Calendar, Users, Home } from 'lucide-react';
import { useColorPalette } from '../../hooks/useColorPalette';
import { getContrastTextColor } from '../../utils/colorUtils';
import { useWizard } from '../../context/WizardContext';

export function RatesTeaserStrip() {
  const palette = useColorPalette();
  const accentTextColor = getContrastTextColor(palette.colors.accent);
  const { wizardData } = useWizard();
  
  // Compute allowed models
  const allowedModels = new Set<string>();
  if (wizardData.primaryBusinessModel) {
    allowedModels.add(wizardData.primaryBusinessModel);
  }
  wizardData.secondaryBusinessModels.forEach(model => allowedModels.add(model));
  
  // Define all rate blocks
  const allRates = [
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
  
  // Filter rates based on allowed models
  const rates = allRates.filter(rate => allowedModels.has(rate.model));
  
  // If no rates to show, return null
  if (rates.length === 0) {
    return null;
  }
  
  // Add a "Group Rates" or "Contact Us" block if we have room and multiple models
  const showContactBlock = rates.length < 3;
  
  return (
    <section 
      className="py-12"
      style={{ 
        backgroundColor: palette.colors.accent,
        color: accentTextColor
      }}
    >
      <div className="container mx-auto px-4">
        <div className={`grid gap-8 text-center ${rates.length === 1 ? 'md:grid-cols-1 max-w-md mx-auto' : rates.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
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
          {showContactBlock && (
            <div>
              <Users className="w-12 h-12 mx-auto mb-3" />
              <p className="text-sm uppercase tracking-wide mb-1 opacity-80">Group Rates</p>
              <p className="text-3xl font-bold">Contact Us</p>
              <p className="opacity-80 mt-1">Special pricing available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}