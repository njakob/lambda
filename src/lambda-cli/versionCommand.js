/* @flow */

import * as parcel from '@njakob/parcel';
import pkg from 'package.json';
import type CLIRuntime, { ResolveOptions } from './CLIRuntime';

export default async function versionCommand(options: ResolveOptions, cliRuntime: CLIRuntime): Promise<void> {
  await cliRuntime.resolve(options);

  const reporter = cliRuntime.reporter;

  const {
    name,
    version,
    author,
    homepage,
  } = parcel.parseParcel(pkg);

  reporter.log(reporter.parse`${reporter.styles.white`${name && name.name}`} ${reporter.styles.dim`${version}`}`);
  reporter.log(reporter.parse`Built with ${reporter.styles.red`❤`} by ${author && author.name}`);
  reporter.log(reporter.parse`${reporter.styles.cyan`${homepage}`}`);
}
