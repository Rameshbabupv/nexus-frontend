import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import TabNavigation from './TabNavigation'
import Footer from './Footer'
import Dashboard from '../../pages/Dashboard/Dashboard'
import EmployeeModuleWrapper from '../shared/EmployeeModuleWrapper'

const Layout: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<string>('dashboard')

  const renderContent = () => {
    switch (currentModule) {
      case 'dashboard':
        return <Dashboard />
      case 'employee':
        return <EmployeeModuleWrapper />
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