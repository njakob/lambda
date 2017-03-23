/* @flow */

import Terminus from '@njakob/terminus';
import resolveRC from 'lambda/resolveRC';

export type CLIRuntimeOptions = {
  rc: ?string;
  ignore: ?Array<string>;
  archive: ?string;
  verbose: number;
};

export default class CLIRuntime {
  rcFileName: string;
  ignorePatterns: ?Array<string>;
  archiveFilePath: ?string;
  verbose: number;
  term: Terminus;

  constructor() {
    this.term = new Terminus();
    this.verbose = 0;
    this.rcFileName = '.lambdarc';
  }

  async resolve({
    archive,
    ignore,
    rc,
  }): Promise<CLIRuntime> {
    if (rc) {
      this.rcFileName = rc;
    }

    const rcData = await resolveRC(this.rcFileName);

    this.archiveFilePath = archive || rcData.archive || 'lambda.zip';
    this.ignorePatterns = ignore || rcData.ignore || [];
  }
}
