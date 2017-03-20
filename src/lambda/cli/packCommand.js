/* @flow */

import Runtime from 'lambda/Runtime';
import createArchive from 'lambda/createArchive';
import type CLIRuntime from './CLIRuntime';

export default async function packCommand(cliRuntime: CLIRuntime): Promise<void> {
  const runtime = new Runtime(cliRuntime);
  await runtime.load();
  const { writtenBytes } = await createArchive(runtime, process.cwd());

  const term = cliRuntime.term;

  term.log`${term.dim(`${writtenBytes} bytes written`)}`;
}
