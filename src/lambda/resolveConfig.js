/* @flow */

import * as rc from 'raclette';
import type { Config } from './types';
import * as errors from './errors';

export default async function resolveConfig(fileName: string): Promise<Config> {
  const { result: data, entries } = await rc.resolve({
    name: fileName,
    strategies: [
      rc.strategies.cwd,
    ],
    loaders: [
      rc.loaders.json,
    ],
  });

  if (entries.length !== 1) {
    throw errors.assertionFailed();
  }

  if (entries[0].result === null) {
    throw errors.configNotFound();
  }

  return {
    globPatterns: data.include || [],
    functionName: data.name
  };
}
