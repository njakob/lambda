/* @flow */

import prettyBytes from 'pretty-bytes';
import * as lambda from 'lambda';
import type CLIRuntime, { ResolveOptions } from './CLIRuntime';

export default async function invokeCommand(options: ResolveOptions, cliRuntime: CLIRuntime): Promise<void> {
  await cliRuntime.resolve(options);

  const reporter = cliRuntime.reporter;
  const config = cliRuntime.config;

  const profile = cliRuntime.profile;
  const region = cliRuntime.region;
  const payload = cliRuntime.payload;

  if (!config) {
    throw lambda.errors.assertionFailed();
  }
  if (!profile) {
    throw lambda.errors.assertionFailed();
  }
  if (!region) {
    throw lambda.errors.assertionFailed();
  }

  const functionName = config.functionName;

  if (!functionName) {
    throw lambda.errors.functionNameRequired();
  }

  reporter.info(reporter.parse`Use AWS profile ${profile}`, 1);

  if (payload) {
    reporter.info(reporter.parse`Invoke function ${functionName} with ${prettyBytes(payload.length)} payload`);
  } else {
    reporter.info(reporter.parse`Invoke function ${functionName}`);
  }

  const activity = reporter.activity(reporter.parse`Invoke Lambda`);

  const {
    statusCode,
  } = await lambda.invoke({
    profile,
    region,
    functionName,
    payload,
  });

  activity.complete();

  reporter.info(reporter.parse`Lambda returned with ${statusCode}`);
}
