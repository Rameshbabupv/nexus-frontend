import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  moduleName?: string
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Error in ${this.props.moduleName || 'component'}:`, error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">!</span>
            </div>
            <h3 className="text-lg font-semibold text-red-800">
              Module Error: {this.props.moduleName || 'Unknown Module'}
            </h3>
          </div>
          <p className="text-red-700 mb-4">
            This module encountered an error and could not be loaded. The shell application continues to work normally.
          </p>
          <details className="text-sm">
            <summary className="cursor-pointer text-red-600 hover:text-red-800">
              Technical Details
            </summary>
            <pre className="mt-2 p-3 bg-red-100 rounded text-xs overflow-auto">
              {this.state.error?.message}
              {this.state.error?.stack}
            </pre>
          </details>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Retry Loading Module
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary