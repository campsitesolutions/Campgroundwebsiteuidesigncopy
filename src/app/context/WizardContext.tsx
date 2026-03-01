import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type BusinessModel = 'seasonal' | 'overnight' | 'trailer-sales' | 'cottage-rentals';
export type Goal = 'bookings' | 'inquiries' | 'trailer-leads';
export type Audience = 'families' | 'couples' | 'snowbirds' | 'retirees' | 'outdoor-adventurers';

// Structured pain points (max 3)
export type PainPoint = 
  | 'PP_CALLS'           // Too many repetitive phone calls
  | 'PP_LOW_SEASONAL'    // Low seasonal site bookings
  | 'PP_LOW_TRAILER'     // Low trailer sales/leads
  | 'PP_LOW_BOOKINGS'    // Low overnight bookings
  | 'PP_OUTDATED'        // Website looks outdated
  | 'PP_CONFUSION'       // Visitors confused by layout/info
  | 'PP_TRUST'           // Credibility/trust issues
  | 'PP_HARD_UPDATE'     // Difficult to update/maintain
  | 'PP_SEO';            // Poor search visibility

// Structured highlights (max 4)
export type Highlight = 
  | 'HL_SCENIC'          // Scenic views/waterfront
  | 'HL_POOL'            // Pool or water amenities
  | 'HL_EVENTS'          // Seasonal events/activities
  | 'HL_SPACIOUS'        // Large/spacious sites
  | 'HL_FAMILY'          // Family-friendly focus
  | 'HL_ADULT'           // Adult-only or quiet
  | 'HL_PREMIUM'         // Luxury/premium positioning
  | 'HL_TRAILER_SALES'   // Trailer sales/inventory
  | 'HL_COTTAGES'        // Cottage rentals
  | 'HL_AWARD';          // Award-winning/highly rated

export interface WizardData {
  // Step 1: Contact + Park Identity
  campgroundName: string;
  yourName: string;
  email: string;
  phone: string;
  websiteUrl: string;
  
  // Step 2: Business Model
  primaryBusinessModel: BusinessModel | '';
  secondaryBusinessModels: BusinessModel[];
  
  // Step 3: Goals + Audience
  primaryGoal: Goal | '';
  secondaryGoal: Goal | '';
  targetAudiences: Audience[];
  
  // Step 4: Pain Points + Highlights (structured, not freeform)
  painPoints: PainPoint[];  // Max 3
  highlights: Highlight[];  // Max 4
  additionalNotes: string;  // Still freeform for extra context
  
  // Wizard state
  isCompleted: boolean;
}

interface WizardContextType {
  wizardData: WizardData;
  updateWizardData: (data: Partial<WizardData>) => void;
  completeWizard: () => void;
  resetWizard: () => void;
}

const defaultWizardData: WizardData = {
  campgroundName: '',
  yourName: '',
  email: '',
  phone: '',
  websiteUrl: '',
  primaryBusinessModel: '',
  secondaryBusinessModels: [],
  primaryGoal: '',
  secondaryGoal: '',
  targetAudiences: [],
  painPoints: [],
  highlights: [],
  additionalNotes: '',
  isCompleted: false,
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

const STORAGE_KEY = 'campsite-wizard-data';

export function WizardProvider({ children }: { children: ReactNode }) {
  const [wizardData, setWizardData] = useState<WizardData>(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        
        // MIGRATION: Convert old string-based painPoints/highlights to arrays
        const migrated: WizardData = {
          ...defaultWizardData,
          ...parsed,
          // Ensure painPoints is an array
          painPoints: Array.isArray(parsed.painPoints) ? parsed.painPoints : [],
          // Ensure highlights is an array
          highlights: Array.isArray(parsed.highlights) ? parsed.highlights : [],
          // Ensure other arrays are arrays
          secondaryBusinessModels: Array.isArray(parsed.secondaryBusinessModels) ? parsed.secondaryBusinessModels : [],
          targetAudiences: Array.isArray(parsed.targetAudiences) ? parsed.targetAudiences : [],
        };
        
        return migrated;
      } catch (e) {
        return defaultWizardData;
      }
    }
    return defaultWizardData;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wizardData));
  }, [wizardData]);

  const updateWizardData = (data: Partial<WizardData>) => {
    setWizardData(prev => ({ ...prev, ...data }));
  };

  const completeWizard = () => {
    setWizardData(prev => ({ ...prev, isCompleted: true }));
  };

  const resetWizard = () => {
    setWizardData(defaultWizardData);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('recommendedPreselected'); // Clear preselection flag when resetting wizard
  };

  return (
    <WizardContext.Provider value={{ wizardData, updateWizardData, completeWizard, resetWizard }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within WizardProvider');
  }
  return context;
}