import React from 'react'

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Employees
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                1,234
              </p>
            </div>
            <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
              👥
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Present Today
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                987
              </p>
            </div>
            <div className="p-3 bg-success-100 dark:bg-success-900/20 rounded-lg">
              ✅
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                On Leave
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                45
              </p>
            </div>
            <div className="p-3 bg-warning-100 dark:bg-warning-900/20 rounded-lg">
              🏖️
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Pending Approvals
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                12
              </p>
            </div>
            <div className="p-3 bg-error-100 dark:bg-error-900/20 rounded-lg">
              ⏳
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activities
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                New employee John Doe joined the team
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Leave request approved for Jane Smith
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-warning-500 rounded-full"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Payroll processing completed for March
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 text-left rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Add Employee
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Create new profile
              </div>
            </button>
            <button className="p-3 text-left rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Process Payroll
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Run calculations
              </div>
            </button>
            <button className="p-3 text-left rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Generate Report
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Export data
              </div>
            </button>
            <button className="p-3 text-left rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                View Analytics
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Check insights
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard