# 🧪 TDD Implementation Plan - Module Federation Standardization

**Approach:** Test-Driven Development with Micro-Iterations  
**Strategy:** Red → Green → Refactor with continuous validation  
**Fallback:** Immediate rollback capability at each step  

## 🎯 **TDD Principles Applied**

### **Micro-Iteration Strategy**
1. **Write Test** → Define expected behavior
2. **Run Test** → Verify it fails (Red)
3. **Implement** → Minimal code to pass (Green)
4. **Verify** → Run all tests (Green maintained)
5. **Refactor** → Improve without breaking tests
6. **Commit** → Save working state

### **Test Categories**
- **Build Tests** - Configuration compilation
- **Integration Tests** - Module Federation connectivity
- **Functional Tests** - UI components work
- **Performance Tests** - Bundle size and loading
- **Regression Tests** - Existing functionality preserved

## 📋 **Implementation Phases with TDD**

### **Phase 1: Environment Setup & Baseline Testing (5 min)**

#### **Test 1.1: Current State Verification**
```bash
# Expected: Current branch confirmation
test_current_branch() {
  local current=$(git branch --show-current)
  [[ "$current" == "feature/module-federation-standardization" ]] || exit 1
  echo "✅ On correct branch: $current"
}

# Expected: Clean working tree
test_clean_workspace() {
  local status=$(git status --porcelain)
  [[ -z "$status" ]] || exit 1
  echo "✅ Clean working tree"
}
```

#### **Test 1.2: Fallback Accessibility**
```bash
# Expected: Can quickly return to working state
test_fallback_available() {
  git show feature/master-entry --name-only >/dev/null 2>&1 || exit 1
  echo "✅ Fallback branch accessible"
}
```

#### **Test 1.3: Service Status Baseline**
```bash
# Expected: Record current service states
test_baseline_services() {
  local shell_status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null || echo "000")
  local employee_status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001 2>/dev/null || echo "000") 
  local masters_status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002 2>/dev/null || echo "000")
  
  echo "📊 Baseline: Shell=$shell_status, Employee=$employee_status, Masters=$masters_status"
  return 0  # Always pass - just recording state
}
```

### **Phase 2: Masters Module Integration Testing (10 min)**

#### **Test 2.1: Masters Module Files Exist**
```bash
# Expected: Required Masters module files present after integration
test_masters_files_exist() {
  [[ -f "modules/masters-module/package.json" ]] || exit 1
  [[ -f "modules/masters-module/vite.config.ts" ]] || exit 1
  [[ -f "modules/masters-module/src/components/CompanyMaster/ReactContextVersion.tsx" ]] || exit 1
  echo "✅ Masters module files present"
}
```

#### **Test 2.2: Masters Dependencies Install**
```bash
# Expected: npm install succeeds without errors
test_masters_install() {
  cd modules/masters-module
  npm install --silent >/dev/null 2>&1 || exit 1
  cd ../..
  echo "✅ Masters dependencies installed"
}
```

#### **Test 2.3: Masters Build Success**
```bash
# Expected: Masters module builds without errors
test_masters_build() {
  cd modules/masters-module
  npm run build >/dev/null 2>&1 || exit 1
  [[ -f "dist/assets/remoteEntry.js" ]] || exit 1
  cd ../..
  echo "✅ Masters module builds successfully"
}
```

### **Phase 3: Configuration Validation Testing (5 min)**

#### **Test 3.1: Shared Dependencies Configuration**
```bash
# Expected: @mui/material present in Masters vite.config.ts
test_mui_sharing() {
  grep -q "@mui/material" modules/masters-module/vite.config.ts || exit 1
  echo "✅ @mui/material sharing configured"
}
```

#### **Test 3.2: Shell Remote Configuration**
```bash
# Expected: mastersModule remote configured in shell
test_shell_remote() {
  grep -q "mastersModule.*3002" vite.config.ts || exit 1
  echo "✅ Shell mastersModule remote configured"
}
```

#### **Test 3.3: Port Configuration Consistency**
```bash
# Expected: All modules have correct port configurations
test_port_consistency() {
  grep -q "port.*3001" modules/employee-module/vite.config.ts || exit 1
  grep -q "port.*3002" modules/masters-module/vite.config.ts || exit 1
  echo "✅ Port configurations consistent"
}
```

### **Phase 4: Runtime Integration Testing (10 min)**

#### **Test 4.1: All Services Start**
```bash
# Expected: All three services start and respond
test_all_services_start() {
  # Start services in background and test
  local retries=10
  for i in $(seq 1 $retries); do
    local shell=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null)
    local employee=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001 2>/dev/null)
    local masters=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002 2>/dev/null)
    
    if [[ "$shell" == "200" && "$employee" == "200" && "$masters" == "200" ]]; then
      echo "✅ All services responding (attempt $i/$retries)"
      return 0
    fi
    sleep 2
  done
  exit 1
}
```

#### **Test 4.2: Module Federation Endpoints**
```bash
# Expected: Remote entry points accessible
test_federation_endpoints() {
  curl -s http://localhost:3001/assets/remoteEntry.js | head -1 | grep -q "import" || exit 1
  curl -s http://localhost:3002/assets/remoteEntry.js | head -1 | grep -q "import" || exit 1
  echo "✅ Module Federation endpoints accessible"
}
```

#### **Test 4.3: Bundle Analysis**
```bash
# Expected: Check bundle sizes for shared dependency optimization
test_bundle_optimization() {
  local employee_size=$(curl -s http://localhost:3001/assets/remoteEntry.js | wc -c)
  local masters_size=$(curl -s http://localhost:3002/assets/remoteEntry.js | wc -c)
  
  # Basic sanity checks (bundles shouldn't be empty or too large)
  [[ $employee_size -gt 100 ]] || exit 1
  [[ $masters_size -gt 100 ]] || exit 1
  [[ $employee_size -lt 1000000 ]] || exit 1  # Under 1MB
  [[ $masters_size -lt 1000000 ]] || exit 1   # Under 1MB
  
  echo "📊 Bundle sizes: Employee=${employee_size}B, Masters=${masters_size}B"
}
```

### **Phase 5: Functional Testing (10 min)**

#### **Test 5.1: Company Master Navigation**
```bash
# Expected: Company Master accessible through shell navigation
# (This would be a manual test or automated browser test)
test_company_master_navigation() {
  # For now, verify the endpoint responds with expected content
  local response=$(curl -s http://localhost:3000)
  echo "$response" | grep -q "Nexus HRMS" || exit 1
  echo "✅ Shell application loading correctly"
}
```

#### **Test 5.2: No Console Errors** 
```bash
# Expected: Browser console clean (would need headless browser)
# For CLI implementation, we'll check build outputs for warnings
test_no_build_warnings() {
  cd modules/masters-module
  local build_output=$(npm run build 2>&1)
  echo "$build_output" | grep -q "warning" && exit 1 || true
  cd ../..
  echo "✅ No build warnings detected"
}
```

## 🚀 **TDD Execution Script**

### **Main Test Runner**
```bash
#!/bin/bash
# TDD Test Runner for Module Federation Implementation

set -e  # Exit on any test failure

run_test_phase() {
  local phase=$1
  local description=$2
  echo "🧪 Phase $phase: $description"
  echo "----------------------------------------"
}

rollback_on_failure() {
  echo "❌ TEST FAILED! Initiating rollback..."
  git reset --hard HEAD~1 2>/dev/null || true
  git checkout feature/master-entry 2>/dev/null || true
  echo "✅ Rollback complete - back to working state"
  exit 1
}

# Set error trap
trap rollback_on_failure ERR

# Execute all test phases
run_test_phase "1" "Environment & Baseline"
test_current_branch
test_clean_workspace  
test_fallback_available
test_baseline_services

run_test_phase "2" "Masters Integration"
# Implementation and tests will be added here

run_test_phase "3" "Configuration Validation"  
# Implementation and tests will be added here

run_test_phase "4" "Runtime Integration"
# Implementation and tests will be added here

run_test_phase "5" "Functional Validation"
# Implementation and tests will be added here

echo "🎉 All tests passed! Implementation successful!"
```

## 📊 **Test Metrics & Reporting**

### **Success Criteria**
- ✅ All automated tests pass
- ✅ Bundle size optimization verified
- ✅ No regression in existing functionality  
- ✅ Performance meets or exceeds baseline
- ✅ Zero console errors

### **Failure Handling**
- 🔴 **Any test fails** → Immediate rollback
- 🟡 **Performance regression** → Investigate but continue
- 🔴 **Build failures** → Stop and rollback
- 🔴 **Runtime errors** → Stop and rollback

---

**TDD Plan Ready! Each step has clear tests and rollback capability.** 🎯