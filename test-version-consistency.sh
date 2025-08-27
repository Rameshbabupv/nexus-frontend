#!/bin/bash
# Advanced test to verify Module Federation version consistency

echo "🔍 Module Federation Version Consistency Test"
echo "=============================================="

# Function to extract shared config from vite.config.ts
check_shared_config() {
    local file=$1
    local module_name=$2
    
    echo ""
    echo "📋 $module_name Configuration:"
    
    # Check for React version
    if grep -q "requiredVersion.*18.3.1" "$file"; then
        echo "✅ React version: 18.3.1 (standardized)"
    else
        echo "❌ React version: Missing or non-standard"
    fi
    
    # Check for strictVersion
    if grep -q "strictVersion.*true" "$file"; then
        echo "✅ Strict version control: Enabled"
    else
        echo "❌ Strict version control: Disabled"
    fi
    
    # Check for eager loading
    if grep -q "eager.*true" "$file"; then
        echo "✅ Eager loading: Enabled"
    else
        echo "❌ Eager loading: Disabled"  
    fi
    
    # Check for Material-UI
    if grep -q "@mui/material" "$file"; then
        echo "✅ Material-UI: Configured"
    else
        echo "❌ Material-UI: Not configured"
    fi
}

# Test Shell configuration
check_shared_config "vite.config.ts" "Shell Application"

# Test Employee configuration  
check_shared_config "modules/employee-module/vite.config.ts" "Employee Module"

# Test Masters configuration
check_shared_config "modules/masters-module/vite.config.ts" "Masters Module"

echo ""
echo "🧪 Federation Sharing Test"
echo "=========================="

# Check if all modules can share dependencies properly
echo "Checking federation sharing in remote entries..."

SHELL_SHARED=$(curl -s http://localhost:3000 | grep -o "__federation_shared" | wc -l)
EMPLOYEE_SHARED=$(curl -s http://localhost:3001/assets/remoteEntry.js | grep -o "__federation_shared" | wc -l) 
MASTERS_SHARED=$(curl -s http://localhost:3002/assets/remoteEntry.js | grep -o "__federation_shared" | wc -l)

echo "Shell federation references: $SHELL_SHARED"
echo "Employee federation references: $EMPLOYEE_SHARED" 
echo "Masters federation references: $MASTERS_SHARED"

if [[ $EMPLOYEE_SHARED -gt 0 ]] && [[ $MASTERS_SHARED -gt 0 ]]; then
    echo "✅ All modules have federation sharing configured"
else
    echo "⚠️  Some modules may be missing federation sharing"
fi

echo ""
echo "🎯 Standardization Summary"
echo "=========================="
echo "All modules should now have:"
echo "- React 18.3.1 with strict version control"
echo "- Eager loading enabled"  
echo "- Material-UI shared dependencies"
echo "- Consistent federation configuration"