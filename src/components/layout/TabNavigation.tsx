import React from 'react'

const TabNavigation: React.FC = () => {
  const tabs = [
    { id: 'overview', label: 'Overview', active: true },
    { id: 'analytics', label: 'Analytics', active: false },
    { id: 'reports', label: 'Reports', active: false },
  ]

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="px-6">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                tab.active
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default TabNavigation