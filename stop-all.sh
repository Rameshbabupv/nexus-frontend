#!/bin/bash

echo "🛑 Stopping Nexus HRMS Micro-Frontend System"
echo "============================================"

# Find processes using ports 3000 and 3001
SHELL_PID=$(lsof -ti:3000)
EMPLOYEE_PID=$(lsof -ti:3001)

if [ -n "$SHELL_PID" ]; then
    echo "🔄 Stopping Shell application (Port 3000, PID: $SHELL_PID)..."
    kill -9 $SHELL_PID
    echo "✅ Shell application stopped"
else
    echo "ℹ️  No process found on port 3000"
fi

if [ -n "$EMPLOYEE_PID" ]; then
    echo "🔄 Stopping Employee module (Port 3001, PID: $EMPLOYEE_PID)..."
    kill -9 $EMPLOYEE_PID
    echo "✅ Employee module stopped"
else
    echo "ℹ️  No process found on port 3001"
fi

echo ""
echo "🎯 All modules stopped successfully!"
echo "You can now restart them using ./start-all.sh and ./start-employee.sh"