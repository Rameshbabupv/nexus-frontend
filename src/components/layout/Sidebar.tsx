import React from 'react'

interface SidebarProps {
  currentModule: string
  onModuleChange: (module: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ currentModule, onModuleChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'employee', label: 'Employees', icon: '👥' },
    { id: 'attendance', label: 'Attendance', icon: '📅' },
    { id: 'leave', label: 'Leave Management', icon: '🏖️' },
    { id: 'payroll', label: 'Payroll', icon: '💰' },
  ]

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4">
        <h1 className="text-xl font-bold">Nexus HRMS</h1>
        <p className="text-xs text-gray-400 mt-1">Shell Application v1.0</p>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onModuleChange(item.id)}
                className={`w-full text-left p-3 rounded transition-colors flex items-center space-x-3 ${
                  currentModule === item.id
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-700 text-gray-300'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
                {currentModule === item.id && (
                  <span className="ml-auto w-2 h-2 bg-white rounded-full"></span>
                )}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="text-xs text-gray-500">
            <div className="mb-2">
              <span className="font-medium">Active Module:</span>
            </div>
            <div className="bg-gray-700 p-2 rounded text-xs">
              {currentModule === 'dashboard' && '🏠 Built-in Dashboard'}
              {currentModule === 'employee' && '🔗 Remote Employee Module'}
              {currentModule !== 'dashboard' && currentModule !== 'employee' && '⚠️ Not Implemented'}
            </div>
          </div>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar