import React, { Suspense, lazy } from 'react'
import ErrorBoundary from './ErrorBoundary'

// Import the remote module using Vite Module Federation
const EmployeeApp = lazy(() => 
  // @ts-ignore - This will be resolved by Module Federation at runtime
  import('employeeModule/EmployeeApp')
)

const EmployeeModuleWrapper: React.FC = () => {
  const LoadingFallback = (
    <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center space-x-2">
        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-blue-700">Loading Employee module...</span>
      </div>
    </div>
  )

  return (
    <ErrorBoundary moduleName="Employee Module">
      <Suspense fallback={LoadingFallback}>
        <EmployeeApp />
      </Suspense>
    </ErrorBoundary>
  )
}

export default EmployeeModuleWrapper