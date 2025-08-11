# Nexus HRMS - Micro-Frontend Architecture

## 🚀 Architecture Overview

This project demonstrates a **true micro-frontend architecture** using **Webpack Module Federation** with Vite. The application consists of:

### Shell Application (Port 3000)
- **Layout & Navigation**: Sidebar, Header, Footer, Tab Navigation
- **Module Orchestration**: Dynamic loading of micro-frontend modules
- **Error Boundaries**: Fault isolation to prevent module crashes from affecting shell
- **Routing**: Inter-module navigation and state management

### Employee Module (Port 3001)
- **Independent React App**: Separate codebase and deployment
- **Module Federation Remote**: Exposes components to shell application
- **Standalone Development**: Can be developed and tested independently
- **Hot Reload**: Changes don't require shell restart

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Setup

1. **Install Shell Dependencies**:
```bash
npm install
```

2. **Install Employee Module Dependencies**:
```bash
cd modules/employee-module
npm install
cd ../..
```

## 🏃‍♂️ Module Management & Operations

### 🚀 Start All Modules (Recommended)

**Terminal 1 - Shell Application**:
```bash
# Option 1: Using script
./start-all.sh

# Option 2: Manual
npm run dev
```

**Terminal 2 - Employee Module**:
```bash
# Option 1: Using script  
./start-employee.sh

# Option 2: Manual
cd modules/employee-module
npm run build && npm run preview
```

### 🔄 Individual Module Control

**Start Shell Only**:
```bash
npm run dev  # Port 3000
```

**Start Employee Only**:
```bash
cd modules/employee-module
npm run build && npm run preview  # Port 3001
```

**Stop Individual Module**:
- Press `Ctrl + C` in respective terminal

### 🛑 Stop All Modules

**Quick Stop (Recommended)**:
```bash
./stop-all.sh
```

**Manual Stop**:
```bash
# Kill processes on both ports
kill -9 $(lsof -ti:3000,3001)
```

### 📊 System Status

**Check What's Running**:
```bash
./status.sh
```

### Option 2: View Applications

- **Shell Application**: http://localhost:3000
  - Click on "Employees" in sidebar to load the micro-frontend
  - Dashboard is built-in to the shell
  
- **Employee Module (Standalone)**: http://localhost:3001
  - View the module independently
  - Perfect for isolated development

## ✅ Testing Micro-Frontend Features

### 1. Independent Module Development
- Start only the Employee module: `./start-employee.sh`
- Make changes to `modules/employee-module/src/EmployeeApp.tsx`
- See hot reload without affecting anything else

### 2. Shell Resilience
- Start both applications
- Stop the Employee module
- Shell continues working, shows error boundary
- Restart Employee module - it loads dynamically

### 3. Fault Isolation
- Employee module errors don't crash the shell
- Error boundaries show user-friendly messages
- Shell remains functional even if modules fail

## 🏗️ Architecture Details

### Module Federation Configuration

**Shell (Host) - `vite.config.ts`**:
```typescript
federation({
  name: 'shell',
  remotes: {
    employeeModule: 'http://localhost:3001/assets/remoteEntry.js',
  },
  shared: ['react', 'react-dom'],
})
```

**Employee Module (Remote) - `modules/employee-module/vite.config.ts`**:
```typescript
federation({
  name: 'employeeModule',
  filename: 'remoteEntry.js',
  exposes: {
    './EmployeeApp': './src/EmployeeApp.tsx',
  },
  shared: ['react', 'react-dom'],
})
```

### Error Handling
- **ErrorBoundary**: Catches React errors in modules
- **ModuleLoader**: Handles module loading failures
- **Fallback UI**: Shows user-friendly error messages
- **Retry Logic**: Allows users to retry failed module loads

## 📁 Project Structure

```
nexus-frontend/
├── src/                           # Shell Application
│   ├── components/
│   │   ├── layout/               # Shell layout components
│   │   └── shared/               # Error boundaries, module loader
│   └── pages/                    # Built-in pages (Dashboard)
├── modules/
│   └── employee-module/          # Independent Employee Module
│       ├── src/
│       │   ├── EmployeeApp.tsx   # Main module component
│       │   └── main.tsx          # Standalone entry point
│       ├── package.json          # Independent dependencies
│       └── vite.config.ts        # Module Federation Remote config
└── docs/                         # Documentation
```

## 🔧 Development Scripts

### Shell Application
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run typecheck    # TypeScript checking
npm run lint         # ESLint checking
```

### Employee Module
```bash
cd modules/employee-module
npm run dev          # Start on port 3001
npm run build        # Build for production
```

## 🌟 Features Demonstrated

### ✅ True Micro-Frontend Capabilities
- **Independent Deployment**: Modules can be deployed separately
- **Technology Diversity**: Modules can use different tech stacks
- **Team Autonomy**: Teams can work on modules independently
- **Scalability**: Add new modules without affecting existing ones

### ✅ Developer Experience
- **Hot Reload**: Module changes don't require shell restart
- **Error Isolation**: Module errors don't crash the entire application
- **Standalone Development**: Modules can be developed in isolation
- **Shared Dependencies**: Optimized bundle sizes with shared libraries

### ✅ Production Ready
- **Error Boundaries**: Graceful handling of module failures
- **Loading States**: User feedback during module loading
- **Fallback UI**: Alternative content when modules are unavailable
- **Performance**: Lazy loading and code splitting

## 🚀 Next Steps

1. **Add More Modules**: Attendance, Leave, Payroll modules
2. **State Management**: Inter-module communication
3. **Authentication**: Shared authentication across modules
4. **Routing**: Advanced routing between modules
5. **Testing**: E2E testing across micro-frontends
6. **CI/CD**: Independent deployment pipelines

## 📋 Current Status

- ✅ Shell application with Module Federation Host
- ✅ Employee module with Module Federation Remote  
- ✅ Dynamic module loading with error handling
- ✅ Independent development and deployment
- ✅ "Hello World from Employee module" integration
- ✅ Fault isolation and error boundaries

**Result**: Fully functional micro-frontend architecture ready for development!