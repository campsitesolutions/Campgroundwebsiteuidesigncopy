import { useState } from 'react';
import { useWizard, Goal, Audience } from '../../context/WizardContext';
import { Target, Users, Heart, UserCircle, Mountain } from 'lucide-react';

interface Step3GoalsProps {
  onNext: () => void;
  onBack: () => void;
}

const goals: { id: Goal; label: string; description: string }[] = [
  { id: 'bookings', label: 'Bookings', description: 'Drive direct reservations' },
  { id: 'inquiries', label: 'Inquiries', description: 'Generate phone calls & emails' },
  { id: 'trailer-leads', label: 'Trailer Leads', description: 'Capture sales leads' },
];

const audiences: { id: Audience; label: string; icon: typeof Users }[] = [
  { id: 'families', label: 'Families', icon: Users },
  { id: 'couples', label: 'Couples', icon: Heart },
  { id: 'snowbirds', label: 'Snowbirds', icon: UserCircle },
  { id: 'retirees', label: 'Retirees', icon: UserCircle },
  { id: 'outdoor-adventurers', label: 'Outdoor Adventurers', icon: Mountain },
];

export function Step3Goals({ onNext, onBack }: Step3GoalsProps) {
  const { wizardData, updateWizardData } = useWizard();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!wizardData.primaryGoal) {
      newErrors.primaryGoal = 'Please select your primary goal';
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

  const toggleAudience = (audience: Audience) => {
    const current = wizardData.targetAudiences;
    if (current.includes(audience)) {
      updateWizardData({ targetAudiences: current.filter(a => a !== audience) });
    } else {
      updateWizardData({ targetAudiences: [...current, audience] });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Goals + Audience</h2>
        <p className="text-gray-600">What do you want your website to achieve?</p>
      </div>

      {/* Primary Goal */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Target className="w-4 h-4 text-gray-500" />
          Primary Goal *
        </label>
        <div className="space-y-3">
          {goals.map((goal) => {
            const isSelected = wizardData.primaryGoal === goal.id;
            return (
              <button
                key={goal.id}
                type="button"
                onClick={() => {
                  updateWizardData({ primaryGoal: goal.id });
                  setErrors(prev => ({ ...prev, primaryGoal: '' }));
                }}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200'
                    : 'border-gray-300 hover:border-blue-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{goal.label}</div>
                    <div className="text-sm text-gray-600 mt-1">{goal.description}</div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      ✓
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        {errors.primaryGoal && (
          <p className="text-red-600 text-sm mt-2">{errors.primaryGoal}</p>
        )}
      </div>

      {/* Secondary Goal */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Secondary Goal (Optional)
        </label>
        <select
          value={wizardData.secondaryGoal}
          onChange={(e) => updateWizardData({ secondaryGoal: e.target.value as Goal | '' })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select a secondary goal</option>
          {goals
            .filter(g => g.id !== wizardData.primaryGoal)
            .map((goal) => (
              <option key={goal.id} value={goal.id}>
                {goal.label} - {goal.description}
              </option>
            ))}
        </select>
      </div>

      {/* Target Audiences */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-500" />
          Target Audience (Optional)
        </label>
        <p className="text-sm text-gray-600 mb-3">Select all that apply</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {audiences.map((audience) => {
            const Icon = audience.icon;
            const isSelected = wizardData.targetAudiences.includes(audience.id);
            return (
              <label
                key={audience.id}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-300 hover:border-gray-400 bg-white'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleAudience(audience.id)}
                  className="sr-only"
                />
                <div className={`p-3 rounded-full ${isSelected ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-sm font-semibold text-gray-900 text-center">
                  {audience.label}
                </div>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                )}
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
