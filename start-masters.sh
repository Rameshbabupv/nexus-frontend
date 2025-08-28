#!/bin/bash

echo "🚀 Starting Masters Module (Port 3002)..."
echo "Building module with Module Federation support..."
echo ""

cd modules/masters-module

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the module first to generate federation files
echo "📦 Building masters module..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful! Starting preview server..."
    echo "Navigate to: http://localhost:3002 to see the standalone module"
    echo "Or use it within the shell at: http://localhost:3000"
    echo ""
    
    # Start preview server to serve built federation files
    npm run preview -- --port 3002
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi