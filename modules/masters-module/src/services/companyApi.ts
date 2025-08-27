import { 
  CompanyMaster, 
  Country, 
  State, 
  City, 
  ApiResponse 
} from '@/types/company.types';
import { 
  mockCountries, 
  mockDefaultCompanyData,
  getStatesByCountry,
  getCitiesByState
} from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Company Master API
export const companyApi = {
  // Get company master data
  async getCompanyMaster(_companyId?: string): Promise<ApiResponse<CompanyMaster>> {
    await delay(800);
    
    try {
      // For now, return default mock data
      return {
        success: true,
        data: mockDefaultCompanyData,
        message: 'Company master data retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve company master data',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      };
    }
  },

  // Save company master data
  async saveCompanyMaster(data: CompanyMaster): Promise<ApiResponse<CompanyMaster>> {
    await delay(1200);
    
    try {
      // Simulate validation
      if (!data.company.companyName.trim()) {
        return {
          success: false,
          message: 'Validation failed',
          errors: ['Company name is required']
        };
      }

      // Simulate saving to backend
      const savedData: CompanyMaster = {
        ...data,
        id: data.id || `company_${Date.now()}`,
        updatedAt: new Date().toISOString()
      };

      return {
        success: true,
        data: savedData,
        message: 'Company master data saved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to save company master data',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      };
    }
  },

  // Upload company logo
  async uploadLogo(file: File): Promise<ApiResponse<string>> {
    await delay(2000);
    
    try {
      // Validate file
      if (!file.type.startsWith('image/')) {
        return {
          success: false,
          message: 'File validation failed',
          errors: ['Please upload a valid image file']
        };
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        return {
          success: false,
          message: 'File validation failed',
          errors: ['File size must be less than 5MB']
        };
      }

      // Simulate file upload
      const logoUrl = URL.createObjectURL(file);
      
      return {
        success: true,
        data: logoUrl,
        message: 'Logo uploaded successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to upload logo',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      };
    }
  }
};

// Master Data API
export const masterDataApi = {
  // Get all countries
  async getCountries(): Promise<ApiResponse<Country[]>> {
    await delay(300);
    
    try {
      return {
        success: true,
        data: mockCountries,
        message: 'Countries retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve countries',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      };
    }
  },

  // Get states by country
  async getStates(countryId: string): Promise<ApiResponse<State[]>> {
    await delay(400);
    
    try {
      const states = getStatesByCountry(countryId);
      return {
        success: true,
        data: states,
        message: 'States retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve states',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      };
    }
  },

  // Get cities by state
  async getCities(stateId: string): Promise<ApiResponse<City[]>> {
    await delay(400);
    
    try {
      const cities = getCitiesByState(stateId);
      return {
        success: true,
        data: cities,
        message: 'Cities retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve cities',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      };
    }
  },

  // Validate PAN number
  async validatePAN(panNumber: string): Promise<ApiResponse<boolean>> {
    await delay(600);
    
    try {
      // PAN format: AAAAA9999A
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      const isValid = panRegex.test(panNumber.toUpperCase());
      
      return {
        success: true,
        data: isValid,
        message: isValid ? 'PAN number is valid' : 'Invalid PAN number format'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to validate PAN number',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      };
    }
  },

  // Validate GST number
  async validateGST(gstNumber: string): Promise<ApiResponse<boolean>> {
    await delay(800);
    
    try {
      // GST format: 99AAAAA9999A9A9
      const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
      const isValid = gstRegex.test(gstNumber.toUpperCase());
      
      return {
        success: true,
        data: isValid,
        message: isValid ? 'GST number is valid' : 'Invalid GST number format'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to validate GST number',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      };
    }
  }
};

// Export all APIs
export default {
  companyApi,
  masterDataApi
};