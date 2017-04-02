/* @flow */

import type { Writable } from 'stream';
import archiver from 'archiver';

type PipeArchiveOptions = {
  cwd: string;
  stream: Writable;
  globPatterns: Array<string>;
};

type PipeArchiveResult = {
  writtenBytes: number;
};

export default function pipArchive({
  cwd,
  stream,
  globPatterns,
}: PipeArchiveOptions): Promise<PipeArchiveResult> {
  return new Promise((resolve, reject) => {
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    archive.on('end', () => {
      resolve({ writtenBytes: archive.pointer() });
    });

    archive.on('error', err => reject(err));

    archive.pipe(stream);
    globPatterns.forEach(pattern => archive.glob(pattern, { cwd }));
    archive.finalize();
  });
}
