import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        employeeModule: 'http://localhost:3001/assets/remoteEntry.js',
        mastersModule: 'http://localhost:3002/assets/remoteEntry.js',
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
        }
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
})