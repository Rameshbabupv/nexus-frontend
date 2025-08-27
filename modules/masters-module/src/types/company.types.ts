// Company Master Data Types

export interface Country {
  id: string;
  name: string;
  code: string;
}

export interface State {
  id: string;
  name: string;
  countryId: string;
}

export interface City {
  id: string;
  name: string;
  stateId: string;
}

// Company Tab Interface
export interface CompanyInfo {
  companyName: string;
  addressLine1: string;
  addressLine2?: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  emailId: string;
  website?: string;
  contactPerson: string;
  designation: string;
  landlineNo?: string;
  officeMobile?: string;
  currency: string;
  remarks?: string;
  logo?: File | string;
}

// Statutory Info Tab Interface
export interface StatutoryInfo {
  cinNo?: string;
  linNo?: string;
  tanNo?: string;
  panNo?: string;
  serviceAge?: number;
  indianFactoriesAct: boolean;
  enablePF: boolean;
  enableESI: boolean;
  pfEffectiveFrom: string;
  esiEffectiveFrom: string;
  pfEmployeeContribution: number;
  esiEmployeeContribution: number;
  pfEmployerContribution: number;
  employeePensionContribution: number;
  esiEmployerContribution: number;
  pfCeilingAmount: number;
  esiCeilingAmount: number;
  pfRegistrationCode?: string;
  esiRegistrationCode?: string;
}

// Location Interface
export interface LocationInfo {
  siteType: string;
  siteName: string;
  licenseNo?: string;
  esiNo?: string;
  pfNo?: string;
  gstinNo?: string;
  address1: string;
  address2?: string;
  state: string;
  city: string;
  pincode?: string;
  contactPerson: string;
  mobile: string;
  emailId?: string;
}

// General Settings Interface
export interface GeneralSettings {
  enableDivisions: boolean;
  enableDepartment: boolean;
  enableSection: boolean;
  enableGrade: boolean;
  enableLabour: boolean;
  enablePayTemplate: boolean;
  enableShiftTiming: boolean;
  enableBatchwiseRotation: boolean;
  enableMMRReport: boolean;
  companyMachine: number;
  tds: string;
}

// Attendance Settings Interface
export interface AttendanceSettings {
  enableOT: boolean;
  enablePermission: boolean;
  enableCompOff: boolean;
  multiPunch: boolean;
  workBasedOn: boolean;
  attendanceRegisterOnPermission: boolean;
  runPayrollBasedOnAttendance: boolean;
  dontRunPayrollAgainstUnRespondedLeaveRequests: string[];
}

// Incentives Interface
export interface IncentiveSettings {
  otAllowance: boolean;
  otAllowanceType?: 'Auto' | 'Manual';
  otAllowanceOptions?: {
    addToPF: boolean;
    addToESI: boolean;
    addToPayroll: boolean;
    addToPayHeadGroup: boolean;
    addToIT: boolean;
  };
  shiftIncentive: boolean;
  shiftIncentiveType?: 'Auto' | 'Manual';
  shiftIncentiveOptions?: {
    addToPF: boolean;
    addToESI: boolean;
    addToPayroll: boolean;
    addToPayHeadGroup: boolean;
    addToIT: boolean;
  };
  bonus: boolean;
  gratuity: boolean;
}

// Bank Details Interface
export interface BankInfo {
  beneficiaryName: string;
  accountName: string;
  bankName: string;
  accountNo: string;
  ifsc: string;
}

// HR Year Interface
export interface HRYearSettings {
  yearStartsFrom: string;
  yearEndsBy: string;
}

// Symbolic Codes Interface
export interface SymbolicSettings {
  pp: string;
  pa: string;
  ap: string;
  aa: string;
  od: string;
  odp: string;
  pod: string;
  oda: string;
  aod: string;
  workOff: string;
  local: string;
  festivalHoliday: string;
  nationalHoliday: string;
}

// Professional Tax Interface
export interface ProfessionalTaxConfig {
  deduction: 'Yearly' | 'Monthly' | 'Quarterly' | 'HalfYearly';
  startMonth: string;
  withEffectFrom: string;
  professionalTaxEnabled: boolean;
}

export interface ProfessionalTaxSlab {
  grossSalaryFrom: number;
  grossSalaryTo: number;
  tax: number;
  effectFrom?: string;
}

// Print Configuration Interface
export interface PrintConfiguration {
  multiCopy: boolean;
  selectCopies: number;
}

// Complete Company Master Interface
export interface CompanyMaster {
  id?: string;
  company: CompanyInfo;
  statutory: StatutoryInfo;
  locations: LocationInfo[];
  general: GeneralSettings;
  attendance: AttendanceSettings;
  incentives: IncentiveSettings;
  bank: BankInfo[];
  hrYear: HRYearSettings;
  symbolic: SymbolicSettings;
  professionalTax: {
    config: ProfessionalTaxConfig;
    slabs: ProfessionalTaxSlab[];
  };
  printConfiguration: PrintConfiguration;
  createdAt?: string;
  updatedAt?: string;
}

// Form Validation Types
export type CompanyMasterTabKey = 
  | 'company' 
  | 'statutory' 
  | 'locations' 
  | 'general' 
  | 'attendance' 
  | 'incentives' 
  | 'bank' 
  | 'hrYear' 
  | 'symbolic' 
  | 'professionalTax' 
  | 'printConfiguration';

export interface TabValidationStatus {
  [key: string]: {
    isValid: boolean;
    errors: string[];
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

// Dropdown Option Interface
export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}