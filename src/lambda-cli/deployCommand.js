/* @flow */

import prettyBytes from 'pretty-bytes';
import * as streamBuffers from 'stream-buffers';
import * as lambda from 'lambda';
import type CLIRuntime, { ResolveOptions } from './CLIRuntime';

export default async function deployCommand(options: ResolveOptions, cliRuntime: CLIRuntime): Promise<void> {
  await cliRuntime.resolve(options);

  const reporter = cliRuntime.reporter;
  const config = cliRuntime.config;

  const profile = cliRuntime.profile;
  const region = cliRuntime.region;
  const cwd = process.cwd();

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
  const globPatterns = config.globPatterns;

  if (!functionName) {
    throw lambda.errors.functionNameRequired();
  }

  reporter.info(reporter.parse`Use AWS profile ${profile}`, 1);

  const activity = reporter.activity(reporter.parse`Bootstrap deployement`);

  activity.tick(reporter.parse`Generate archive`);
  const stream = new streamBuffers.WritableStreamBuffer();
  const { writtenBytes } = await lambda.pipeArchive({ cwd, stream, globPatterns });

  activity.tick(reporter.parse`Deploy archive to AWS`);
  const buffer = stream.getContents();
  await lambda.deployArchive({
    buffer,
    profile,
    region,
    functionName,
  });

  activity.complete();
  reporter.info(reporter.parse`${prettyBytes(writtenBytes)} written`, 1);
  reporter.success(reporter.parse`Lambda ${functionName} deployed`);
}
