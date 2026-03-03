import { useState, useEffect } from 'react';
import { useWizard, AddOnModel } from '../../context/WizardContext';
import { Tent, Home, Truck, Building2 } from 'lucide-react';

interface Step2BusinessModelProps {
  onNext: () => void;
  onBack: () => void;
}

const additionalRevenues: { id: AddOnModel; label: string; icon: typeof Tent; description: string }[] = [
  { id: 'overnight', label: 'Overnight Camping', icon: Tent, description: 'Short-term stays & transient' },
  { id: 'trailer-sales', label: 'Trailer Sales', icon: Truck, description: 'RV & trailer dealership' },
  { id: 'cottage-rentals', label: 'Cottage Rentals', icon: Building2, description: 'Cabin & cottage accommodations' },
];

export function Step2BusinessModel({ onNext, onBack }: Step2BusinessModelProps) {
  const { wizardData, updateWizardData } = useWizard();
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-set seasonal as primary business model when component mounts
  useEffect(() => {
    if (!wizardData.primaryBusinessModel) {
      updateWizardData({ primaryBusinessModel: 'seasonal' });
    }
  }, []);

  const validate = () => {
    // No validation needed - seasonal is auto-set and add-ons are optional
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  const toggleAddOn = (model: AddOnModel) => {
    const current = wizardData.secondaryBusinessModels;
    if (current.includes(model)) {
      updateWizardData({ secondaryBusinessModels: current.filter(m => m !== model) });
    } else {
      updateWizardData({ secondaryBusinessModels: [...current, model] });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Model</h2>
        <p className="text-gray-600">This system is optimized for seasonal-focused parks. Select any additional offerings below.</p>
      </div>

      {/* Additional Revenue Streams */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Additional Revenue Streams (Optional)
        </label>
        <p className="text-sm text-gray-600 mb-3">Select all that apply</p>
        <div className="space-y-3">
          {additionalRevenues.map((model) => {
            const Icon = model.icon;
            const isSelected = wizardData.secondaryBusinessModels.includes(model.id);
            return (
              <label
                key={model.id}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-300 hover:border-gray-400 bg-white'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleAddOn(model.id)}
                  className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <div className={`p-2 rounded ${isSelected ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{model.label}</div>
                  <div className="text-sm text-gray-600">{model.description}</div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          Next Step →
        </button>
      </div>
    </form>
  );
}