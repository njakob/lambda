/* @flow */

import { resolve, strategies, loaders } from 'raclette';
import * as errors from 'lambda/errors';

export type RC = {
  ignore: Array<string>;
};

export default async function resolveRC(rcFileName: string): Promise<RC> {
  const { result: data, entries } = await resolve({
    name: rcFileName,
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
    throw errors.rcNotFound();
  }

  const { ignore = [] } = data;

  return {
    ignore,
  };
}
