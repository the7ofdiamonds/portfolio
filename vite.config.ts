import { defineConfig } from 'vite';

import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

import path from 'path';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [
    dts({ insertTypesEntry: true, outDir: 'dist/types' }),
    cssInjectedByJsPlugin()
  ],
  build: {
    emptyOutDir: true,
    cssCodeSplit: true,
    sourcemap: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Portfolio',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
    },
    rollupOptions: {
      external: [
        '@reduxjs/toolkit',
        '@the7ofdiamonds/types',
        '@the7ofdiamonds/ui-ux',
        '@the7ofdiamonds/communications',
        '@the7ofdiamonds/gateway',
        'firebase',
        'react',
        'react-dom',
        'react-router-dom',
        'react-redux',
      ],
    },
    minify: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
