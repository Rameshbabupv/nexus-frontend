import React from 'react'

interface SidebarProps {
  currentModule: string
  onModuleChange: (module: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ currentModule, onModuleChange }) => {
  const [expandedSections, setExpandedSections] = React.useState<string[]>(['administration'])

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', type: 'single' },
    { id: 'employee', label: 'Employees', icon: '👥', type: 'single' },
    { id: 'attendance', label: 'Attendance', icon: '📅', type: 'single' },
    { id: 'leave', label: 'Leave Management', icon: '🏖️', type: 'single' },
    { id: 'payroll', label: 'Payroll', icon: '💰', type: 'single' },
    { 
      id: 'administration', 
      label: 'Administration', 
      icon: '⚙️', 
      type: 'section',
      submenu: [
        { id: 'company-master', label: 'Company Master', icon: '🏢' },
        { id: 'employee-master', label: 'Employee Master', icon: '👤' },
        { id: 'department-master', label: 'Department Master', icon: '🏛️' },
      ]
    },
  ]

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

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
              {item.type === 'single' ? (
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
              ) : (
                <div>
                  <button
                    onClick={() => toggleSection(item.id)}
                    className="w-full text-left p-3 rounded transition-colors flex items-center space-x-3 hover:bg-gray-700 text-gray-300"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                    <span className="ml-auto text-sm">
                      {expandedSections.includes(item.id) ? '▼' : '▶'}
                    </span>
                  </button>
                  {expandedSections.includes(item.id) && item.submenu && (
                    <ul className="ml-6 mt-2 space-y-1">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.id}>
                          <button
                            onClick={() => onModuleChange(subItem.id)}
                            className={`w-full text-left p-2 rounded transition-colors flex items-center space-x-3 text-sm ${
                              currentModule === subItem.id
                                ? 'bg-blue-600 text-white'
                                : 'hover:bg-gray-700 text-gray-400'
                            }`}
                          >
                            <span className="text-base">{subItem.icon}</span>
                            <span>{subItem.label}</span>
                            {currentModule === subItem.id && (
                              <span className="ml-auto w-2 h-2 bg-white rounded-full"></span>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
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
              {currentModule === 'company-master' && '🔗 Remote Masters Module - Company'}
              {['employee-master', 'department-master'].includes(currentModule) && '⚠️ Not Implemented'}
              {!['dashboard', 'employee', 'company-master', 'employee-master', 'department-master'].includes(currentModule) && '⚠️ Not Implemented'}
            </div>
          </div>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar