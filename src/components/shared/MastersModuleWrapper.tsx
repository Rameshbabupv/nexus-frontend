import React, { Suspense, lazy } from 'react'
import ErrorBoundary from './ErrorBoundary'

// Import the remote module using Vite Module Federation
const CompanyMaster = lazy(() => 
  // @ts-ignore - This will be resolved by Module Federation at runtime
  import('mastersModule/CompanyMaster')
)

const MastersModuleWrapper: React.FC = () => {
  const LoadingFallback = (
    <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center space-x-2">
        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-blue-700">Loading Masters module...</span>
      </div>
    </div>
  )

  return (
    <ErrorBoundary moduleName="Masters Module">
      <Suspense fallback={LoadingFallback}>
        <CompanyMaster />
      </Suspense>
    </ErrorBoundary>
  )
}

export default MastersModuleWrapper