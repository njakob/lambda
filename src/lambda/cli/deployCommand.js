/* @flow */

import prettyBytes from 'pretty-bytes';
import { WritableStreamBuffer } from 'stream-buffers';
import pipeArchive from 'lambda/pipeArchive';
import deployArchive from 'lambda/deployArchive';
import type CLIRuntime from './CLIRuntime';

export default async function deployCommand(cliRuntime: CLIRuntime): Promise<void> {
  const term = cliRuntime.term;
  const cwd = process.cwd();

  term.log`${term.dim(`Use AWS profile ${cliRuntime.profile}`)}`;

  const stream = new WritableStreamBuffer();
  const { writtenBytes } = await pipeArchive({ cwd, stream, globPatterns: cliRuntime.config.globPatterns });
  term.log`${term.dim(`${prettyBytes(writtenBytes)} written`)}`;

  const buffer = stream.getContents();
  await deployArchive({
    buffer,
    profile: cliRuntime.profile,
    region: cliRuntime.region,
    functionName: cliRuntime.config.functionName,
  });
  term.log`Lambda ${cliRuntime.config.functionName} deployed ${term.green('✓')}`;
}
