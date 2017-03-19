/* @flow */

import Terminus from '@njakob/terminus';

export type CLIRuntimeOptions = {
  verbose: number;
};

export default class CLIRuntime {
  term: Terminus;
  verbose: number;

  constructor({ verbose }: CLIRuntimeOptions) {
    this.verbose = verbose;
    this.term = new Terminus();
  }
}
