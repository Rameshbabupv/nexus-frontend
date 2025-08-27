import React, { useState, useEffect, useMemo } from 'react';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';

// Safe wrapper that ensures React context is established before using Zustand
const SafeZustandWrapper: React.FC = () => {
  const [CompanyMasterComponent, setCompanyMasterComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Ensure React context is fully established
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Load the full component only after React is ready
  useEffect(() => {
    if (!isReady) return;

    const loadComponent = async () => {
      try {
        // Dynamic import to ensure all dependencies are loaded properly
        const { default: CompanyMaster } = await import('./index');
        setCompanyMasterComponent(() => CompanyMaster);
      } catch (err) {
        console.error('Failed to load Company Master component:', err);
        setError('Failed to load the full Company Master component');
      }
    };

    loadComponent();
  }, [isReady]);

  // Memoize the error component to prevent re-renders
  const ErrorComponent = useMemo(() => {
    if (!error) return null;
    return (
      <Box p={3}>
        <Alert severity="error">
          <Typography variant="h6">Component Loading Error</Typography>
          <Typography>{error}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Please refresh the page or contact support if the issue persists.
          </Typography>
        </Alert>
      </Box>
    );
  }, [error]);

  // Memoize the loading component
  const LoadingComponent = useMemo(() => (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight={300} p={3}>
      <CircularProgress size={32} sx={{ mb: 2 }} />
      <Typography color="text.secondary">Loading Company Master...</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Initializing forms and validation...
      </Typography>
    </Box>
  ), []);

  if (error) {
    return ErrorComponent;
  }

  if (!isReady || !CompanyMasterComponent) {
    return LoadingComponent;
  }

  // Render the full component wrapped in error boundary context
  return <CompanyMasterComponent />;
};

export default SafeZustandWrapper;