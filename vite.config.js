import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // gzip compression for static assets
    compression({ algorithm: 'gzip', threshold: 1024, ext: '.gz' }),
  ],
  build: {
    rollupOptions: {
      plugins: [
        ...(mode === 'analyze' ? [visualizer({ open: true, filename: 'dist/stats.html', gzipSize: true, brotliSize: true })] : []),
      ],
      output: {
        manualChunks: {
          recharts: ['recharts'],
          lottie: ['lottie-react'],
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}));
