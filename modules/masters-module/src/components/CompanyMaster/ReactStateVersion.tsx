import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Container,
  Alert,
} from '@mui/material';
import {
  Business as BusinessIcon,
  AccountBalance as StatutoryIcon,
  LocationOn as LocationIcon,
  Settings as GeneralIcon,
} from '@mui/icons-material';

type TabKey = 'company' | 'statutory' | 'locations' | 'general';

// Simple version without Zustand to test React hooks
const ReactStateVersion: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabKey>('company');

  const tabs = [
    { key: 'company' as TabKey, label: 'Company', icon: <BusinessIcon /> },
    { key: 'statutory' as TabKey, label: 'Statutory Info', icon: <StatutoryIcon /> },
    { key: 'locations' as TabKey, label: 'Locations', icon: <LocationIcon /> },
    { key: 'general' as TabKey, label: 'General', icon: <GeneralIcon /> },
  ];

  const handleTabChange = (_event: React.SyntheticEvent, newValue: TabKey) => {
    setCurrentTab(newValue);
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case 'company':
        return (
          <Box p={3}>
            <Alert severity="success">
              ✅ Company tab loaded successfully! React hooks are working properly.
              Module Federation is configured correctly.
            </Alert>
          </Box>
        );
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
          Company Master (React State Version)
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Testing React hooks compatibility with Module Federation
        </Typography>
      </Box>

      <Paper elevation={2}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.key}
                value={tab.key}
                label={tab.label}
                icon={tab.icon}
                iconPosition="start"
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

export default ReactStateVersion;