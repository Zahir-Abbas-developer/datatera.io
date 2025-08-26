import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'react-router': 'react-router',        // ✅ correct
      'react-router-dom': 'react-router-dom' // ✅ correct
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
  },
});
