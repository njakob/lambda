/* @flow */

import Terminus from '@njakob/terminus';
import type { Config } from 'lambda/common';
import resolveConfig from 'lambda/resolveConfig';
import * as errors from 'lambda/errors';

export type ResolveOptions = {
  config: string;
  verbose: number;
};

export default class CLIRuntime {
  config: Config;
  profile: string;
  region: string;
  verbose: number;
  term: Terminus;

  constructor() {
    this.term = new Terminus();
    this.verbose = 0;
  }

  async resolve({ config }: ResolveOptions): Promise<void> {
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
    this.config = await resolveConfig(config);
  }
}
