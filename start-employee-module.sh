#!/bin/bash

echo "🚀 Starting Employee Module (Port 3001)..."
echo "Building module with Module Federation support..."
echo ""

cd modules/employee-module

# Build the module first to generate federation files
echo "📦 Building employee module..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful! Starting preview server..."
    echo "Navigate to: http://localhost:3001 to see the standalone module"
    echo "Or use it within the shell at: http://localhost:3000"
    echo ""
    
    # Start preview server to serve built federation files
    npm run preview
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi