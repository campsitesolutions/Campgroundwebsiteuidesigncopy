import { useWizard } from '../../context/WizardContext';
import { MessageSquare, Star, FileText } from 'lucide-react';

interface Step4MessagingProps {
  onNext: () => void;
  onBack: () => void;
}

export function Step4Messaging({ onNext, onBack }: Step4MessagingProps) {
  const { wizardData, updateWizardData } = useWizard();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Messaging + Pain Points</h2>
        <p className="text-gray-600">Help us understand your unique selling points and challenges</p>
      </div>

      {/* Pain Points */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-gray-500" />
          What are your pain points?
        </label>
        <textarea
          value={wizardData.painPoints}
          onChange={(e) => updateWizardData({ painPoints: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
          placeholder="Outdated site, too many calls, hard to update…"
        />
        <p className="text-xs text-gray-500 mt-1">
          e.g., Old website design, difficulty managing bookings, low conversion rate
        </p>
      </div>

      {/* Highlights */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <Star className="w-4 h-4 text-gray-500" />
          What do you want to highlight?
        </label>
        <textarea
          value={wizardData.highlights}
          onChange={(e) => updateWizardData({ highlights: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
          placeholder="New pool, theme weekends, big sites…"
        />
        <p className="text-xs text-gray-500 mt-1">
          e.g., Premium amenities, family activities, waterfront sites, pet-friendly
        </p>
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <FileText className="w-4 h-4 text-gray-500" />
          Anything else we should know?
        </label>
        <textarea
          value={wizardData.additionalNotes}
          onChange={(e) => updateWizardData({ additionalNotes: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
          placeholder="Special features, target demographics, competitive advantages…"
        />
        <p className="text-xs text-gray-500 mt-1">
          Any other details that would help us personalize your experience
        </p>
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
          className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
        >
          Review Summary →
        </button>
      </div>
    </form>
  );
}
