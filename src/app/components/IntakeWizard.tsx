import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useWizard } from '../context/WizardContext';
import { Check } from 'lucide-react';
import { Step1Contact } from './wizard/Step1Contact';
import { Step2BusinessModel } from './wizard/Step2BusinessModel';
import { Step3Goals } from './wizard/Step3Goals';
import { Step4Messaging } from './wizard/Step4Messaging';
import { SummaryScreen } from './wizard/SummaryScreen';

const TOTAL_STEPS = 4;

export function IntakeWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSummary, setShowSummary] = useState(false);
  const { wizardData, completeWizard } = useWizard();
  const navigate = useNavigate();

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep, showSummary]);

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Show summary after step 4
      setShowSummary(true);
    }
  };

  const handleBack = () => {
    if (showSummary) {
      setShowSummary(false);
    } else if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    completeWizard();
    navigate('/library');
  };

  if (showSummary) {
    return <SummaryScreen onBack={handleBack} onContinue={handleComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to CampSite Solutions
          </h1>
          <p className="text-lg text-gray-600">
            Let's personalize your experience in just a few quick steps
          </p>
        </div>

        {/* Stepper */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step, index) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      step < currentStep
                        ? 'bg-emerald-600 text-white'
                        : step === currentStep
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step < currentStep ? <Check className="w-5 h-5" /> : step}
                  </div>
                  <div className="text-xs font-semibold mt-2 text-center">
                    {step === 1 && 'Contact'}
                    {step === 2 && 'Business'}
                    {step === 3 && 'Goals'}
                    {step === 4 && 'Messaging'}
                  </div>
                </div>
                {index < 3 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-all ${
                      step < currentStep ? 'bg-emerald-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-4 text-sm font-semibold text-gray-600">
            Step {currentStep} of {TOTAL_STEPS}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {currentStep === 1 && <Step1Contact onNext={handleNext} />}
          {currentStep === 2 && <Step2BusinessModel onNext={handleNext} onBack={handleBack} />}
          {currentStep === 3 && <Step3Goals onNext={handleNext} onBack={handleBack} />}
          {currentStep === 4 && <Step4Messaging onNext={handleNext} onBack={handleBack} />}
        </div>

        {/* Help Text */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>🔒 Your information is only stored locally in your browser</p>
        </div>
      </div>
    </div>
  );
}