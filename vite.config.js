import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: [/^node:.*/],
    },
  },
  optimizeDeps: {
    include: ['react-router-dom'],
    force: true, // Force pre-bundling to avoid dynamic import issues
  },
  esbuild: {
    target: 'esnext', // Ensure modern ES module compatibility
  },
});