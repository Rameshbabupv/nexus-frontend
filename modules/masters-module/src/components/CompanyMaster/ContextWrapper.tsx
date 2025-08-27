import React from 'react';
import CompanyMaster from './index';

// This wrapper ensures React context is properly established before using Zustand
const ContextWrapper: React.FC = () => {
  // Use React.createElement to ensure proper context
  return React.createElement(CompanyMaster);
};

export default ContextWrapper;