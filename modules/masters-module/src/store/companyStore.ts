import { create } from 'zustand';
import { 
  CompanyMaster, 
  CompanyMasterTabKey, 
  TabValidationStatus,
  Country,
  State,
  City
} from '@/types/company.types';
import { mockDefaultCompanyData } from '@/services/mockData';

interface CompanyStore {
  // State
  companyData: CompanyMaster;
  currentTab: CompanyMasterTabKey;
  isLoading: boolean;
  isSaving: boolean;
  tabValidations: TabValidationStatus;
  countries: Country[];
  states: State[];
  cities: City[];
  
  // Master data loading states
  countriesLoading: boolean;
  statesLoading: boolean;
  citiesLoading: boolean;
  
  // Actions
  setCompanyData: (data: Partial<CompanyMaster>) => void;
  updateCompanySection: <K extends keyof CompanyMaster>(
    section: K, 
    data: Partial<CompanyMaster[K]>
  ) => void;
  setCurrentTab: (tab: CompanyMasterTabKey) => void;
  setLoading: (loading: boolean) => void;
  setSaving: (saving: boolean) => void;
  setTabValidation: (tab: string, validation: { isValid: boolean; errors: string[] }) => void;
  
  // Master data actions
  setCountries: (countries: Country[]) => void;
  setStates: (states: State[]) => void;
  setCities: (cities: City[]) => void;
  setCountriesLoading: (loading: boolean) => void;
  setStatesLoading: (loading: boolean) => void;
  setCitiesLoading: (loading: boolean) => void;
  
  // Reset functions
  resetCompanyData: () => void;
  resetTabValidations: () => void;
}

export const useCompanyStore = create<CompanyStore>((set) => ({
  // Initial State
  companyData: mockDefaultCompanyData,
  currentTab: 'company',
  isLoading: false,
  isSaving: false,
  tabValidations: {},
  countries: [],
  states: [],
  cities: [],
  countriesLoading: false,
  statesLoading: false,
  citiesLoading: false,
  
  // Actions
  setCompanyData: (data) => 
    set((state) => ({
      companyData: { ...state.companyData, ...data }
    })),
    
  updateCompanySection: (section, data) =>
    set((state) => ({
      companyData: {
        ...state.companyData,
        [section]: typeof state.companyData[section] === 'object' 
          ? { ...state.companyData[section], ...data }
          : data
      }
    })),
    
  setCurrentTab: (tab) => set({ currentTab: tab }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setSaving: (saving) => set({ isSaving: saving }),
  
  setTabValidation: (tab, validation) =>
    set((state) => ({
      tabValidations: {
        ...state.tabValidations,
        [tab]: validation
      }
    })),
    
  // Master data actions
  setCountries: (countries) => set({ countries }),
  
  setStates: (states) => set({ states }),
  
  setCities: (cities) => set({ cities }),
  
  setCountriesLoading: (loading) => set({ countriesLoading: loading }),
  
  setStatesLoading: (loading) => set({ statesLoading: loading }),
  
  setCitiesLoading: (loading) => set({ citiesLoading: loading }),
  
  // Reset functions
  resetCompanyData: () => set({ companyData: mockDefaultCompanyData }),
  
  resetTabValidations: () => set({ tabValidations: {} })
}));

// Selectors for commonly used derived state
export const useCurrentTabData = () => {
  const { companyData, currentTab } = useCompanyStore();
  
  switch (currentTab) {
    case 'company':
      return companyData.company;
    case 'statutory':
      return companyData.statutory;
    case 'locations':
      return companyData.locations;
    case 'general':
      return companyData.general;
    case 'attendance':
      return companyData.attendance;
    case 'incentives':
      return companyData.incentives;
    case 'bank':
      return companyData.bank;
    case 'hrYear':
      return companyData.hrYear;
    case 'symbolic':
      return companyData.symbolic;
    case 'professionalTax':
      return companyData.professionalTax;
    case 'printConfiguration':
      return companyData.printConfiguration;
    default:
      return null;
  }
};

export const useTabValidation = (tabKey: string) => {
  const { tabValidations } = useCompanyStore();
  return tabValidations[tabKey] || { isValid: true, errors: [] };
};

export const useIsFormDirty = () => {
  const { companyData } = useCompanyStore();
  // Compare with initial data to determine if form is dirty
  return JSON.stringify(companyData) !== JSON.stringify(mockDefaultCompanyData);
};

export const useCompanyFormData = () => {
  const { companyData, updateCompanySection, isLoading, isSaving } = useCompanyStore();
  
  return {
    data: companyData,
    updateSection: updateCompanySection,
    isLoading,
    isSaving
  };
};