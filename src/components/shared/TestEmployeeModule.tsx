import React, { useState } from 'react'

const TestEmployeeModule: React.FC = () => {
  const [status, setStatus] = useState<string>('Ready to test')
  const [details, setDetails] = useState<string>('')

  const testModuleLoad = async () => {
    setStatus('🔄 Testing module load...')
    setDetails('Check browser console (F12) for detailed logs')
    
    try {
      console.log('🔍 Testing module load...')
      console.log('🌐 Attempting to load: employeeModule/EmployeeApp')
      console.log('📍 Remote URL: http://localhost:3001/assets/remoteEntry.js')
      
      // @ts-ignore - Federation module
      const module = await import('employeeModule/EmployeeApp')
      
      console.log('✅ Module loaded successfully:', module)
      setStatus('✅ SUCCESS: Module loaded!')
      setDetails('Module found and loaded successfully. Check console for details.')
      
    } catch (error) {
      console.error('❌ Module load failed:', error)
      setStatus('❌ FAILED: Module could not load')
      setDetails(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  return (
    <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Module Federation Test
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="text-gray-600">
            <strong>Remote URL:</strong> http://localhost:3001/assets/remoteEntry.js
          </div>
          <div className="text-gray-600">
            <strong>Module:</strong> employeeModule/EmployeeApp
          </div>
        </div>
        
        <div className="p-3 bg-white border rounded">
          <div className="font-medium text-gray-800">Status: {status}</div>
          {details && <div className="text-sm text-gray-600 mt-1">{details}</div>}
        </div>
        
        <button
          onClick={testModuleLoad}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
        >
          🔍 Test Module Federation Load
        </button>
        
        <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded border border-amber-200">
          <strong>Instructions:</strong>
          <br />1. Click the button above
          <br />2. Open browser console (Press <strong>F12</strong> → Console tab)
          <br />3. Check for detailed logs and error messages
        </div>
      </div>
    </div>
  )
}

export default TestEmployeeModule