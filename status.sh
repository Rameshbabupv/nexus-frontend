#!/bin/bash

echo "📊 Nexus HRMS System Status"
echo "=========================="

# Check Shell Application (Port 3000)
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    SHELL_PID=$(lsof -ti:3000)
    echo "✅ Shell Application: RUNNING (Port 3000, PID: $SHELL_PID)"
    echo "   URL: http://localhost:3000"
else
    echo "❌ Shell Application: STOPPED (Port 3000)"
fi

# Check Employee Module (Port 3001)  
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null ; then
    EMPLOYEE_PID=$(lsof -ti:3001)
    echo "✅ Employee Module: RUNNING (Port 3001, PID: $EMPLOYEE_PID)"
    echo "   URL: http://localhost:3001"
else
    echo "❌ Employee Module: STOPPED (Port 3001)"
fi

# Check Module Federation
echo ""
echo "🔗 Module Federation Status:"
if curl -s http://localhost:3001/assets/remoteEntry.js >/dev/null 2>&1; then
    echo "✅ Federation Endpoint: ACCESSIBLE"
    echo "   URL: http://localhost:3001/assets/remoteEntry.js"
else
    echo "❌ Federation Endpoint: NOT ACCESSIBLE"
fi

echo ""
echo "📋 Quick Commands:"
echo "   Start All: ./start-all.sh + ./start-employee.sh"
echo "   Stop All:  ./stop-all.sh" 
echo "   Status:    ./status.sh"