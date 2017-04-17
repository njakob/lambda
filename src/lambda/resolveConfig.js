/* @flow */

import { resolve, strategies, loaders } from 'raclette';
import type { Config } from 'lambda/types';
import * as errors from 'lambda/errors';

export default async function resolveConfig(fileName: string): Promise<Config> {
  const { result: data, entries } = await resolve({
    name: fileName,
    strategies: [
      strategies.cwd,
    ],
    loaders: [
      loaders.json,
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
