import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Dashboard
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <span className="sr-only">Notifications</span>
            🔔
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              U
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              User Name
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header