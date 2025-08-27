import { 
  Country, 
  State, 
  City, 
  CompanyMaster, 
  DropdownOption 
} from '@/types/company.types';

// Master Data
export const mockCountries: Country[] = [
  { id: 'IN', name: 'India', code: 'IN' },
  { id: 'US', name: 'United States', code: 'US' },
  { id: 'UK', name: 'United Kingdom', code: 'UK' }
];

export const mockStates: State[] = [
  { id: 'TN', name: 'Tamil Nadu', countryId: 'IN' },
  { id: 'KA', name: 'Karnataka', countryId: 'IN' },
  { id: 'KL', name: 'Kerala', countryId: 'IN' },
  { id: 'MH', name: 'Maharashtra', countryId: 'IN' },
  { id: 'DL', name: 'Delhi', countryId: 'IN' },
  { id: 'CA', name: 'California', countryId: 'US' },
  { id: 'NY', name: 'New York', countryId: 'US' }
];

export const mockCities: City[] = [
  { id: 'CBE', name: 'Coimbatore', stateId: 'TN' },
  { id: 'CHN', name: 'Chennai', stateId: 'TN' },
  { id: 'MDU', name: 'Madurai', stateId: 'TN' },
  { id: 'BLR', name: 'Bangalore', stateId: 'KA' },
  { id: 'MYS', name: 'Mysore', stateId: 'KA' },
  { id: 'COK', name: 'Kochi', stateId: 'KL' },
  { id: 'TVM', name: 'Thiruvananthapuram', stateId: 'KL' },
  { id: 'MUM', name: 'Mumbai', stateId: 'MH' },
  { id: 'PUN', name: 'Pune', stateId: 'MH' },
  { id: 'DEL', name: 'New Delhi', stateId: 'DL' }
];

// Default Company Data
export const mockDefaultCompanyData: CompanyMaster = {
  company: {
    companyName: 'SYSTECH Infovations Pvt Ltd',
    addressLine1: '186/1, I Floor, Varadharaja Layout-1',
    addressLine2: 'Ganapathy',
    country: 'IN',
    state: 'TN',
    city: 'CBE',
    pincode: '639002',
    emailId: 'chidambaram@systecherp.com',
    website: 'systecherp.com',
    contactPerson: 'Chidambaram S',
    designation: 'Product Manager HRMS',
    landlineNo: '422-439922',
    officeMobile: '95854 2131',
    currency: 'INR',
    remarks: ''
  },
  statutory: {
    cinNo: 'U1111TZ1111PTC11111',
    linNo: '99999999999',
    tanNo: 'CHEA22222A',
    panNo: 'ASADASDW2',
    serviceAge: 58,
    indianFactoriesAct: true,
    enablePF: true,
    enableESI: true,
    pfEffectiveFrom: '2020-04-01',
    esiEffectiveFrom: '2020-04-01',
    pfEmployeeContribution: 12,
    esiEmployeeContribution: 0.75,
    pfEmployerContribution: 12,
    employeePensionContribution: 8.33,
    esiEmployerContribution: 3.25,
    pfCeilingAmount: 15000,
    esiCeilingAmount: 21000,
    pfRegistrationCode: 'CBTRY2222222222',
    esiRegistrationCode: '9999999999999999'
  },
  locations: [
    {
      siteType: 'MAIN UNIT',
      siteName: 'MAIN UNIT KGM',
      licenseNo: 'KRR12050',
      esiNo: '111111111111111',
      pfNo: '111111111111111',
      gstinNo: '9999999999999',
      address1: 'Address1',
      address2: 'Address2',
      state: 'TN',
      city: 'CBE',
      pincode: '639002',
      contactPerson: 'Suresh',
      mobile: '9999999999',
      emailId: 'info@tex.in'
    }
  ],
  general: {
    enableDivisions: true,
    enableDepartment: true,
    enableSection: true,
    enableGrade: true,
    enableLabour: true,
    enablePayTemplate: true,
    enableShiftTiming: false,
    enableBatchwiseRotation: true,
    enableMMRReport: true,
    companyMachine: 50,
    tds: 'TDS'
  },
  attendance: {
    enableOT: true,
    enablePermission: true,
    enableCompOff: true,
    multiPunch: true,
    workBasedOn: true,
    attendanceRegisterOnPermission: true,
    runPayrollBasedOnAttendance: false,
    dontRunPayrollAgainstUnRespondedLeaveRequests: ['Staff', 'Worker']
  },
  incentives: {
    otAllowance: true,
    otAllowanceType: 'Auto',
    otAllowanceOptions: {
      addToPF: true,
      addToESI: true,
      addToPayroll: true,
      addToPayHeadGroup: true,
      addToIT: true
    },
    shiftIncentive: true,
    shiftIncentiveType: 'Auto',
    shiftIncentiveOptions: {
      addToPF: false,
      addToESI: false,
      addToPayroll: false,
      addToPayHeadGroup: false,
      addToIT: false
    },
    bonus: true,
    gratuity: true
  },
  bank: [
    {
      beneficiaryName: 'VTex',
      accountName: 'VTex',
      bankName: 'SBI',
      accountNo: '98765432109',
      ifsc: 'UTIB123456'
    }
  ],
  hrYear: {
    yearStartsFrom: 'Apr',
    yearEndsBy: 'Mar'
  },
  symbolic: {
    pp: 'XX',
    pa: 'XA',
    ap: 'AX',
    aa: 'AA',
    od: 'OD',
    odp: 'ODX',
    pod: 'XOD',
    oda: 'ODA',
    aod: 'AOD',
    workOff: 'WO',
    local: 'LH',
    festivalHoliday: 'FH',
    nationalHoliday: 'NH'
  },
  professionalTax: {
    config: {
      deduction: 'Yearly',
      startMonth: 'Jan',
      withEffectFrom: '2023-11-09',
      professionalTaxEnabled: false
    },
    slabs: [
      {
        grossSalaryFrom: 12000,
        grossSalaryTo: 20000,
        tax: 2
      },
      {
        grossSalaryFrom: 20001,
        grossSalaryTo: 30000,
        tax: 5
      }
    ]
  },
  printConfiguration: {
    multiCopy: true,
    selectCopies: 2
  }
};

