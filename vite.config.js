import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // ✅ Just point to package root instead of non-existent dist/index.js
      'react-router': 'react-router',
      'react-router-dom': 'react-router-dom',
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: [/^node:.*/], // Prevent Node.js built-in modules from being bundled
    },
  },
  optimizeDeps: {
    include: ['react-router-dom'], // Pre-bundle react-router-dom
  },
});
