/* @flow */

import { ConsoleReporter } from '@njakob/cli-utils';
import type { Config } from 'lambda/types';
import resolveConfig from 'lambda/resolveConfig';
import * as errors from 'lambda/errors';

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
    this.verbose = 0;
    this.reporter = new ConsoleReporter({ verbose: this.verbose });
  }

  async resolve({ config, verbose }: ResolveOptions): Promise<void> {
    const resolvedProfile = process.env.AWS_PROFILE;
    const resolvedRegion = process.env.AWS_REGION;

    if (!resolvedProfile) {
      throw errors.assertionFailed();
    }
    if (!resolvedRegion) {
      throw errors.assertionFailed();
    }

    this.profile = resolvedProfile;
    this.region = resolvedRegion;
    this.verbose = verbose === undefined ? this.verbose : verbose;
    this.reporter.setVerbose(this.verbose);

    if (config) {
      this.config = await resolveConfig(config);
    }
  }
}
