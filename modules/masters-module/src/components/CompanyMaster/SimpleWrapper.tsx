import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

// Simple component without any hooks to test React sharing
const SimpleWrapper: React.FC = () => {
  return (
    <Paper sx={{ p: 3, m: 2 }}>
      <Typography variant="h4" gutterBottom>
        Company Master (Simple Test)
      </Typography>
      <Typography variant="body1">
        This is a simple test component to verify React sharing is working correctly.
        If you can see this message, React is being shared properly between the shell and masters module.
      </Typography>
      <Box mt={2} p={2} bgcolor="success.light" borderRadius={1}>
        <Typography variant="body2" color="success.dark">
          ✅ React hooks context is working! Module Federation is configured correctly.
        </Typography>
      </Box>
    </Paper>
  );
};

export default SimpleWrapper;