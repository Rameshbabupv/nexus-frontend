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

# Check all required ports
if ! check_port 3000; then
    echo "❌ Shell application port (3000) is busy"
    echo "💡 Run ./stop-all.sh or ./restart-all.sh to clean up"
    exit 1
fi

if ! check_port 3001; then
    echo "❌ Employee module port (3001) is busy"
    echo "💡 Run ./stop-all.sh or ./restart-all.sh to clean up"
    exit 1
fi

if ! check_port 3002; then
    echo "❌ Masters module port (3002) is busy"
    echo "💡 Run ./stop-all.sh or ./restart-all.sh to clean up"
    exit 1
fi

echo "✅ Ports 3000, 3001, and 3002 are available"
echo ""

# Install dependencies
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "🔧 Installing root dependencies..."
    npm install
fi

if [ ! -d "modules/employee-module/node_modules" ]; then
    echo "🔧 Installing Employee module dependencies..."
    cd modules/employee-module && npm install && cd ../..
fi

if [ ! -d "modules/masters-module/node_modules" ]; then
    echo "🔧 Installing Masters module dependencies..."
    cd modules/masters-module && npm install && cd ../..
fi

echo "✅ Dependencies ready!"
echo ""

echo "📋 Enhanced Instructions:"
echo "1. This will start the Shell application on port 3000"
echo "2. Open additional terminals and run:"
echo "   • ./start-employee.sh  (for Employee module on port 3001)"
echo "   • ./start-masters.sh   (for Masters module on port 3002)"
echo "3. OR use ./restart-all.sh to start everything automatically"
echo "4. Visit: http://localhost:3000"
echo "5. Test: Click 'Employee' or 'Administration → Company Master'"
echo ""
echo "⚠️  IMPORTANT: Employee and Masters modules must run in preview mode"
echo "   to serve Module Federation files correctly!"
echo ""

echo "🔄 Starting Shell Application..."
npm run dev