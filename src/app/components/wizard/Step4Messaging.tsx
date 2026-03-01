import { useWizard, type PainPoint, type Highlight } from '../../context/WizardContext';
import { AlertCircle, Star, FileText } from 'lucide-react';

interface Step4MessagingProps {
  onNext: () => void;
  onBack: () => void;
}

const PAIN_POINTS: { id: PainPoint; label: string; description: string }[] = [
  { id: 'PP_CALLS', label: 'Too many repetitive phone calls', description: 'Same questions asked repeatedly' },
  { id: 'PP_LOW_SEASONAL', label: 'Low seasonal site bookings', description: 'Struggling to fill seasonal sites' },
  { id: 'PP_LOW_TRAILER', label: 'Low trailer sales/leads', description: 'Not enough trailer inquiries' },
  { id: 'PP_LOW_BOOKINGS', label: 'Low overnight bookings', description: 'Poor online booking conversion' },
  { id: 'PP_OUTDATED', label: 'Website looks outdated', description: 'Design feels old or unprofessional' },
  { id: 'PP_CONFUSION', label: 'Visitors confused by info', description: 'Layout unclear or hard to navigate' },
  { id: 'PP_TRUST', label: 'Credibility/trust issues', description: 'Visitors hesitant to book online' },
  { id: 'PP_HARD_UPDATE', label: 'Difficult to update/maintain', description: 'Need simpler site management' },
  { id: 'PP_SEO', label: 'Poor search visibility', description: 'Not showing up in Google searches' },
];

const HIGHLIGHTS: { id: Highlight; label: string; description: string }[] = [
  { id: 'HL_SCENIC', label: 'Scenic views/waterfront', description: 'Lake, river, or beautiful surroundings' },
  { id: 'HL_POOL', label: 'Pool or water amenities', description: 'Swimming pool, splash pad, or water park' },
  { id: 'HL_EVENTS', label: 'Seasonal events/activities', description: 'Theme weekends, tournaments, parties' },
  { id: 'HL_SPACIOUS', label: 'Large/spacious sites', description: 'Big rigs welcome, pull-through sites' },
  { id: 'HL_FAMILY', label: 'Family-friendly focus', description: 'Kids activities, playgrounds, family events' },
  { id: 'HL_ADULT', label: 'Adult-only or quiet', description: 'Peaceful atmosphere, no kids allowed' },
  { id: 'HL_PREMIUM', label: 'Luxury/premium positioning', description: 'High-end amenities, upscale experience' },
  { id: 'HL_TRAILER_SALES', label: 'Trailer sales/inventory', description: 'RV and trailer sales on-site' },
  { id: 'HL_COTTAGES', label: 'Cottage rentals', description: 'Cabin or cottage rental options' },
  { id: 'HL_AWARD', label: 'Award-winning/highly rated', description: 'Industry awards or top ratings' },
];

export function Step4Messaging({ onNext, onBack }: Step4MessagingProps) {
  const { wizardData, updateWizardData } = useWizard();

  const togglePainPoint = (id: PainPoint) => {
    const current = wizardData.painPoints;
    if (current.includes(id)) {
      updateWizardData({ painPoints: current.filter(p => p !== id) });
    } else if (current.length < 3) {
      updateWizardData({ painPoints: [...current, id] });
    }
  };

  const toggleHighlight = (id: Highlight) => {
    const current = wizardData.highlights;
    if (current.includes(id)) {
      updateWizardData({ highlights: current.filter(h => h !== id) });
    } else if (current.length < 4) {
      updateWizardData({ highlights: [...current, id] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pain Points + Highlights</h2>
        <p className="text-gray-600">Select your biggest challenges and key differentiators</p>
      </div>

      {/* Pain Points */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500" />
          What are your biggest pain points? <span className="text-gray-500 font-normal">(Select up to 3)</span>
        </label>
        <div className="grid grid-cols-1 gap-3">
          {PAIN_POINTS.map(point => {
            const isSelected = wizardData.painPoints.includes(point.id);
            const isDisabled = !isSelected && wizardData.painPoints.length >= 3;
            
            return (
              <button
                key={point.id}
                type="button"
                onClick={() => !isDisabled && togglePainPoint(point.id)}
                disabled={isDisabled}
                className={`text-left p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-red-500 bg-red-50'
                    : isDisabled
                    ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                    : 'border-gray-200 hover:border-red-200 hover:bg-red-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isSelected ? 'border-red-500 bg-red-500' : 'border-gray-300'
                  }`}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{point.label}</div>
                    <div className="text-sm text-gray-600">{point.description}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {wizardData.painPoints.length}/3 selected
        </p>
      </div>

      {/* Highlights */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-500" />
          What do you want to highlight? <span className="text-gray-500 font-normal">(Select up to 4)</span>
        </label>
        <div className="grid grid-cols-1 gap-3">
          {HIGHLIGHTS.map(highlight => {
            const isSelected = wizardData.highlights.includes(highlight.id);
            const isDisabled = !isSelected && wizardData.highlights.length >= 4;
            
            return (
              <button
                key={highlight.id}
                type="button"
                onClick={() => !isDisabled && toggleHighlight(highlight.id)}
                disabled={isDisabled}
                className={`text-left p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50'
                    : isDisabled
                    ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                    : 'border-gray-200 hover:border-amber-200 hover:bg-amber-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isSelected ? 'border-amber-500 bg-amber-500' : 'border-gray-300'
                  }`}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{highlight.label}</div>
                    <div className="text-sm text-gray-600">{highlight.description}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {wizardData.highlights.length}/4 selected
        </p>
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <FileText className="w-4 h-4 text-gray-500" />
          Anything else we should know? <span className="text-gray-500 font-normal">(Optional)</span>
        </label>
        <textarea
          value={wizardData.additionalNotes}
          onChange={(e) => updateWizardData({ additionalNotes: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
          placeholder="Special features, unique selling points, or anything else that makes your park stand out..."
        />
        <p className="text-xs text-gray-500 mt-1">
          Any additional context that would help us personalize your recommendations
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
