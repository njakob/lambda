/* @flow */

import Runtime from 'lambda/Runtime';
import type CLIRuntime from './CLIRuntime';

export default async function createRuntime(cliRuntime: CLIRuntime): Promise<Runtime> {
  const runtime = new Runtime({
    rcFileName: cliRuntime.rcFileName,
    ignorePatterns: cliRuntime.ignorePatterns,
    overrideIgnorePatterns: cliRuntime.ignorePatterns !== undefined,
  });
  await runtime.load();
  return runtime;
}
