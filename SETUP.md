# Nexus HRMS - Quick Setup Guide ⚡

Get the entire system running in **5 minutes**.

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone git@github.com:Rameshbabupv/nexus-frontend.git
cd nexus-frontend
npm install
cd modules/employee-module && npm install
cd ../masters-module && npm install && cd ../..
```

### 2. Start Everything
```bash
./start-all.sh
```

### 3. Open Application
- **Main App**: http://localhost:3000
- **Employee Module**: Click "Employee" 
- **Masters Module**: Click "Administration → Company Master"

## ✅ Success Check
- All 3 ports running (3000, 3001, 3002)
- No console errors
- Company Master form loads

## 🛑 Troubleshooting

**Ports in use?**
```bash
./stop-all.sh
./start-all.sh  
```

**Module errors?**
```bash
npm run clean
./start-all.sh
```

### 🐧 WSL (Windows Subsystem for Linux) Setup

**Issue**: UNC paths not supported error when running `./start-all.sh`

**Solution**:
1. **Use WSL Terminal** (not Windows CMD):
```bash
# Navigate to proper Linux path
cd /home/[username]/nexus/nexus-frontend
```

2. **Install Node.js in WSL**:
```bash
# Update package list
sudo apt update

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

3. **Install dependencies and run**:
```bash
npm install
chmod +x ./start-all.sh
./start-all.sh
```

**Important**: Always run commands from WSL terminal, not Windows CMD or PowerShell when accessing WSL filesystem.

## 🧪 **QA Testing Setup**

**FOR QA TESTERS**: Always use the `develop` branch for testing:

```bash
# Switch to QA-ready branch
git checkout develop
git pull origin develop

# Install dependencies
npm install
cd modules/employee-module && npm install
cd ../masters-module && npm install && cd ../..

# Start system
./start-all.sh
# In second terminal: ./start-employee.sh

# Test at: http://localhost:3000
```

**QA Test Areas**:
- ✅ Shell Navigation (port 3000)
- ✅ Employee Module (click "Employee" in sidebar)  
- ✅ Masters Module (Administration → Company Master)
- ✅ Module Federation integration
- ✅ Loading states and error handling

**Need detailed docs?** Open `obsidian-vault/` in Obsidian for full documentation.

---
**Setup Time**: ~5 minutes | **Need Help?** Check project channels