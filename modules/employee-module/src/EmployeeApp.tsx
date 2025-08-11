import React, { useState, useEffect } from 'react'

const EmployeeApp: React.FC = () => {
  const [timestamp, setTimestamp] = useState<string>('')
  const [moduleStatus, setModuleStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    // Simulate module initialization
    const timer = setTimeout(() => {
      setTimestamp(new Date().toLocaleString())
      setModuleStatus('ready')
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (moduleStatus === 'loading') {
    return (
      <div className="p-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <h1 className="text-2xl font-bold text-green-800">Employee Module Loading...</h1>
        </div>
        <p className="text-green-700">Initializing micro-frontend module...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-8 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border border-green-300">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">👥</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-green-800">
              🎉 Hello World from Employee Module!
            </h1>
            <p className="text-green-600 mt-1">
              Independent micro-frontend running on port 3001
            </p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-green-200">
          <h2 className="font-semibold text-gray-800 mb-2">Module Information</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">Module Name:</span>
              <span className="ml-2 text-gray-800">Employee Management</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Port:</span>
              <span className="ml-2 text-gray-800">3001</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Status:</span>
              <span className="ml-2 text-green-600 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                Active & Independent
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Loaded At:</span>
              <span className="ml-2 text-gray-800">{timestamp}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Demo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <span className="mr-2">🔧</span>
            Module Features
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Independent React application
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Runs on separate port (3001)
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Can be started/stopped independently
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Hot reload without affecting shell
            </li>
          </ul>
        </div>

        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <span className="mr-2">⚡</span>
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button className="w-full p-2 text-left bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors">
              <div className="font-medium text-blue-800">View All Employees</div>
              <div className="text-xs text-blue-600">Manage employee records</div>
            </button>
            <button className="w-full p-2 text-left bg-green-50 hover:bg-green-100 rounded border border-green-200 transition-colors">
              <div className="font-medium text-green-800">Add New Employee</div>
              <div className="text-xs text-green-600">Create employee profile</div>
            </button>
            <button className="w-full p-2 text-left bg-purple-50 hover:bg-purple-100 rounded border border-purple-200 transition-colors">
              <div className="font-medium text-purple-800">Employee Analytics</div>
              <div className="text-xs text-purple-600">View reports and insights</div>
            </button>
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-800">1,234</div>
          <div className="text-sm text-blue-600">Total Employees</div>
        </div>
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-800">56</div>
          <div className="text-sm text-green-600">New This Month</div>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="text-2xl font-bold text-yellow-800">12</div>
          <div className="text-sm text-yellow-600">Pending Onboarding</div>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-800">8</div>
          <div className="text-sm text-purple-600">Departments</div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-center text-sm text-gray-600">
          🚀 <strong>Employee Module v1.0</strong> - Micro-frontend architecture demonstration
        </p>
        <p className="text-center text-xs text-gray-500 mt-1">
          This module can be developed, deployed, and scaled independently from the shell application
        </p>
      </div>
    </div>
  )
}

export default EmployeeApp