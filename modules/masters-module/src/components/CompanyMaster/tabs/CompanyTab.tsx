import React, { useEffect, useState } from 'react';
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
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Avatar,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Business as BusinessIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useCompanyStore } from '@/store/companyStore';
import { CompanyInfo } from '@/types/company.types';
import { masterDataApi, companyApi } from '@/services/companyApi';
import { currencyOptions } from '@/services/mockData';

// Validation schema
const companySchema = yup.object({
  companyName: yup.string().required('Company name is required'),
  addressLine1: yup.string().required('Address line 1 is required'),
  addressLine2: yup.string(),
  country: yup.string().required('Country is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  pincode: yup.string().required('Pincode is required').matches(/^[0-9]{6}$/, 'Pincode must be 6 digits'),
  emailId: yup.string().required('Email is required').email('Invalid email format'),
  website: yup.string().url('Invalid website URL'),
  contactPerson: yup.string().required('Contact person is required'),
  designation: yup.string().required('Designation is required'),
  landlineNo: yup.string().matches(/^[0-9-+\s]*$/, 'Invalid landline number'),
  officeMobile: yup.string().matches(/^[0-9\s]*$/, 'Invalid mobile number'),
  currency: yup.string().required('Currency is required'),
  remarks: yup.string()
});

const CompanyTab: React.FC = () => {
  const {
    companyData,
    updateCompanySection,
    countries,
    states,
    cities,
    setCountries,
    setStates,
    setCities,
    countriesLoading,
    statesLoading,
    citiesLoading,
    setCountriesLoading,
    setStatesLoading,
    setCitiesLoading,
    isSaving,
    setSaving,
    setTabValidation
  } = useCompanyStore();

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  // Form setup
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isDirty }
  } = useForm<CompanyInfo>({
    resolver: yupResolver(companySchema),
    defaultValues: companyData.company,
    mode: 'onChange'
  });

  const watchedCountry = watch('country');
  const watchedState = watch('state');

  // Load master data
  useEffect(() => {
    loadCountries();
  }, []);

  useEffect(() => {
    if (watchedCountry) {
      loadStates(watchedCountry);
      setValue('state', '');
      setValue('city', '');
    }
  }, [watchedCountry, setValue]);

  useEffect(() => {
    if (watchedState) {
      loadCities(watchedState);
      setValue('city', '');
    }
  }, [watchedState, setValue]);

  // Update tab validation status
  useEffect(() => {
    setTabValidation('company', {
      isValid: isValid && !Object.keys(errors).length,
      errors: Object.values(errors).map(error => error?.message || 'Validation error')
    });
  }, [isValid, errors, setTabValidation]);

  const loadCountries = async () => {
    setCountriesLoading(true);
    try {
      const response = await masterDataApi.getCountries();
      if (response.success && response.data) {
        setCountries(response.data);
      }
    } catch (error) {
      console.error('Failed to load countries:', error);
    } finally {
      setCountriesLoading(false);
    }
  };

  const loadStates = async (countryId: string) => {
    setStatesLoading(true);
    try {
      const response = await masterDataApi.getStates(countryId);
      if (response.success && response.data) {
        setStates(response.data);
      }
    } catch (error) {
      console.error('Failed to load states:', error);
    } finally {
      setStatesLoading(false);
    }
  };

  const loadCities = async (stateId: string) => {
    setCitiesLoading(true);
    try {
      const response = await masterDataApi.getCities(stateId);
      if (response.success && response.data) {
        setCities(response.data);
      }
    } catch (error) {
      console.error('Failed to load cities:', error);
    } finally {
      setCitiesLoading(false);
    }
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    try {
      const response = await companyApi.uploadLogo(file);
      if (response.success && response.data) {
        setLogoPreview(response.data);
        setLogoFile(file);
      } else {
        alert(response.message || 'Failed to upload logo');
      }
    } catch (error) {
      console.error('Logo upload error:', error);
      alert('Failed to upload logo');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleLogoRemove = () => {
    setLogoPreview(null);
    setLogoFile(null);
  };

  const onSubmit = async (data: CompanyInfo) => {
    setSaving(true);
    try {
      // Include logo in the data
      const companyDataWithLogo = {
        ...data,
        logo: logoFile || logoPreview || undefined
      };

      updateCompanySection('company', companyDataWithLogo);
      
      // Simulate save to backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Company information saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save company information');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box p={3}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Company Logo Section */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Company Logo
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    sx={{ width: 100, height: 100 }}
                    src={logoPreview || undefined}
                  >
                    <BusinessIcon sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Box>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="logo-upload"
                      type="file"
                      onChange={handleLogoUpload}
                    />
                    <label htmlFor="logo-upload">
                      <Button
                        variant="outlined"
                        component="span"
                        startIcon={uploadingLogo ? <CircularProgress size={20} /> : <UploadIcon />}
                        disabled={uploadingLogo}
                        sx={{ mr: 1 }}
                      >
                        {uploadingLogo ? 'Uploading...' : 'Upload Logo'}
                      </Button>
                    </label>
                    {logoPreview && (
                      <Tooltip title="Remove logo">
                        <IconButton onClick={handleLogoRemove} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Basic Information */}
          <Grid item xs={12} md={6}>
            <Controller
              name="companyName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Company Name"
                  required
                  fullWidth
                  error={!!errors.companyName}
                  helperText={errors.companyName?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="emailId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email ID"
                  type="email"
                  required
                  fullWidth
                  error={!!errors.emailId}
                  helperText={errors.emailId?.message}
                />
              )}
            />
          </Grid>

          {/* Address Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Address Information
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="addressLine1"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address Line 1"
                  required
                  fullWidth
                  error={!!errors.addressLine1}
                  helperText={errors.addressLine1?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="addressLine2"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address Line 2"
                  fullWidth
                  error={!!errors.addressLine2}
                  helperText={errors.addressLine2?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth required error={!!errors.country}>
              <InputLabel>Country</InputLabel>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Country"
                    disabled={countriesLoading}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.id} value={country.id}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.country && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {errors.country.message}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth required error={!!errors.state}>
              <InputLabel>State</InputLabel>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="State"
                    disabled={statesLoading || !watchedCountry}
                  >
                    {states.map((state) => (
                      <MenuItem key={state.id} value={state.id}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.state && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {errors.state.message}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth required error={!!errors.city}>
              <InputLabel>City</InputLabel>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="City"
                    disabled={citiesLoading || !watchedState}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city.id} value={city.id}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.city && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {errors.city.message}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <Controller
              name="pincode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Pincode"
                  required
                  fullWidth
                  error={!!errors.pincode}
                  helperText={errors.pincode?.message}
                />
              )}
            />
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Contact Information
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="contactPerson"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contact Person"
                  required
                  fullWidth
                  error={!!errors.contactPerson}
                  helperText={errors.contactPerson?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="designation"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Designation"
                  required
                  fullWidth
                  error={!!errors.designation}
                  helperText={errors.designation?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Controller
              name="landlineNo"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Landline Number"
                  fullWidth
                  error={!!errors.landlineNo}
                  helperText={errors.landlineNo?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Controller
              name="officeMobile"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Office Mobile"
                  fullWidth
                  error={!!errors.officeMobile}
                  helperText={errors.officeMobile?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth required error={!!errors.currency}>
              <InputLabel>Currency</InputLabel>
              <Controller
                name="currency"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Currency">
                    {currencyOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.currency && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {errors.currency.message}
                </Typography>
              )}
            </FormControl>
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
                  error={!!errors.website}
                  helperText={errors.website?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="remarks"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Remarks"
                  multiline
                  rows={3}
                  fullWidth
                  error={!!errors.remarks}
                  helperText={errors.remarks?.message}
                />
              )}
            />
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12}>
            <Box display="flex" gap={2} justifyContent="flex-end" sx={{ mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={!isDirty || isSaving}
                startIcon={isSaving ? <CircularProgress size={20} /> : null}
              >
                {isSaving ? 'Saving...' : 'Save Company Information'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>

      {/* Form validation summary */}
      {Object.keys(errors).length > 0 && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Please correct the validation errors above before saving.
        </Alert>
      )}
    </Box>
  );
};

export default CompanyTab;