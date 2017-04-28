/* @flow */

import * as lambda from 'lambda';
import type CLIRuntime, { ResolveOptions } from './CLIRuntime';

export default async function packCommand(options: ResolveOptions, cliRuntime: CLIRuntime): Promise<void> {
  await cliRuntime.resolve(options);

  const config = cliRuntime.config;

  const cwd = process.cwd();

  if (!config) {
    throw lambda.errors.assertionFailed();
  }

  const globPatterns = config.globPatterns;

  await lambda.pipeArchive({ cwd, stream: process.stdout, globPatterns });
}
