/* @flow */

import Terminus from '@njakob/terminus';

export type CLIRuntimeOptions = {
  rc: string;
  ignore: Array<string>;
  verbose: number;
};

export default class CLIRuntime {
  rcFileName: string;
  ignorePatterns: ?Array<string>;
  verbose: number;
  term: Terminus;

  constructor({ verbose = 0, ignore, rc = '.lambdarc' }: CLIRuntimeOptions) {
    this.rcFileName = rc;
    this.ignorePatterns = ignore;
    this.verbose = verbose;
    this.term = new Terminus();
  }
}
