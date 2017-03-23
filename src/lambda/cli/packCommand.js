/* @flow */

import createArchive from 'lambda/createArchive';
import type CLIRuntime from './CLIRuntime';

export default async function packCommand(cliRuntime: CLIRuntime): Promise<void> {
  const term = cliRuntime.term;
  const { writtenBytes } = await createArchive({
    archiveFilePath: cliRuntime.archiveFilePath,
    cwd: process.cwd(),
    ignoreFilePatterns: cliRuntime.ignoreFilePatterns,
  });


  term.log`${term.dim(`${writtenBytes} bytes written`)}`;
  term.log`Archive ${cliRuntime.archiveFilePath} created ${term.green('✓')}`;
}
