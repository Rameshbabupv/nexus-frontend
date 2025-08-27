import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Container,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Business as BusinessIcon,
  AccountBalance as StatutoryIcon,
  LocationOn as LocationIcon,
  Settings as GeneralIcon,
  AccessTime as AttendanceIcon,
  MonetizationOn as IncentiveIcon,
  AccountBalance as BankIcon,
  DateRange as HRYearIcon,
  Code as SymbolicIcon,
  Receipt as TaxIcon,
  Print as PrintIcon
} from '@mui/icons-material';

import { useCompanyStore } from '@/store/companyStore';
import { CompanyMasterTabKey } from '@/types/company.types';
import CompanyTab from './tabs/CompanyTab';

// Tab configuration
const tabs = [
  { key: 'company' as CompanyMasterTabKey, label: 'Company', icon: <BusinessIcon /> },
  { key: 'statutory' as CompanyMasterTabKey, label: 'Statutory Info', icon: <StatutoryIcon /> },
  { key: 'locations' as CompanyMasterTabKey, label: 'Locations', icon: <LocationIcon /> },
  { key: 'general' as CompanyMasterTabKey, label: 'General', icon: <GeneralIcon /> },
  { key: 'attendance' as CompanyMasterTabKey, label: 'Attendance', icon: <AttendanceIcon /> },
  { key: 'incentives' as CompanyMasterTabKey, label: 'Incentives', icon: <IncentiveIcon /> },
  { key: 'bank' as CompanyMasterTabKey, label: 'Bank', icon: <BankIcon /> },
  { key: 'hrYear' as CompanyMasterTabKey, label: 'HR Year', icon: <HRYearIcon /> },
  { key: 'symbolic' as CompanyMasterTabKey, label: 'Symbolic', icon: <SymbolicIcon /> },
  { key: 'professionalTax' as CompanyMasterTabKey, label: 'Professional Tax', icon: <TaxIcon /> },
  { key: 'printConfiguration' as CompanyMasterTabKey, label: 'Print Config', icon: <PrintIcon /> }
];

const CompanyMaster: React.FC = () => {
  const { 
    currentTab, 
    setCurrentTab, 
    isLoading,
    tabValidations 
  } = useCompanyStore();

  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: CompanyMasterTabKey) => {
    setCurrentTab(newValue);
  };

  // Get tab validation status
  const getTabColor = (tabKey: string): 'primary' | 'error' | 'warning' => {
    const validation = tabValidations[tabKey];
    if (!validation) return 'primary';
    return validation.isValid ? 'primary' : 'error';
  };

  // Render tab content
  const renderTabContent = () => {
    if (isLoading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
          <CircularProgress />
        </Box>
      );
    }

    switch (currentTab) {
      case 'company':
        return <CompanyTab />;
      case 'statutory':
        return (
          <Box p={3}>
            <Alert severity="info">
              Statutory Info tab implementation coming soon...
            </Alert>
          </Box>
        );
      case 'locations':
        return (
          <Box p={3}>
            <Alert severity="info">
              Locations tab implementation coming soon...
            </Alert>
          </Box>
        );
      case 'general':
        return (
          <Box p={3}>
            <Alert severity="info">
              General tab implementation coming soon...
            </Alert>
          </Box>
        );
      case 'attendance':
        return (
          <Box p={3}>
            <Alert severity="info">
              Attendance tab implementation coming soon...
            </Alert>
          </Box>
        );
      case 'incentives':
        return (
          <Box p={3}>
            <Alert severity="info">
              Incentives tab implementation coming soon...
            </Alert>
          </Box>
        );
      case 'bank':
        return (
          <Box p={3}>
            <Alert severity="info">
              Bank tab implementation coming soon...
            </Alert>
          </Box>
        );
      case 'hrYear':
        return (
          <Box p={3}>
            <Alert severity="info">
              HR Year tab implementation coming soon...
            </Alert>
          </Box>
        );
      case 'symbolic':
        return (
          <Box p={3}>
            <Alert severity="info">
              Symbolic tab implementation coming soon...
            </Alert>
          </Box>
        );
      case 'professionalTax':
        return (
          <Box p={3}>
            <Alert severity="info">
              Professional Tax tab implementation coming soon...
            </Alert>
          </Box>
        );
      case 'printConfiguration':
        return (
          <Box p={3}>
            <Alert severity="info">
              Print Configuration tab implementation coming soon...
            </Alert>
          </Box>
        );
      default:
        return (
          <Box p={3}>
            <Alert severity="warning">
              Unknown tab selected
            </Alert>
          </Box>
        );
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Box mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Company Master
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure your company information, statutory details, and system settings
        </Typography>
      </Box>

      <Paper elevation={2}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minWidth: 'auto',
                textTransform: 'none',
                fontSize: '0.875rem'
              }
            }}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.key}
                value={tab.key}
                label={tab.label}
                icon={tab.icon}
                iconPosition="start"
                color={getTabColor(tab.key)}
                sx={{
                  color: getTabColor(tab.key) === 'error' ? 'error.main' : 'inherit'
                }}
              />
            ))}
          </Tabs>
        </Box>

        <Box>
          {renderTabContent()}
        </Box>
      </Paper>
    </Container>
  );
};

export default CompanyMaster;