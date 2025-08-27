import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'employeeModule',
      filename: 'remoteEntry.js',
      exposes: {
        './EmployeeApp': './src/EmployeeApp.tsx',
      },
      shared: {
        react: {
          singleton: true,
          strictVersion: true,
          requiredVersion: '18.3.1',
          eager: true
        },
        'react-dom': {
          singleton: true,
          strictVersion: true,
          requiredVersion: '18.3.1',
          eager: true
        },
        '@mui/material': {
          singleton: true,
          requiredVersion: '^5.18.0'
        },
        '@mui/icons-material': {
          singleton: true,
          requiredVersion: '^5.18.0'
        }
      },
    }),
  ],
  server: {
    port: 3001,
    cors: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
  preview: {
    port: 3001,
    cors: true,
  },
})