/* @flow */

import glob from 'glob';
import type Runtime from './Runtime';

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

export default function searchFiles(runtime: Runtime, cwd: string): Promise<Array<string>> {
  return globFiles(runtime, cwd);
}
