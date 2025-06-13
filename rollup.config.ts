import { RollupOptions } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import pkg from './package.json';

const rollupConfig: RollupOptions = {
  input: 'src/index.ts',
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
    ...Object.keys(pkg.optionalDependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  output: {
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'react-redux': 'ReactRedux',
    },
    preserveModules: true,
    exports: 'named',
    compact: false,
  },
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: true,
      declaration: true,
      declarationDir: 'dist/types',
      emitDeclarationOnly: false,
      rootDir: 'src',
    }),
  ],
};

export default rollupConfig;
