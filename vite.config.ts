import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'tanstack-vendor': ['@tanstack/react-query', '@tanstack/react-table'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'date-vendor': ['date-fns', 'react-day-picker'],
          'ui-vendor': ['@radix-ui/react-label', '@radix-ui/react-select', '@radix-ui/react-popover', '@radix-ui/react-dropdown-menu', '@radix-ui/react-slot'],
        },
      },
    },
  },
})

