/* @flow */

import prettyBytes from 'pretty-bytes';
import { WritableStreamBuffer } from 'stream-buffers';
import * as errors from 'lambda/errors';
import pipeArchive from 'lambda/pipeArchive';
import deployArchive from 'lambda/deployArchive';
import type CLIRuntime from './CLIRuntime';

export default async function deployCommand(cliRuntime: CLIRuntime): Promise<void> {
  const reporter = cliRuntime.reporter;
  const config = cliRuntime.config;
  const cwd = process.cwd();

  if (!config) {
    throw errors.assertionFailed();
  }

  reporter.info(reporter.parse`Use AWS profile ${cliRuntime.profile}`, 1);

  const activity = reporter.activity(reporter.parse`Bootstrap deployement`);

  activity.tick(reporter.parse`Generate archive`);
  const stream = new WritableStreamBuffer();
  const { writtenBytes } = await pipeArchive({ cwd, stream, globPatterns: config.globPatterns });

  activity.tick(reporter.parse`Deploy archive to AWS`);
  const buffer = stream.getContents();
  await deployArchive({
    buffer,
    profile: cliRuntime.profile,
    region: cliRuntime.region,
    functionName: config.functionName,
  });

  activity.complete();
  reporter.info(reporter.parse`${prettyBytes(writtenBytes)} written`, 1);
  reporter.success(reporter.parse`Lambda ${config.functionName} deployed`);
}
