/* @flow */

import { resolve, strategies, loaders } from 'raclette';
import * as errors from 'lambda/errors';

export type RC = {
  archive: ?Array<string>;
  ignore: ?string;
  functionName: ?string;
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

  const {
    archive,
    ignore,
    'function-name': functionName,
  } = data;

  return {
    archive,
    ignore,
    functionName,
  };
}
