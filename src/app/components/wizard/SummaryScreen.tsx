import { useWizard } from '../../context/WizardContext';
import { CheckCircle, Building, Target, Users, MessageSquare } from 'lucide-react';

interface SummaryScreenProps {
  onBack: () => void;
  onContinue: () => void;
}

const businessModelLabels: Record<string, string> = {
  seasonal: 'Seasonal Sites',
  overnight: 'Overnight Camping',
  'trailer-sales': 'Trailer Sales',
  'cottage-rentals': 'Cottage Rentals',
};

const goalLabels: Record<string, string> = {
  bookings: 'Bookings',
  inquiries: 'Inquiries',
  'trailer-leads': 'Trailer Leads',
};

const audienceLabels: Record<string, string> = {
  families: 'Families',
  couples: 'Couples',
  snowbirds: 'Snowbirds',
  retirees: 'Retirees',
  'outdoor-adventurers': 'Outdoor Adventurers',
};

export function SummaryScreen({ onBack, onContinue }: SummaryScreenProps) {
  const { wizardData } = useWizard();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 text-white rounded-full mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Perfect! Here's What We Learned
          </h1>
          <p className="text-lg text-gray-600">
            We'll use this information to personalize your section recommendations
          </p>
        </div>

        {/* Summary Cards */}
        <div className="space-y-4">
          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Contact + Identity</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Campground Name</p>
                <p className="font-semibold text-gray-900">{wizardData.campgroundName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Your Name</p>
                <p className="font-semibold text-gray-900">{wizardData.yourName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-900">{wizardData.email}</p>
              </div>
              {wizardData.phone && (
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">{wizardData.phone}</p>
                </div>
              )}
              {wizardData.websiteUrl && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">Current Website</p>
                  <p className="font-semibold text-gray-900 truncate">{wizardData.websiteUrl}</p>
                </div>
              )}
            </div>
          </div>

          {/* Business Model */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Business Model</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Primary Model</p>
                <p className="font-semibold text-gray-900">
                  {businessModelLabels[wizardData.primaryBusinessModel]}
                </p>
              </div>
              {wizardData.secondaryBusinessModels.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600">Secondary Models</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {wizardData.secondaryBusinessModels.map((model) => (
                      <span
                        key={model}
                        className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold"
                      >
                        {businessModelLabels[model]}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Goals + Audience */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Goals + Audience</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Primary Goal</p>
                <p className="font-semibold text-gray-900">{goalLabels[wizardData.primaryGoal]}</p>
              </div>
              {wizardData.secondaryGoal && (
                <div>
                  <p className="text-sm text-gray-600">Secondary Goal</p>
                  <p className="font-semibold text-gray-900">{goalLabels[wizardData.secondaryGoal]}</p>
                </div>
              )}
              {wizardData.targetAudiences.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600">Target Audiences</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {wizardData.targetAudiences.map((audience) => (
                      <span
                        key={audience}
                        className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold"
                      >
                        {audienceLabels[audience]}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Messaging */}
          {(wizardData.painPoints || wizardData.highlights || wizardData.additionalNotes) && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Messaging Notes</h3>
              </div>
              <div className="space-y-3">
                {wizardData.painPoints && (
                  <div>
                    <p className="text-sm text-gray-600">Pain Points</p>
                    <p className="text-gray-900">{wizardData.painPoints}</p>
                  </div>
                )}
                {wizardData.highlights && (
                  <div>
                    <p className="text-sm text-gray-600">Highlights</p>
                    <p className="text-gray-900">{wizardData.highlights}</p>
                  </div>
                )}
                {wizardData.additionalNotes && (
                  <div>
                    <p className="text-sm text-gray-600">Additional Notes</p>
                    <p className="text-gray-900">{wizardData.additionalNotes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Ready to Build Your Homepage?</h3>
          <p className="mb-6 text-blue-100">
            We'll recommend the best sections based on your {businessModelLabels[wizardData.primaryBusinessModel]} business model and {goalLabels[wizardData.primaryGoal]} goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={onBack}
              className="px-8 py-3 bg-white/20 hover:bg-white/30 backdrop-blur rounded-lg font-semibold transition-colors"
            >
              ← Edit Responses
            </button>
            <button
              type="button"
              onClick={onContinue}
              className="px-8 py-3 bg-white text-blue-600 hover:bg-blue-50 rounded-lg font-semibold transition-colors shadow-lg"
            >
              Continue to Section Library →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
