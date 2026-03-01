import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type BusinessModel = 'seasonal' | 'overnight' | 'trailer-sales' | 'cottage-rentals';
export type Goal = 'bookings' | 'inquiries' | 'trailer-leads';
export type Audience = 'families' | 'couples' | 'snowbirds' | 'retirees' | 'outdoor-adventurers';

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
  
  // Step 4: Messaging + Pain Points
  painPoints: string;
  highlights: string;
  additionalNotes: string;
  
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
  painPoints: '',
  highlights: '',
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
        return JSON.parse(stored);
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