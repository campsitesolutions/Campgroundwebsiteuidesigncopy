import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/sections/Footer';
import { useSections } from '../context/SectionContext';
import { useWizard } from '../context/WizardContext';
import { sections } from '../data/sections';
import { Check, Send, AlertCircle, Loader2, Image as ImageIcon } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { generateLayoutHTML, generateLayoutText } from '../utils/layoutScreenshot';

// ============================================
// EmailJS Configuration
// ============================================
// TO SET UP EMAIL NOTIFICATIONS:
// 1. Create a free account at https://www.emailjs.com/
// 2. Add an email service (Gmail, Outlook, etc.)
// 3. Create an email template
// 4. Copy your credentials and paste them below
// 5. Replace RECIPIENT_EMAIL with your email address

const EMAILJS_CONFIG = {
  serviceId: 'service_gjhrv5c',        // Your EmailJS Service ID
  templateId: 'template_sc8xh69',      // Your EmailJS Template ID
  publicKey: 'EZRLXacodMklHIfE5',      // Your EmailJS Public Key
  recipientEmail: 'info@campsite.solutions',    // Email address to receive leads
};

// Set to true to enable actual email sending, false for demo mode
const EMAIL_ENABLED = true;

// ============================================
// Production URL Configuration
// ============================================
// IMPORTANT: Set this to your production URL when deployed!
// Examples:
//   - 'https://campsite-showroom.vercel.app'
//   - 'https://demo.campsite.solutions'
//   - 'https://your-domain.com'
const PRODUCTION_URL = 'https://campgroundwebsiteuidesigncopy.vercel.app'; // ✅ PRODUCTION URL SET!

// Use production URL if set, otherwise fall back to current origin
const getBaseUrl = () => {
  // If production URL is properly configured, ALWAYS use it
  // This ensures email links work from Figma preview, localhost, or production
  if (PRODUCTION_URL && PRODUCTION_URL !== 'https://your-production-url.com') {
    return PRODUCTION_URL;
  }
  // Otherwise use current origin (fallback)
  return window.location.origin;
};

