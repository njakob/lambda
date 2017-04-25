/* @flow */

import * as cliUtils from '@njakob/cli-utils';
import type { Config } from 'lambda';
import * as lambda from 'lambda';

export type ResolveOptions = {
  config: string;
  verbose: number;
};

export default class CLIRuntime {
  reporter: cliUtils.ConsoleReporter;
  config: ?Config;
  profile: ?string;
  region: ?string;
  verbose: number;

  constructor() {
    this.verbose = 1;
    this.reporter = new cliUtils.ConsoleReporter({ verbose: this.verbose });
  }

  async resolve({
    config,
    verbose,
  }: ResolveOptions): Promise<void> {
    this.verbose = verbose === undefined ? this.verbose : verbose;
    this.reporter.setVerbose(this.verbose);

    this.profile = process.env.AWS_PROFILE;
    this.region = process.env.AWS_REGION;

    if (config) {
      this.config = await lambda.resolveConfig(config);
    }
  }
}