// Dropdown Options
export const monthOptions: DropdownOption[] = [
  { value: 'Jan', label: 'January' },
  { value: 'Feb', label: 'February' },
  { value: 'Mar', label: 'March' },
  { value: 'Apr', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'Jun', label: 'June' },
  { value: 'Jul', label: 'July' },
  { value: 'Aug', label: 'August' },
  { value: 'Sep', label: 'September' },
  { value: 'Oct', label: 'October' },
  { value: 'Nov', label: 'November' },
  { value: 'Dec', label: 'December' }
];

export const currencyOptions: DropdownOption[] = [
  { value: 'INR', label: 'Indian Rupee (₹)' },
  { value: 'USD', label: 'US Dollar ($)' },
  { value: 'EUR', label: 'Euro (€)' },
  { value: 'GBP', label: 'British Pound (£)' }
];

export const siteTypeOptions: DropdownOption[] = [
  { value: 'MAIN UNIT', label: 'Main Unit' },
  { value: 'UNIT-II', label: 'Unit II' },
  { value: 'UNIT-III', label: 'Unit III' },
  { value: 'UNIT-IV', label: 'Unit IV' },
  { value: 'WEAVING UNIT', label: 'Weaving Unit' }
];

export const deductionTypeOptions: DropdownOption[] = [
  { value: 'Yearly', label: 'Yearly' },
  { value: 'Monthly', label: 'Monthly' },
  { value: 'Quarterly', label: 'Quarterly' },
  { value: 'HalfYearly', label: 'Half Yearly' }
];

export const tdsOptions: DropdownOption[] = [
  { value: 'TDS', label: 'TDS' },
  { value: 'TCS', label: 'TCS' },
  { value: 'NONE', label: 'None' }
];

// Helper Functions
export const getStatesByCountry = (countryId: string): State[] => {
  return mockStates.filter(state => state.countryId === countryId);
};

export const getCitiesByState = (stateId: string): City[] => {
  return mockCities.filter(city => city.stateId === stateId);
};

export const getCountryName = (countryId: string): string => {
  const country = mockCountries.find(c => c.id === countryId);
  return country?.name || '';
};

export const getStateName = (stateId: string): string => {
  const state = mockStates.find(s => s.id === stateId);
  return state?.name || '';
};

export const getCityName = (cityId: string): string => {
  const city = mockCities.find(c => c.id === cityId);
  return city?.name || '';
};