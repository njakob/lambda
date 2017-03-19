/* @flow */

import Runtime from 'lambda/Runtime';
import searchFiles from 'lambda/searchFiles';
import type CLIRuntime from './CLIRuntime';

export default async function showCommand(cliRuntime: CLIRuntime): Promise<void> {
  const runtime = new Runtime();
  await runtime.load();
  const files = await searchFiles(runtime, process.cwd());

  const term = cliRuntime.term;
  files.forEach((file) => {
    term.log`${file}`;
  });
  term.log`${term.dim(`${files.length} files found`)}`;
}
