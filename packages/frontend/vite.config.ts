import react from '@vitejs/plugin-react';
import rollupReplace from '@rollup/plugin-replace';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: '../backend/public',
  plugins: [
    rollupReplace({
      preventAssignment: true,
      values: {
        __DEV__: JSON.stringify(true),
        'process.env.NODE_ENV': JSON.stringify('development'),
      },
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    react(),
  ],
  build: {
    outDir: '../backend/public',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-router-dom', 'react-dom'],
        },
      },
    },
  },
});
