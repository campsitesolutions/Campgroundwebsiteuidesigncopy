import { useState } from 'react';
import { useWizard } from '../../context/WizardContext';
import { User, Mail, Phone, Globe, Building } from 'lucide-react';

interface Step1ContactProps {
  onNext: () => void;
}

export function Step1Contact({ onNext }: Step1ContactProps) {
  const { wizardData, updateWizardData } = useWizard();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!wizardData.campgroundName.trim()) {
      newErrors.campgroundName = 'Campground name is required';
    }

    if (!wizardData.yourName.trim()) {
      newErrors.yourName = 'Your name is required';
    }

    if (!wizardData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(wizardData.email)) {
      newErrors.email = 'Please enter a valid email address';
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact + Park Identity</h2>
        <p className="text-gray-600">Tell us about your campground and how to reach you</p>
      </div>

      {/* Campground Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <Building className="w-4 h-4 text-gray-500" />
          Campground Name *
        </label>
        <input
          type="text"
          value={wizardData.campgroundName}
          onChange={(e) => {
            updateWizardData({ campgroundName: e.target.value });
            setErrors(prev => ({ ...prev, campgroundName: '' }));
          }}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.campgroundName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Pine Valley Campground"
        />
        {errors.campgroundName && (
          <p className="text-red-600 text-sm mt-1">{errors.campgroundName}</p>
        )}
      </div>

      {/* Your Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <User className="w-4 h-4 text-gray-500" />
          Your Name *
        </label>
        <input
          type="text"
          value={wizardData.yourName}
          onChange={(e) => {
            updateWizardData({ yourName: e.target.value });
            setErrors(prev => ({ ...prev, yourName: '' }));
          }}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.yourName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="John Smith"
        />
        {errors.yourName && (
          <p className="text-red-600 text-sm mt-1">{errors.yourName}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-500" />
          Email Address *
        </label>
        <input
          type="email"
          value={wizardData.email}
          onChange={(e) => {
            updateWizardData({ email: e.target.value });
            setErrors(prev => ({ ...prev, email: '' }));
          }}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-500" />
          Phone Number
        </label>
        <input
          type="tel"
          value={wizardData.phone}
          onChange={(e) => updateWizardData({ phone: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="(705) 555-0123"
        />
      </div>

      {/* Website URL */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <Globe className="w-4 h-4 text-gray-500" />
          Current Website URL
        </label>
        <input
          type="url"
          value={wizardData.websiteUrl}
          onChange={(e) => updateWizardData({ websiteUrl: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://www.yourpark.com"
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-end pt-4">
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
