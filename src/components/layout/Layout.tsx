import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import TabNavigation from './TabNavigation'
import Footer from './Footer'
import Dashboard from '../../pages/Dashboard/Dashboard'
import EmployeeModuleWrapper from '../shared/EmployeeModuleWrapper'
import MastersModuleWrapper from '../shared/MastersModuleWrapper'

const Layout: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<string>('dashboard')

  const renderContent = () => {
    switch (currentModule) {
      case 'dashboard':
        return <Dashboard />
      case 'employee':
        return <EmployeeModuleWrapper />
      case 'company-master':
        return <MastersModuleWrapper />
      case 'employee-master':
      case 'department-master':
        return (
          <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
              <h3 className="text-lg font-semibold text-yellow-800">
                Module Coming Soon
              </h3>
            </div>
            <p className="text-yellow-700">
              The {currentModule.replace('-', ' ')} module is under development and will be available soon.
            </p>
          </div>
        )
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="h-screen flex">
      <Sidebar currentModule={currentModule} onModuleChange={setCurrentModule} />
      <div className="flex-1 flex flex-col">
        <Header />
        <TabNavigation />
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout