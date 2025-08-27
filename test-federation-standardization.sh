#!/bin/bash
# TDD Tests for Module Federation Standardization
# Tests BEFORE and AFTER each change to ensure no regressions

echo "🧪 Module Federation Standardization Tests"
echo "==========================================="

# Test 1: Verify all modules are running
echo ""
echo "📋 Test 1: Module Availability"
echo "Shell (3000): $(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 || echo "FAIL")"
echo "Employee (3001): $(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001 || echo "FAIL")"  
echo "Masters (3002): $(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002 || echo "FAIL")"

# Test 2: Verify remote entries are accessible
echo ""
echo "📋 Test 2: Remote Entry Files"
EMPLOYEE_REMOTE=$(curl -s http://localhost:3001/assets/remoteEntry.js | head -1)
MASTERS_REMOTE=$(curl -s http://localhost:3002/assets/remoteEntry.js | head -1)

if [[ $EMPLOYEE_REMOTE == *"import"* ]]; then
    echo "✅ Employee remoteEntry.js accessible"
else
    echo "❌ Employee remoteEntry.js FAIL"
fi

if [[ $MASTERS_REMOTE == *"import"* ]]; then
    echo "✅ Masters remoteEntry.js accessible"
else
    echo "❌ Masters remoteEntry.js FAIL"  
fi

# Test 3: Check for Material-UI sharing in build outputs
echo ""
echo "📋 Test 3: Material-UI Federation Sharing"

# Check if Masters module has Material-UI federation (should have)
if curl -s http://localhost:3002/assets/remoteEntry.js | grep -q "__federation_shared"; then
    echo "✅ Masters has federation sharing configured"
else
    echo "❌ Masters federation sharing FAIL"
fi

# Test 4: Version consistency checks (will add specific version checks)
echo ""
echo "📋 Test 4: Version Consistency (To be implemented)"
echo "⚠️  Will check React versions match across all modules"

# Test 5: Build artifact validation
echo ""
echo "📋 Test 5: Build Artifacts" 
echo "Employee dist exists: $([ -d "modules/employee-module/dist" ] && echo "✅" || echo "❌")"
echo "Masters dist exists: $([ -d "modules/masters-module/dist" ] && echo "✅" || echo "❌")"

echo ""
echo "🎯 Test Summary Complete"
echo "==========================================="