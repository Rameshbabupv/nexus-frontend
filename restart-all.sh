#!/bin/bash

echo "🔄 Restarting Nexus HRMS Micro-Frontend System"
echo "=============================================="

# Function to kill processes on specific ports
kill_port() {
    local port=$1
    local pids=$(lsof -ti :$port)
    if [ ! -z "$pids" ]; then
        echo "🛑 Killing processes on port $port..."
        echo "$pids" | xargs kill -9
        sleep 2
        echo "✅ Port $port cleared"
    else
        echo "ℹ️  Port $port is already free"
    fi
}

# Kill all relevant processes
echo "🧹 Cleaning up existing processes..."
kill_port 3000  # Shell
kill_port 3001  # Employee
kill_port 3002  # Masters

# Additional cleanup for any remaining node processes
echo "🧹 Cleaning up any remaining development servers..."
pkill -f "vite.*dev" 2>/dev/null || true
pkill -f "vite.*preview" 2>/dev/null || true
pkill -f "npm.*dev" 2>/dev/null || true
pkill -f "npm.*preview" 2>/dev/null || true

sleep 3

echo "✅ All processes cleared!"
echo ""

# Install dependencies for all modules
echo "📦 Installing dependencies..."
echo "🔧 Installing root dependencies..."
npm install

echo "🔧 Installing Employee module dependencies..."
cd modules/employee-module && npm install && cd ../..

echo "🔧 Installing Masters module dependencies..."
cd modules/masters-module && npm install && cd ../..

echo "✅ All dependencies installed!"
echo ""

# Start all modules
echo "🚀 Starting all modules..."
echo "📋 This will start all three modules automatically:"
echo "   • Shell Application (Port 3000)"
echo "   • Employee Module (Port 3001)"
echo "   • Masters Module (Port 3002)"
echo ""

# Start micro-frontends FIRST (they need to be ready before Shell)
echo "🔄 Starting Employee Module (building and starting)..."
(cd modules/employee-module && npm run build && npm run preview) &
EMPLOYEE_PID=$!

echo "🔄 Starting Masters Module (building and starting)..."
(cd modules/masters-module && npm run build && npm run preview -- --port 3002) &
MASTERS_PID=$!

# Wait for micro-frontends to fully start
echo "⏳ Waiting for micro-frontends to fully initialize..."
sleep 15

# Start Shell application LAST (so remotes are ready)
echo "🔄 Starting Shell Application..."
npm run dev &
SHELL_PID=$!
sleep 5

# Final status check
echo ""
echo "🎯 Startup Status Check:"
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null; then
    echo "✅ Shell Application: http://localhost:3000/"
else
    echo "❌ Shell Application: Failed to start"
fi

if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null; then
    echo "✅ Employee Module: http://localhost:3001/"
else
    echo "❌ Employee Module: Failed to start"
fi

if lsof -Pi :3002 -sTCP:LISTEN -t >/dev/null; then
    echo "✅ Masters Module: http://localhost:3002/"
else
    echo "❌ Masters Module: Failed to start"
fi

echo ""
echo "🎉 System Ready! Visit: http://localhost:3000"
echo "📋 QA Test Areas:"
echo "   • Navigation and Shell functionality"
echo "   • Employee Module (click 'Employee' in sidebar)"
echo "   • Masters Module (Administration → Company Master)"
echo ""
echo "🛑 To stop all services, run: ./stop-all.sh"

# Keep script running to show process status
echo "💡 Press Ctrl+C to stop monitoring (services will continue running)"
wait