/* @flow */

import createArchive from 'lambda/createArchive';
import type CLIRuntime from './CLIRuntime';
import createRuntime from './createRuntime';

export default async function packCommand(cliRuntime: CLIRuntime): Promise<void> {
  const runtime = await createRuntime(cliRuntime);
  const { writtenBytes } = await createArchive({
    archiveFilePath: runtime.archiveFilePath,
    cwd: process.cwd(),
    ignoreFilePatterns: runtime.ignoreFilePatterns,
  });

  const term = cliRuntime.term;

  term.log`${term.dim(`${writtenBytes} bytes written`)}`;
  term.log`Archive ${runtime.archiveFilePath} created ${term.green('✓')}`;
}
