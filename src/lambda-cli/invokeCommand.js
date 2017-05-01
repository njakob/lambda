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
  const invocationType = cliRuntime.invocationType;

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
    reporter.info(reporter.parse`Payload is about ${prettyBytes(payload.length)}`, 2);
  }

  const activity = reporter.activity();

  switch (invocationType) {
    case 'RequestResponse':
      activity.tick(reporter.parse`Invoke lambda ${functionName}`);
      break;
    case 'DryRun':
      activity.tick(reporter.parse`Test invocation of lambda ${functionName}`);
      break;
    case 'Event':
      activity.tick(reporter.parse`Dispatch event to lambda ${functionName}`);
      break;
    default:
      throw lambda.errors.assertionFailed();
  }

  const {
    statusCode,
  } = await lambda.invoke({
    functionName,
    invocationType,
    payload,
    profile,
    region,
  });

  activity.complete();

  switch (invocationType) {
    case 'RequestResponse':
      reporter.success(reporter.parse`Lambda executed with status code ${statusCode}`, 0);
      break;
    case 'DryRun':
      if (statusCode === 204) {
        reporter.success(reporter.parse`Invocation tested`);
      } else {
        reporter.error(reporter.parse`Invocation failed`);
      }
      break;
    case 'Event':
      if (statusCode === 202) {
        reporter.success(reporter.parse`Event dispatched`);
      } else {
        reporter.error(reporter.parse`Invocation failed`);
      }
      break;
    default:
      throw lambda.errors.assertionFailed();
  }
}
