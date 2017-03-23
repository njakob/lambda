/* @flow */

import { resolve as resolvePath } from 'path';
import { createWriteStream } from 'fs';
import archiver from 'archiver';

type CreateArchiveOptions = {
  archiveFilePath: string;
  cwd: string;
  ignoreFilePatterns: Array<string>;
};

type CreateArchiveResult = {
  writtenBytes: number;
};

export default function createArchive({
  archiveFilePath,
  cwd,
  ignoreFilePatterns,
}: CreateArchiveOptions): Promise<CreateArchiveResult> {
  return new Promise((resolve, reject) => {
    const stream = createWriteStream(resolvePath(cwd, archiveFilePath));
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    stream.on('close', () => {
      resolve({ writtenBytes: archive.pointer() });
    });

    archive.on('error', err => reject(err));
    archive.pipe(stream);
    archive.glob('**', { cwd, ignore: ignoreFilePatterns });
    archive.finalize();
  });
}
