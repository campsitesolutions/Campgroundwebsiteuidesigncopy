import { useState } from 'react';
import { useWizard, BusinessModel } from '../../context/WizardContext';
import { Tent, Home, Truck, Building2 } from 'lucide-react';

interface Step2BusinessModelProps {
  onNext: () => void;
  onBack: () => void;
}

const businessModels: { id: BusinessModel; label: string; icon: typeof Tent; description: string }[] = [
  { id: 'seasonal', label: 'Seasonal Sites', icon: Home, description: 'Long-term seasonal camping' },
  { id: 'overnight', label: 'Overnight Camping', icon: Tent, description: 'Short-term stays & transient' },
  { id: 'trailer-sales', label: 'Trailer Sales', icon: Truck, description: 'RV & trailer dealership' },
  { id: 'cottage-rentals', label: 'Cottage Rentals', icon: Building2, description: 'Cabin & cottage accommodations' },
];

export function Step2BusinessModel({ onNext, onBack }: Step2BusinessModelProps) {
  const { wizardData, updateWizardData } = useWizard();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!wizardData.primaryBusinessModel) {
      newErrors.primaryBusinessModel = 'Please select your primary business model';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  const toggleSecondary = (model: BusinessModel) => {
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
        <p className="text-gray-600">Help us understand your primary revenue source</p>
      </div>

      {/* Primary Business Model */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Primary Business Model *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {businessModels.map((model) => {
            const Icon = model.icon;
            const isSelected = wizardData.primaryBusinessModel === model.id;
            return (
              <button
                key={model.id}
                type="button"
                onClick={() => {
                  updateWizardData({ primaryBusinessModel: model.id });
                  setErrors(prev => ({ ...prev, primaryBusinessModel: '' }));
                }}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200'
                    : 'border-gray-300 hover:border-blue-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 flex items-center gap-2">
                      {model.label}
                      {isSelected && <span className="text-blue-600">✓</span>}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{model.description}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        {errors.primaryBusinessModel && (
          <p className="text-red-600 text-sm mt-2">{errors.primaryBusinessModel}</p>
        )}
      </div>

      {/* Secondary Business Models */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Secondary Business Models (Optional)
        </label>
        <p className="text-sm text-gray-600 mb-3">Select all that apply</p>
        <div className="space-y-2">
          {businessModels
            .filter(m => m.id !== wizardData.primaryBusinessModel)
            .map((model) => {
              const Icon = model.icon;
              const isSelected = wizardData.secondaryBusinessModels.includes(model.id);
              return (
                <label
                  key={model.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-300 hover:border-gray-400 bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSecondary(model.id)}
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
