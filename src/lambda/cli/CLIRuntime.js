/* @flow */

import Terminus from '@njakob/terminus';
import resolveRC from 'lambda/resolveRC';

export type CLIRuntimeOptions = {
  rc: ?string;
  ignore: ?Array<string>;
  profile: ?string;
  archive: ?string;
  functionName: ?string;
  verbose: number;
};

export default class CLIRuntime {
  rcFileName: string;
  ignorePatterns: ?Array<string>;
  profile: ?string;
  archiveFilePath: ?string;
  functionName: ?string;
  verbose: number;
  term: Terminus;

  constructor() {
    this.term = new Terminus();
    this.verbose = 0;
    this.rcFileName = '.lambdarc';
  }

  async resolve({
    archive,
    functionName,
    profile,
    ignore,
    rc,
  }): Promise<CLIRuntime> {
    if (rc) {
      this.rcFileName = rc;
    }

    const rcData = await resolveRC(this.rcFileName);

    this.profile = process.env.AWS_PROFILE || profile;
    this.archiveFilePath = archive || rcData.archive || 'lambda.zip';
    this.functionName = functionName || rcData.functionName;
    this.ignorePatterns = ignore || rcData.ignore || [];
  }
}
