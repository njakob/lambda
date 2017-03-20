/* @flow */

import glob from 'glob';
import Runtime from 'lambda/Runtime';
import type CLIRuntime from './CLIRuntime';

function globFiles(runtime: Runtime, cwd: string): Promise<Array<string>> {
  return new Promise((resolve, reject) => {
    glob('**', { cwd, ignore: runtime.ignore }, (err: ?Error, files: Array<string>) => {
      if (err) {
        return reject(err);
      }
      return resolve(files);
    });
  });
}

export default async function showCommand(cliRuntime: CLIRuntime): Promise<void> {
  const runtime = new Runtime(cliRuntime);
  await runtime.load();
  const files = await globFiles(runtime, process.cwd());

  const term = cliRuntime.term;

  files.forEach((file) => {
    term.log`${file}`;
  });

  term.log`${term.dim(`${files.length} files found`)}`;
}
