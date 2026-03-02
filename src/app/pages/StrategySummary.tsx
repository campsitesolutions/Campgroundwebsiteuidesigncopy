import { useNavigate } from 'react-router';
import { useWizard } from '../context/WizardContext';
import { useSections } from '../context/SectionContext';
import { sections as allSections } from '../data/sections';
import { getRecommendedStack } from '../data/recommendationMapping';
import { ArrowLeft, Mail, Calendar, CheckCircle2, Loader2, Check } from 'lucide-react';
import {
  formatPainPoint,
  formatHighlight,
  generateKeyFocusAreas,
  generateStrategicRationale,
  generateSectionReasons,
} from '../utils/strategyHelpers';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

// EmailJS Configuration (same as LeadCapture)
const EMAILJS_CONFIG = {
  serviceId: 'service_gjhrv5c',
  templateId: 'template_sc8xh69',
  publicKey: 'EZRLXacodMklHIfE5',
  recipientEmail: 'info@campsite.solutions',
};

const EMAIL_ENABLED = true;

export function StrategySummary() {
  const navigate = useNavigate();
  const { wizardData } = useWizard();
  const { selectedSections } = useSections();

  // Get recommended sections
  const recommendedSectionIds = getRecommendedStack(
    wizardData.primaryBusinessModel,
    wizardData.primaryGoal,
    wizardData
  );

  // Get section details for display
  const recommendedSections = recommendedSectionIds
    .map(id => allSections.find(s => s.id === id))
    .filter(Boolean);

  // Generate strategic insights
  const keyFocusAreas = generateKeyFocusAreas(
    wizardData.painPoints,
    wizardData.highlights,
    wizardData.primaryGoal
  );
  const strategicRationale = generateStrategicRationale(
    wizardData.painPoints,
    wizardData.highlights,
    wizardData.primaryGoal,
    wizardData.primaryBusinessModel
  );
  const sectionReasons = generateSectionReasons(
    recommendedSectionIds,
    wizardData.painPoints,
    wizardData.highlights,
    wizardData.primaryGoal
  );

  // Email submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    if (EMAIL_ENABLED) {
      try {
        // Format wizard data for email
        const wizardDataText = [
          `Campground: ${wizardData.campgroundName}`,
          wizardData.email && `Email: ${wizardData.email}`,
          wizardData.phone && `Phone: ${wizardData.phone}`,
          wizardData.websiteUrl && `Website: ${wizardData.websiteUrl}`,
          `Primary Business Model: ${formatBusinessModel(wizardData.primaryBusinessModel)}`,
          wizardData.secondaryBusinessModels.length > 0 && `Secondary Models: ${wizardData.secondaryBusinessModels.map(formatBusinessModel).join(', ')}`,
          `Primary Goal: ${formatGoal(wizardData.primaryGoal)}`,
          wizardData.secondaryGoal && `Secondary Goal: ${formatGoal(wizardData.secondaryGoal)}`,
          wizardData.targetAudiences.length > 0 && `Target Audiences: ${wizardData.targetAudiences.map(formatAudience).join(', ')}`,
          wizardData.painPoints.length > 0 && `Pain Points: ${wizardData.painPoints.map(p => formatPainPoint(p)).join(', ')}`,
          wizardData.highlights.length > 0 && `Highlights: ${wizardData.highlights.map(h => formatHighlight(h)).join(', ')}`,
        ].filter(Boolean).join('\n');

        // Generate preview link
        const previewLink = `${window.location.origin}/my-layout`;

        const templateParams = {
          parkName: wizardData.campgroundName,
          contactName: wizardData.yourName || 'Not provided',
          email: wizardData.email || 'Not provided',
          phone: wizardData.phone || 'Not provided',
          website: wizardData.websiteUrl || 'Not provided',
          recipientEmail: EMAILJS_CONFIG.recipientEmail,
          // Strategy Summary Data
          wizardData: wizardDataText,
          primaryGoal: formatGoal(wizardData.primaryGoal),
          primaryBusinessModel: formatBusinessModel(wizardData.primaryBusinessModel),
          painPoints: wizardData.painPoints.length > 0 ? wizardData.painPoints.map(p => formatPainPoint(p)).join(', ') : 'None',
          highlights: wizardData.highlights.length > 0 ? wizardData.highlights.map(h => formatHighlight(h)).join(', ') : 'None',
          targetAudiences: wizardData.targetAudiences.length > 0 ? wizardData.targetAudiences.map(formatAudience).join(', ') : 'Not specified',
          keyFocusAreas: keyFocusAreas.join('\n'),
          recommendedSections: recommendedSections.map((s, i) => `${i + 1}. ${s!.name}`).join('\n'),
          strategicRationale: strategicRationale,
          sectionCount: recommendedSections.length,
          previewLink: previewLink,
        };

        console.log('📧 Sending Strategy Summary email with params:', templateParams);

        const response = await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          templateParams,
          EMAILJS_CONFIG.publicKey
        );

        console.log('✅ Email sent successfully:', response);
        setSubmitted(true);
        setIsSubmitting(false);
      } catch (error) {
        console.error('❌ Email sending failed:', error);
        setSubmitError('Failed to send email. Please try again later.');
        setIsSubmitting(false);
      }
    } else {
      // Demo mode: simulate submission
      console.log('📧 Demo mode - not sending email');
      setTimeout(() => {
        setSubmitted(true);
        setIsSubmitting(false);
      }, 2000);
    }
  };

  // Show success screen if submitted
  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">Strategy Summary Submitted!</h1>
            <p className="text-xl text-neutral-600 mb-8">
              Your personalized strategy has been sent to our team. We'll be in touch within 24 hours to discuss next steps.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/library')}
                className="px-6 py-3 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
              >
                Back to Library
              </button>
              <button
                onClick={() => navigate('/my-layout')}
                className="px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
              >
                Preview Your Site
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <button
            onClick={() => navigate('/library')}
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Section Library
          </button>

          <h1 className="text-3xl font-normal text-neutral-900 mb-2">
            Strategy Summary for {wizardData.campgroundName}
          </h1>
          <p className="text-neutral-600 text-lg">
            Based on your goals, audience, and challenges, here is your recommended homepage strategy.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* SECTION 1: Park Profile */}
        <section>
          <h2 className="text-xl font-medium text-neutral-900 mb-6">Park Profile</h2>
          <div className="bg-neutral-50 rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-neutral-500 mb-1">Campground Name</div>
                <div className="text-neutral-900">{wizardData.campgroundName}</div>
              </div>
              {wizardData.websiteUrl && (
                <div>
                  <div className="text-sm text-neutral-500 mb-1">Current Website</div>
                  <div className="text-neutral-900 truncate">{wizardData.websiteUrl}</div>
                </div>
              )}
              <div>
                <div className="text-sm text-neutral-500 mb-1">Primary Business Model</div>
                <div className="text-neutral-900 capitalize">
                  {formatBusinessModel(wizardData.primaryBusinessModel)}
                </div>
              </div>
              {wizardData.secondaryBusinessModels.length > 0 && (
                <div>
                  <div className="text-sm text-neutral-500 mb-1">Secondary Business Model</div>
                  <div className="text-neutral-900 capitalize">
                    {wizardData.secondaryBusinessModels.map(formatBusinessModel).join(', ')}
                  </div>
                </div>
              )}
              <div>
                <div className="text-sm text-neutral-500 mb-1">Primary Goal</div>
                <div className="text-neutral-900 capitalize">
                  {formatGoal(wizardData.primaryGoal)}
                </div>
              </div>
              {wizardData.secondaryGoal && (
                <div>
                  <div className="text-sm text-neutral-500 mb-1">Secondary Goal</div>
                  <div className="text-neutral-900 capitalize">
                    {formatGoal(wizardData.secondaryGoal)}
                  </div>
                </div>
              )}
            </div>

            {wizardData.targetAudiences.length > 0 && (
              <div className="pt-4 border-t border-neutral-200">
                <div className="text-sm text-neutral-500 mb-2">Target Audiences</div>
                <div className="flex flex-wrap gap-2">
                  {wizardData.targetAudiences.map(audience => (
                    <span
                      key={audience}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700 border border-blue-200"
                    >
                      {formatAudience(audience)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(wizardData.painPoints.length > 0 || wizardData.highlights.length > 0) && (
              <div className="pt-4 border-t border-neutral-200 grid grid-cols-2 gap-6">
                {wizardData.painPoints.length > 0 && (
                  <div>
                    <div className="text-sm text-neutral-500 mb-2">Pain Points</div>
                    <div className="flex flex-wrap gap-2">
                      {wizardData.painPoints.map(painPoint => (
                        <span
                          key={painPoint}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-50 text-red-700 border border-red-200"
                        >
                          {formatPainPoint(painPoint)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {wizardData.highlights.length > 0 && (
                  <div>
                    <div className="text-sm text-neutral-500 mb-2">Highlights</div>
                    <div className="flex flex-wrap gap-2">
                      {wizardData.highlights.map(highlight => (
                        <span
                          key={highlight}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-50 text-amber-700 border border-amber-200"
                        >
                          {formatHighlight(highlight)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* SECTION 2: Key Focus Areas */}
        {keyFocusAreas.length > 0 && (
          <section>
            <h2 className="text-xl font-medium text-neutral-900 mb-6">Key Focus Areas</h2>
            <div className="space-y-3">
              {keyFocusAreas.map((focus, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-neutral-700">{focus}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 3: Recommended Homepage Structure */}
        <section>
          <h2 className="text-xl font-medium text-neutral-900 mb-6">Recommended Homepage Layout</h2>
          <div className="space-y-4">
            {recommendedSections.map((section, index) => (
              <div key={section!.id} className="bg-neutral-50 rounded-lg p-5">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-neutral-900 font-medium mb-1">{section!.name}</h3>
                    <p className="text-sm text-neutral-600 italic">
                      → {sectionReasons[section!.id] || section!.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: Strategic Rationale */}
        <section>
          <h2 className="text-xl font-medium text-neutral-900 mb-6">Why This Approach Works</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-neutral-800 leading-relaxed">{strategicRationale}</p>
          </div>
        </section>

        {/* Submit Button */}
        <section>
          <div className="bg-neutral-50 rounded-lg p-8 text-center">
            <p className="text-neutral-700 mb-6">
              Ready to bring this strategy to life? Submit your selections and we'll send a detailed recap to our sales team.
            </p>
            {submitError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {submitError}
              </div>
            )}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  Submit & Email Strategy Recap
                </>
              )}
            </button>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-neutral-200">
          <button
            onClick={() => navigate('/library')}
            className="inline-flex items-center gap-2 px-6 py-3 text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Library
          </button>
          <button
            onClick={() => navigate('/my-layout')}
            className="px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Preview Your Site
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper functions for formatting
function formatBusinessModel(model: string): string {
  const map: Record<string, string> = {
    seasonal: 'Seasonal Campground',
    overnight: 'Overnight Campground',
    'trailer-sales': 'RV/Trailer Sales',
    'cottage-rentals': 'Cottage Rentals',
  };
  return map[model] || model;
}

function formatGoal(goal: string): string {
  const map: Record<string, string> = {
    bookings: 'Increase Online Bookings',
    inquiries: 'Generate More Inquiries',
    'trailer-leads': 'Generate Trailer/RV Leads',
  };
  return map[goal] || goal;
}

function formatAudience(audience: string): string {
  const map: Record<string, string> = {
    families: 'Families',
    couples: 'Couples',
    snowbirds: 'Snowbirds',
    retirees: 'Retirees',
    'outdoor-adventurers': 'Outdoor Adventurers',
  };
  return map[audience] || audience;
}

// Generate email body
function generateEmailBody(
  wizardData: any,
  sections: any[],
  focusAreas: string[],
  rationale: string
): string {
  let body = `STRATEGY SUMMARY FOR ${wizardData.campgroundName.toUpperCase()}\n\n`;
  body += `PRIMARY BUSINESS MODEL: ${formatBusinessModel(wizardData.primaryBusinessModel)}\n`;
  body += `PRIMARY GOAL: ${formatGoal(wizardData.primaryGoal)}\n\n`;
  body += `KEY FOCUS AREAS:\n`;
  focusAreas.forEach((focus, i) => {
    body += `${i + 1}. ${focus}\n`;
  });
  body += `\nRECOMMENDED HOMEPAGE LAYOUT:\n`;
  sections.forEach((section, i) => {
    body += `${i + 1}. ${section!.name}\n`;
  });
  body += `\nSTRATEGIC RATIONALE:\n${rationale}\n\n`;
  body += `Next step: Review the full summary at your CampSite Solutions showroom.`;

  return body;
}