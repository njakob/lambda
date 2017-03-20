/* @flow */

import Terminus from '@njakob/terminus';

export type CLIRuntimeOptions = {
  rc: string;
  verbose: number;
};

export default class CLIRuntime {
  rcFileName: string;
  term: Terminus;
  verbose: number;

  constructor({ verbose = 0, rc = '.lambdarc' }: CLIRuntimeOptions) {
    this.rcFileName = rc;
    this.verbose = verbose;
    this.term = new Terminus();
  }
}
