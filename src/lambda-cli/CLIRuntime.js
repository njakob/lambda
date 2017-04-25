/* @flow */

import { ConsoleReporter } from '@njakob/cli-utils';
import type { Config } from 'lambda';
import * as lambda from 'lambda';

export type ResolveOptions = {
  config: string;
  verbose: number;
};

export default class CLIRuntime {
  reporter: ConsoleReporter;
  config: ?Config;
  profile: string;
  region: string;
  verbose: number;

  constructor() {
    this.verbose = 1;
    this.reporter = new ConsoleReporter({ verbose: this.verbose });
  }

  async resolve({ config, verbose }: ResolveOptions): Promise<void> {
    const resolvedProfile = process.env.AWS_PROFILE;
    const resolvedRegion = process.env.AWS_REGION;

    if (!resolvedProfile) {
      throw lambda.errors.assertionFailed();
    }
    if (!resolvedRegion) {
      throw lambda.errors.assertionFailed();
    }

    this.profile = resolvedProfile;
    this.region = resolvedRegion;
    this.verbose = verbose === undefined ? this.verbose : verbose;
    this.reporter.setVerbose(this.verbose);

    if (config) {
      this.config = await lambda.resolveConfig(config);
    }
  }
}
