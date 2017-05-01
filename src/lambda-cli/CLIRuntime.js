/* @flow */

import * as cliUtils from '@njakob/cli-utils';
import type { Config } from 'lambda';
import * as lambda from 'lambda';

export type ResolveOptions = {
  config?: string;
  verbose?: number;
  'payload-json'?: string;
  'invocation-type'?: string;
};

function unmarshalInvocationType(value: ?string): string {
  switch (value) {
    case 'Event':
    case 'event':
      return 'Event';
    case 'DryRun':
    case 'dryRun':
    case 'dry-run':
      return 'DryRun';
    case 'RequestResponse':
    case 'requestResponse':
    case 'request-response':
    default:
      return 'RequestResponse';
  }
}

export default class CLIRuntime {
  config: ?Config;
  invocationType: string;
  payload: ?Buffer;
  profile: ?string;
  region: ?string;
  reporter: cliUtils.ConsoleReporter;
  verbose: number;

  constructor() {
    this.verbose = 1;
    this.reporter = new cliUtils.ConsoleReporter({ verbose: this.verbose });
  }

  async resolve({
    config,
    verbose,
    'payload-json': payloadJSON,
    'invocation-type': invocationType,
  }: ResolveOptions): Promise<void> {
    this.verbose = verbose === undefined ? this.verbose : verbose;
    this.reporter.setVerbose(this.verbose);

    this.profile = process.env.AWS_PROFILE;
    this.region = process.env.AWS_REGION;

    this.invocationType = unmarshalInvocationType(invocationType);

    if (payloadJSON) {
      try {
        JSON.parse(payloadJSON);
        this.payload = new Buffer(payloadJSON, 'utf8');
      } catch (err) {
        throw lambda.errors.assertionFailed();
      }
    }

    if (config) {
      this.config = await lambda.resolveConfig(config);
    }
  }
}
