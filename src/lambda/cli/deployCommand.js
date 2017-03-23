/* @flow */

import { readFile } from 'fs';
import { resolve as resolvePath } from 'path';
import deployArchive from 'lambda/deployArchive';
import type CLIRuntime from './CLIRuntime';

async function loadArchive(archiveFilePath: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    readFile(archiveFilePath, (err: ?Error, data?: Buffer) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

export default async function deployCommand(cliRuntime: CLIRuntime): Promise<void> {
  const term = cliRuntime.term;
  const cwd = process.cwd();
  const resolvedPath = resolvePath(cwd, cliRuntime.archiveFilePath);
  const functionName = cliRuntime.functionName;
  const archiveBuffer = await loadArchive(resolvedPath);
  await deployArchive({ functionName, archiveBuffer });

  term.log`Lambda ${functionName} deployed ${term.green('✓')}`;
}
