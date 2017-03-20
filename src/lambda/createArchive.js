/* @flow */

import { join as pathJoin } from 'path';
import { createWriteStream } from 'fs';
import archiver from 'archiver';
import type Runtime from './Runtime';

type CreateArchiveResult = {
  writtenBytes: number;
};

export default function createArchive(runtime: Runtime, cwd: string): Promise<CreateArchiveResult> {
  return new Promise((resolve, reject) => {
    const stream = createWriteStream(pathJoin(cwd, 'lambda.zip'));
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    stream.on('close', () => {
      resolve({ writtenBytes: archive.pointer() });
    });

    archive.on('error', err => reject(err));
    archive.pipe(stream);
    archive.glob('**', { cwd, ignore: runtime.ignore });
    archive.finalize();
  });
}
