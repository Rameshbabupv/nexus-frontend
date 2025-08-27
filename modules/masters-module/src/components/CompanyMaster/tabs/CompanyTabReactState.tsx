import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Alert,
  Paper,
  Divider,
  FormHelperText
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Mock data
const mockCountries = [
  { id: '1', name: 'India', code: 'IN' },
  { id: '2', name: 'United States', code: 'US' },
  { id: '3', name: 'United Kingdom', code: 'UK' }
];

const mockStates = [
  { id: '1', name: 'Karnataka', code: 'KA', countryId: '1' },
  { id: '2', name: 'Maharashtra', code: 'MH', countryId: '1' },
  { id: '3', name: 'California', code: 'CA', countryId: '2' }
];

const mockCities = [
  { id: '1', name: 'Bangalore', code: 'BLR', stateId: '1' },
  { id: '2', name: 'Mumbai', code: 'MUM', stateId: '2' },
  { id: '3', name: 'Los Angeles', code: 'LA', stateId: '3' }
];

// Validation schema
const companySchema = yup.object({
  companyName: yup.string().required('Company name is required').min(2, 'Minimum 2 characters'),
  companyCode: yup.string().required('Company code is required').min(2, 'Minimum 2 characters'),
  registrationNumber: yup.string().required('Registration number is required'),
  panNumber: yup.string().matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format'),
  gstNumber: yup.string().matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/, 'Invalid GST format'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  website: yup.string().url('Invalid URL format'),
  address: yup.string().required('Address is required'),
  countryId: yup.string().required('Country is required'),
  stateId: yup.string().required('State is required'),
  cityId: yup.string().required('City is required'),
  pincode: yup.string().matches(/^[0-9]{6}$/, 'Invalid pincode format').required('Pincode is required')
});

type CompanyFormData = yup.InferType<typeof companySchema>;

const CompanyTabReactState: React.FC = () => {
  const [countries] = useState(mockCountries);
  const [states, setStates] = useState(mockStates);
  const [cities, setCities] = useState(mockCities);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<CompanyFormData>({
    resolver: yupResolver(companySchema),
    mode: 'onChange',
    defaultValues: {
      companyName: 'Systech Solutions Pvt Ltd',
      companyCode: 'SYSTECH',
      registrationNumber: 'REG123456789',
      panNumber: 'ABCDE1234F',
      gstNumber: '29ABCDE1234F1Z5',
      email: 'info@systech.com',
      phone: '+91 9876543210',
      website: 'https://www.systech.com',
      address: '123 Tech Park, Electronic City',
      countryId: '1',
      stateId: '1',
      cityId: '1',
      pincode: '560100'
    }
  });

  // Watch country and state changes for cascading dropdowns
  const selectedCountryId = watch('countryId');
  const selectedStateId = watch('stateId');

  // Handle country change
  React.useEffect(() => {
    if (selectedCountryId) {
      const filteredStates = mockStates.filter(state => state.countryId === selectedCountryId);
      setStates(filteredStates);
      
      // Reset state and city when country changes
      setValue('stateId', '');
      setValue('cityId', '');
      setCities([]);
    }
  }, [selectedCountryId, setValue]);

  // Handle state change
  React.useEffect(() => {
    if (selectedStateId) {
      const filteredCities = mockCities.filter(city => city.stateId === selectedStateId);
      setCities(filteredCities);
      
      // Reset city when state changes
      setValue('cityId', '');
    }
  }, [selectedStateId, setValue]);

  const onSubmit = async (data: CompanyFormData) => {
    setIsSaving(true);
    setSaveSuccess(false);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Company data saved:', data);
    setIsSaving(false);
    setSaveSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <Box p={3}>
      <Typography variant="h6" gutterBottom>
        Company Information
      </Typography>
      
      {saveSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Company information saved successfully!
        </Alert>
      )}

      <Paper elevation={1} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Basic Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Company Name"
                    fullWidth
                    required
                    error={!!errors.companyName}
                    helperText={errors.companyName?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="companyCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Company Code"
                    fullWidth
                    required
                    error={!!errors.companyCode}
                    helperText={errors.companyCode?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="registrationNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Registration Number"
                    fullWidth
                    required
                    error={!!errors.registrationNumber}
                    helperText={errors.registrationNumber?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="panNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="PAN Number"
                    fullWidth
                    placeholder="ABCDE1234F"
                    error={!!errors.panNumber}
                    helperText={errors.panNumber?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="gstNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="GST Number"
                    fullWidth
                    placeholder="22AAAAA0000A1Z5"
                    error={!!errors.gstNumber}
                    helperText={errors.gstNumber?.message}
                  />
                )}
              />
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Contact Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    fullWidth
                    required
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    fullWidth
                    required
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="website"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Website"
                    fullWidth
                    placeholder="https://www.company.com"
                    error={!!errors.website}
                    helperText={errors.website?.message}
                  />
                )}
              />
            </Grid>

            {/* Address Information */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Address Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Address"
                    fullWidth
                    multiline
                    rows={3}
                    required
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="countryId"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth required error={!!errors.countryId}>
                    <InputLabel>Country</InputLabel>
                    <Select
                      {...field}
                      label="Country"
                    >
                      {countries.map((country) => (
                        <MenuItem key={country.id} value={country.id}>
                          {country.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.countryId && (
                      <FormHelperText>{errors.countryId.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="stateId"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth required error={!!errors.stateId}>
                    <InputLabel>State</InputLabel>
                    <Select
                      {...field}
                      label="State"
                      disabled={!selectedCountryId}
                    >
                      {states.map((state) => (
                        <MenuItem key={state.id} value={state.id}>
                          {state.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.stateId && (
                      <FormHelperText>{errors.stateId.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="cityId"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth required error={!!errors.cityId}>
                    <InputLabel>City</InputLabel>
                    <Select
                      {...field}
                      label="City"
                      disabled={!selectedStateId}
                    >
                      {cities.map((city) => (
                        <MenuItem key={city.id} value={city.id}>
                          {city.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.cityId && (
                      <FormHelperText>{errors.cityId.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="pincode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Pincode"
                    fullWidth
                    required
                    placeholder="560001"
                    error={!!errors.pincode}
                    helperText={errors.pincode?.message}
                  />
                )}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Box display="flex" gap={2}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!isValid || isSaving}
                  sx={{ minWidth: 120 }}
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
                <Button
                  variant="outlined"
                  disabled={isSaving}
                >
                  Reset
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default CompanyTabReactState;