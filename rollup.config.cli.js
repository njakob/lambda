/* eslint-disable import/no-extraneous-dependencies */

import * as fs from 'fs';
import builtinModules from 'builtin-modules';
import { parseParcel } from '@njakob/parcel';
import rollupNodeResolve from 'rollup-plugin-node-resolve';
import rollupBabel from 'rollup-plugin-babel';
import rollupJSON from 'rollup-plugin-json';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const parcel = parseParcel(pkg);
const external = parcel.dependencies
  .map(dependency => dependency.name.fullName)
  .concat(builtinModules)
  .concat(['lambda'])
  ;

export default {
  entry: 'src/lambda-cli/index.js',
  sourceMap: true,
  moduleName: 'lambda-cli',
  banner: '#!/usr/bin/env node',
  external,

  plugins: [
    rollupNodeResolve({
      jsnext: true,
    }),
    rollupJSON(),
    rollupBabel({
      babelrc: true,
    }),
  ],

  targets: [
    { dest: 'bin/lambda', format: 'cjs' },
  ],

  paths: {
    lambda: '../lib/lambda.js',
  }
};
