import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'mastersModule',
      filename: 'remoteEntry.js',
      exposes: {
        './CompanyMaster': './src/components/CompanyMaster/ReactContextVersion.tsx',
        './CompanyMasterSimple': './src/components/CompanyMaster/SimpleWrapper.tsx',
        './CompanyMasterFull': './src/components/CompanyMaster/index.tsx',
        './MastersApp': './src/main.tsx'
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
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/services': path.resolve(__dirname, './src/services'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/store': path.resolve(__dirname, './src/store')
    }
  },
  server: {
    port: 3002,
    cors: true
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      external: ['react', 'react-dom']
    }
  }
})