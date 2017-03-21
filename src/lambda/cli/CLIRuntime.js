/* @flow */

import Terminus from '@njakob/terminus';

export type CLIRuntimeOptions = {
  rc: ?string;
  ignore: ?Array<string>;
  archive: ?string;
  verbose: number;
};

export default class CLIRuntime {
  rcFileName: string;
  ignorePatterns: ?Array<string>;
  archiveFileName: ?string;
  verbose: number;
  term: Terminus;

  constructor({
    archive,
    ignore,
    verbose = 0,
    rc = '.lambdarc',
  }: CLIRuntimeOptions) {
    this.rcFileName = rc;
    this.archiveFileName = archive;
    this.ignorePatterns = ignore;
    this.verbose = verbose;
    this.term = new Terminus();
  }
}
