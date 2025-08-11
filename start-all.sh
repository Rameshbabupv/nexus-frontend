#!/bin/bash

echo "🚀 Starting Nexus HRMS Micro-Frontend System"
echo "============================================"

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $1 is already in use"
        return 1
    else
        return 0
    fi
}

# Check ports
if ! check_port 3000; then
    echo "❌ Shell application port (3000) is busy"
    exit 1
fi

if ! check_port 3001; then
    echo "❌ Employee module port (3001) is busy"  
    exit 1
fi

echo "✅ Ports 3000 and 3001 are available"
echo ""

echo "📋 Instructions:"
echo "1. This will start the Shell application on port 3000"
echo "2. Open a second terminal and run: ./start-employee.sh"
echo "3. Visit: http://localhost:3000"
echo "4. Click 'Employee' in sidebar to test micro-frontend"
echo ""

echo "🔄 Starting Shell Application..."
npm run dev