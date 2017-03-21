/* @flow */

import resolveRC from './resolveRC';

export type RuntimeOptions = {
  archiveFilePath: ?string;
  ignorePatterns: ?Array<string>;
  rcFileName: string;
  overrideIgnorePatterns: ?boolean;
  overrideFileArchivePath: ?boolean;
};

export default class Runtime {
  archiveFilePath: string;
  ignoreFilePatterns: Array<string>;
  rcFileName: string;
  overrideIgnorePatterns: boolean;
  overrideFileArchivePath: boolean;

  constructor({
    rcFileName,
    archiveFilePath = 'lambda.zip',
    ignorePatterns = [],
    overrideIgnorePatterns = true,
    overrideFileArchivePath = true,
  }: RuntimeOptions) {
    this.archiveFilePath = archiveFilePath;
    this.ignoreFilePatterns = ignorePatterns;
    this.rcFileName = rcFileName;
    this.overrideIgnorePatterns = overrideIgnorePatterns;
    this.overrideFileArchivePath = overrideFileArchivePath;
  }

  async load(): Promise<void> {
    const {
      ignore,
      archive,
    } = await resolveRC(this.rcFileName);
    if (!this.overrideIgnorePatterns) {
      this.ignoreFilePatterns = ignore;
    }
    if (!this.overrideFileArchivePath) {
      this.archiveFilePath = archive;
    }
  }
}
