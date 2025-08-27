import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

// Dynamically import the full component after React context is established
const SmartWrapper: React.FC = () => {
  const [CompanyMasterComponent, setCompanyMasterComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Dynamically import the full component after React hooks context is ready
    const loadComponent = async () => {
      try {
        const { default: CompanyMaster } = await import('./index');
        setCompanyMasterComponent(() => CompanyMaster);
      } catch (err) {
        console.error('Failed to load Company Master component:', err);
        setError('Failed to load Company Master component');
      }
    };

    // Small delay to ensure React context is fully established
    const timer = setTimeout(loadComponent, 100);
    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <Box p={3} bgcolor="error.light" borderRadius={1}>
        <Typography color="error.dark">{error}</Typography>
      </Box>
    );
  }

  if (!CompanyMasterComponent) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200} p={3}>
        <CircularProgress size={24} />
        <Typography ml={2}>Loading Company Master...</Typography>
      </Box>
    );
  }

  return <CompanyMasterComponent />;
};

export default SmartWrapper;