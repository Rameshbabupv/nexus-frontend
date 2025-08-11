import React, { Suspense, lazy, ComponentType } from 'react'
import ErrorBoundary from './ErrorBoundary'

interface ModuleLoaderProps {
  moduleName: string
  moduleUrl: string
  componentName: string
  fallback?: React.ReactNode
}

const ModuleLoader: React.FC<ModuleLoaderProps> = ({
  moduleName,
  moduleUrl,
  componentName,
  fallback,
}) => {
  // Create a lazy-loaded component that dynamically imports the remote module
  const LazyComponent = lazy(async () => {
    try {
      // @ts-ignore - Dynamic import will be resolved at runtime
      const module = await import(/* @vite-ignore */ moduleUrl)
      return {
        default: module[componentName] || module.default,
      }
    } catch (error) {
      console.error(`Failed to load module ${moduleName}:`, error)
      // Return a fallback component if module fails to load
      return {
        default: () => (
          <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
              <h3 className="text-lg font-semibold text-yellow-800">
                Module Unavailable: {moduleName}
              </h3>
            </div>
            <p className="text-yellow-700 mb-4">
              The {moduleName} module is currently unavailable. Please ensure the module is running and try again.
            </p>
            <div className="text-sm text-yellow-600">
              <p>Expected URL: {moduleUrl}</p>
              <p>Component: {componentName}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        ),
      }
    }
  })

  const LoadingFallback = fallback || (
    <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center space-x-2">
        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-blue-700">Loading {moduleName} module...</span>
      </div>
    </div>
  )

  return (
    <ErrorBoundary moduleName={moduleName}>
      <Suspense fallback={LoadingFallback}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  )
}

export default ModuleLoader