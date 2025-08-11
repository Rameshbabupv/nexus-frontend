import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-3">
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div>© 2024 Nexus HRMS. All rights reserved.</div>
        <div className="flex space-x-4">
          <span>Version 1.0.0</span>
          <span>•</span>
          <span>Support</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer