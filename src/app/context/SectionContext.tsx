import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SectionConfig } from '../data/sections';
import { Goal } from './WizardContext';

export interface SectionCustomization {
  [key: string]: any; // Flexible structure for different section types
}

export interface CustomColorPalette {
  primary: string;
  secondary: string;
  accent: string;
}

export interface BrandingSettings {
  companyName?: string;
  logoUrl?: string;
  colorPaletteId?: string;
  customPalette?: CustomColorPalette;
}

interface SectionContextType {
  selectedSections: string[];
  customizations: { [sectionId: string]: SectionCustomization };
  branding: BrandingSettings;
  wizardGoal: Goal | ''; // Add wizard goal to context
  campgroundName: string; // Add campground name to context
  addSection: (id: string) => void;
  removeSection: (id: string) => void;
  isSelected: (id: string) => boolean;
  moveSectionUp: (id: string) => void;
  moveSectionDown: (id: string) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  clearSelections: () => void;
  updateCustomization: (sectionId: string, data: SectionCustomization) => void;
  getCustomization: (sectionId: string) => SectionCustomization;
  updateBranding: (data: BrandingSettings) => void;
  setWizardGoal: (goal: Goal | '') => void; // Add setter
  setCampgroundName: (name: string) => void; // Add setter
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export function SectionProvider({ children }: { children: ReactNode }) {
  const [selectedSections, setSelectedSections] = useState<string[]>(() => {
    const saved = localStorage.getItem('selectedSections');
    return saved ? JSON.parse(saved) : [];
  });

  const [customizations, setCustomizations] = useState<{ [sectionId: string]: SectionCustomization }>(() => {
    const saved = localStorage.getItem('sectionCustomizations');
    return saved ? JSON.parse(saved) : {};
  });

  const [branding, setBranding] = useState<BrandingSettings>(() => {
    const saved = localStorage.getItem('brandingSettings');
    return saved ? JSON.parse(saved) : {};
  });

  const [wizardGoal, setWizardGoal] = useState<Goal | ''>('');
  const [campgroundName, setCampgroundName] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('selectedSections', JSON.stringify(selectedSections));
  }, [selectedSections]);

  useEffect(() => {
    localStorage.setItem('sectionCustomizations', JSON.stringify(customizations));
  }, [customizations]);

  useEffect(() => {
    localStorage.setItem('brandingSettings', JSON.stringify(branding));
  }, [branding]);

  const addSection = (id: string) => {
    if (!selectedSections.includes(id)) {
      setSelectedSections([...selectedSections, id]);
    }
  };

  const removeSection = (id: string) => {
    setSelectedSections(selectedSections.filter(s => s !== id));
    // Also remove customizations for this section to prevent stale data
    setCustomizations(prev => {
      const newCustomizations = { ...prev };
      delete newCustomizations[id];
      return newCustomizations;
    });
  };

  const isSelected = (id: string) => {
    return selectedSections.includes(id);
  };

  const moveSectionUp = (id: string) => {
    const index = selectedSections.indexOf(id);
    if (index > 0) {
      const newSections = [...selectedSections];
      [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
      setSelectedSections(newSections);
    }
  };

  const moveSectionDown = (id: string) => {
    const index = selectedSections.indexOf(id);
    if (index < selectedSections.length - 1) {
      const newSections = [...selectedSections];
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
      setSelectedSections(newSections);
    }
  };

  const reorderSections = (fromIndex: number, toIndex: number) => {
    const newSections = [...selectedSections];
    const [movedSection] = newSections.splice(fromIndex, 1);
    newSections.splice(toIndex, 0, movedSection);
    setSelectedSections(newSections);
  };

  const clearSelections = () => {
    setSelectedSections([]);
  };

  const updateCustomization = (sectionId: string, data: SectionCustomization) => {
    setCustomizations(prev => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], ...data }
    }));
  };

  const getCustomization = (sectionId: string): SectionCustomization => {
    return customizations[sectionId] || {};
  };

  const updateBranding = (data: BrandingSettings) => {
    setBranding(prev => ({ ...prev, ...data }));
  };

  return (
    <SectionContext.Provider
      value={{
        selectedSections,
        customizations,
        branding,
        wizardGoal,
        campgroundName,
        addSection,
        removeSection,
        isSelected,
        moveSectionUp,
        moveSectionDown,
        reorderSections,
        clearSelections,
        updateCustomization,
        getCustomization,
        updateBranding,
        setWizardGoal,
        setCampgroundName,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
}

export function useSections() {
  const context = useContext(SectionContext);
  if (context === undefined) {
    throw new Error('useSections must be used within a SectionProvider');
  }
  return context;
}