export function LeadCapture() {
  const { selectedSections, clearSelections } = useSections();
  const { wizardData } = useWizard();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    parkName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    primaryModel: 'seasonal' as 'seasonal' | 'overnight' | 'trailers',
    notes: '',
  });

  // Pre-populate form with wizard data if available
  useEffect(() => {
    if (wizardData.isCompleted) {
      setFormData({
        parkName: wizardData.campgroundName || '',
        contactName: wizardData.yourName || '',
        email: wizardData.email || '',
        phone: wizardData.phone || '',
        website: wizardData.websiteUrl || '',
        primaryModel: (wizardData.primaryBusinessModel === 'trailer-sales' ? 'trailers' : 
                      wizardData.primaryBusinessModel === 'cottage-rentals' ? 'overnight' :
                      wizardData.primaryBusinessModel || 'seasonal') as 'seasonal' | 'overnight' | 'trailers',
        notes: wizardData.additionalNotes || '',
      });
    }
  }, [wizardData]);

  const selectedSectionData = selectedSections
    .map(id => sections.find(s => s.id === id))
    .filter(Boolean) as typeof sections;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Generate unique preview ID FIRST
    const previewId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Get branding and color palette from localStorage
    const storedBranding = localStorage.getItem('campsite_branding');
    const branding = storedBranding ? JSON.parse(storedBranding) : { companyName: formData.parkName };
    
    const storedPalette = localStorage.getItem('campsite_color_palette');
    const paletteColors = storedPalette ? JSON.parse(storedPalette) : {
      primary: '#166534',
      secondary: '#f3f4f6',
      accent: '#f97316'
    };

    // Store preview data in localStorage BEFORE sending email
    const previewData = {
      sectionIds: selectedSections,
      branding,
      paletteColors,
      contactInfo: {
        parkName: formData.parkName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        primaryModel: formData.primaryModel,
        notes: formData.notes,
      },
      timestamp: Date.now(),
    };
    
    const storageKey = `campsite_preview_${previewId}`;
    localStorage.setItem(storageKey, JSON.stringify(previewData));
    console.log('✅ Preview data stored:', storageKey, previewData);

    // Generate preview URL with data encoded in the URL (works across all domains!)
    // Use URL-safe base64 encoding
    const dataStr = JSON.stringify(previewData);
    const base64 = btoa(dataStr);
    // Make base64 URL-safe by replacing characters
    const urlSafeBase64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    const url = `${getBaseUrl()}/layout-preview/${previewId}?data=${urlSafeBase64}`;
    console.log('🔗 Preview URL generated:', url);
    console.log('🔗 Setting previewUrl state to:', url);
    setPreviewUrl(url);
    console.log('🔗 previewUrl state should now be:', url);

    if (EMAIL_ENABLED) {
      try {
        // Generate layout text for plain text version
        const layoutText = generateLayoutText(selectedSectionData.map(s => s.name));

        console.log('📧 Email Data:', {
          sectionCount: selectedSectionData.length,
          sectionNames: selectedSectionData.map(s => s.name),
          branding,
          paletteColors,
          previewUrl: url,
        });

        const templateParams = {
          parkName: formData.parkName,
          contactName: formData.contactName,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          website: formData.website || 'Not provided',
          primaryModel: formData.primaryModel,
          notes: formData.notes || 'None',
          selectedSections: selectedSectionData.map(section => section.name).join(', ') || 'None selected',
          recipientEmail: EMAILJS_CONFIG.recipientEmail,
          layoutText: layoutText, // Plain text list
          sectionCount: selectedSections.length,
          previewUrl: url, // Link to view the layout preview
        };

        console.log('📧 Sending email with templateParams:', templateParams);
        console.log('📧 Preview URL in email will be:', templateParams.previewUrl);

        const response = await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          templateParams,
          EMAILJS_CONFIG.publicKey
        );
        
        console.log('✅ Email sent successfully:', response);
        console.log('✅ About to set submitted to true, previewUrl is:', url);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow flex items-center justify-center bg-gray-50 py-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="bg-white rounded-2xl shadow-xl p-12">
              <div className="w-20 h-20 bg-[#E8D5B5]/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-[#2C3E50]" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Thank You!</h1>
              <p className="text-xl text-gray-600 mb-8">
                We've received your information and will be in touch within 24 hours.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 text-left mb-8">
                <h2 className="font-bold text-xl mb-4">Your Project Summary</h2>
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-sm text-gray-600">Park Name</p>
                    <p className="font-semibold">{formData.parkName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contact</p>
                    <p className="font-semibold">{formData.contactName}</p>
                    <p className="text-sm text-gray-700">{formData.email}</p>
                    {formData.phone && <p className="text-sm text-gray-700">{formData.phone}</p>}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Primary Business Model</p>
                    <p className="font-semibold capitalize">{formData.primaryModel}</p>
                  </div>
                  {formData.website && (
                    <div>
                      <p className="text-sm text-gray-600">Current Website</p>
                      <p className="font-semibold">{formData.website}</p>
                    </div>
                  )}
                  {formData.notes && (
                    <div>
                      <p className="text-sm text-gray-600">Notes</p>
                      <p className="text-gray-700">{formData.notes}</p>
                    </div>
                  )}
                </div>

                {selectedSections.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Selected Sections ({selectedSections.length})</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSectionData.map(section => (
                        <span
                          key={section.id}
                          className="bg-[#E8D5B5]/20 text-[#2C3E50] px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {section.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <p className="text-gray-600 mb-6">
                Screenshot this page for your records, or we'll send a copy to your email.
              </p>

              {previewUrl && (
                <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-blue-900 mb-2">
                    🔗 Preview Link (for testing):
                  </p>
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline break-all"
                  >
                    {previewUrl}
                  </a>
                  <p className="text-xs text-blue-700 mt-2">
                    This is the link that was sent in your email. Click to test it!
                  </p>
                  
                  {previewUrl.includes('localhost') && (
                    <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded p-3">
                      <p className="text-xs text-yellow-800">
                        ⚠️ <strong>Warning:</strong> This is a localhost URL and will only work on your computer. 
                        To make the email link work from anywhere, update <code className="bg-yellow-100 px-1 rounded">PRODUCTION_URL</code> in 
                        <code className="bg-yellow-100 px-1 rounded">/src/app/pages/LeadCapture.tsx</code> with your deployed app URL.
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      parkName: '',
                      contactName: '',
                      email: '',
                      phone: '',
                      website: '',
                      primaryModel: 'seasonal',
                      notes: '',
                    });
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Submit Another
                </button>
                <a
                  href="/"
                  className="bg-[#E8D5B5] hover:bg-[#D4C5A5] text-[#2C3E50] px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
                >
                  Back to Templates
                </a>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Let's Build Your Website</h1>
            <p className="text-xl text-gray-600">
              Tell us about your campground and we'll create a customized plan.
            </p>
            {wizardData.isCompleted && (
              <div className="mt-4 inline-flex items-center gap-2 bg-green-50 text-green-800 px-4 py-2 rounded-lg text-sm font-medium">
                <Check className="w-4 h-4" />
                Your information has been pre-filled from the wizard
              </div>
            )}
          </div>

          {!EMAIL_ENABLED && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-8 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-blue-900 font-semibold mb-1">
                  📧 Email notifications not configured
                </p>
                <p className="text-sm text-blue-800">
                  This form is in demo mode. To receive lead notifications by email, 
                  follow the setup guide in <code className="bg-blue-100 px-2 py-0.5 rounded text-xs font-mono">/EMAIL_SETUP_GUIDE.md</code>
                </p>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8">
            {/* Form */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="font-bold text-2xl mb-6">Your Information</h2>
                
                <div className="space-y-5">
                  <div>
                    <label htmlFor="parkName" className="block text-sm font-semibold mb-2">
                      Campground Name *
                    </label>
                    <input
                      type="text"
                      id="parkName"
                      name="parkName"
                      required
                      value={formData.parkName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8D5B5]"
                      placeholder="Pine Valley Campground"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactName" className="block text-sm font-semibold mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      required
                      value={formData.contactName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8D5B5]"
                      placeholder="John Smith"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8D5B5]"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8D5B5]"
                        placeholder="(705) 555-0123"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-semibold mb-2">
                      Current Website URL (if any)
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8D5B5]"
                      placeholder="https://www.yourpark.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="primaryModel" className="block text-sm font-semibold mb-2">
                      Primary Business Model *
                    </label>
                    <select
                      id="primaryModel"
                      name="primaryModel"
                      required
                      value={formData.primaryModel}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8D5B5]"
                    >
                      <option value="seasonal">Seasonal Sites</option>
                      <option value="overnight">Overnight Camping</option>
                      <option value="trailers">Trailers for Sale</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-semibold mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8D5B5]"
                      placeholder="Tell us anything else about your needs or goals..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#E8D5B5] hover:bg-[#D4C5A5] text-[#2C3E50] py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 mt-8"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Submit & Generate Plan
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>

                {submitError && (
                  <div className="mt-4 text-sm text-red-500 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {submitError}
                  </div>
                )}
              </form>
            </div>

            {/* Summary Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="font-bold text-lg mb-4">Your Selections</h3>
                
                {selectedSections.length > 0 ? (
                  <div>
                    <p className="text-sm text-gray-600 mb-3">
                      You've selected {selectedSections.length} custom section{selectedSections.length !== 1 ? 's' : ''}:
                    </p>
                    <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
                      {selectedSectionData.map(section => (
                        <div
                          key={section.id}
                          className="bg-[#E8D5B5]/20 text-[#2C3E50] px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                        >
                          <Check className="w-4 h-4 flex-shrink-0" />
                          <span>{section.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-600 mb-4">
                      No sections selected yet.
                    </p>
                    <a
                      href="/library"
                      className="text-[#2C3E50] font-semibold text-sm hover:underline"
                    >
                      Browse Section Library →
                    </a>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <p className="text-xs text-gray-500">
                    By submitting this form, you agree to be contacted about CampSite Solutions services. 
                    We respect your privacy and won't share your information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}