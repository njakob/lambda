/* @flow */

import glob from 'glob';
import type CLIRuntime from './CLIRuntime';

function globFiles(cliRuntime: CLIRuntime, cwd: string): Promise<Array<string>> {
  return new Promise((resolve, reject) => {
    glob('**', { cwd, ignore: cliRuntime.ignoreFilePatterns }, (err: ?Error, files: Array<string>) => {
      if (err) {
        return reject(err);
      }
      return resolve(files);
    });
  });
}

export default async function showCommand(cliRuntime: CLIRuntime): Promise<void> {
  const term = cliRuntime.term;
  const files = await globFiles(cliRuntime, process.cwd());

  files.forEach((file) => {
    term.log`${file}`;
  });

  term.log`${term.dim(`${files.length} files found`)}`;
}
