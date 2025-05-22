import { defineConfig } from 'vite';

import dts from 'vite-plugin-dts';

import path from 'path';

import rollupOptions from './rollup.config';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [dts({ insertTypesEntry: true, outDir: 'dist/types' })],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'GitHubPortfolio',
      formats: ['es', 'cjs'],
      fileName: (format, name) => `${name}.${format === 'es' ? 'js' : format}`,
    },
    rollupOptions: rollupOptions,
    watch: {},
    minify: false,
  },
});
