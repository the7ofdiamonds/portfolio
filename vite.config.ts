import { defineConfig } from 'vite';

import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

import path from 'path';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [
    dts({ insertTypesEntry: true, outDir: 'dist/types' }),
  ],
  build: {
    cssCodeSplit: true,
    sourcemap: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Portfolio',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
    },
    minify: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
