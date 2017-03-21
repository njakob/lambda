/* @flow */

import { join as pathResolve } from 'path';
import { createWriteStream } from 'fs';
import archiver from 'archiver';
import type Runtime from './Runtime';

type CreateArchiveResult = {
  writtenBytes: number;
};

export default function createArchive(runtime: Runtime, cwd: string): Promise<CreateArchiveResult> {
  return new Promise((resolve, reject) => {
    const stream = createWriteStream(pathResolve(cwd, runtime.archiveFilePath));
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    stream.on('close', () => {
      resolve({ writtenBytes: archive.pointer() });
    });

    archive.on('error', err => reject(err));
    archive.pipe(stream);
    archive.glob('**', { cwd, ignore: runtime.ignoreFilePatterns });
    archive.finalize();
  });
}
