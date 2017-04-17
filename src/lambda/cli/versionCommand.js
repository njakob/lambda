/* @flow */

import { parseParcel } from '@njakob/parcel';
import pkg from 'package.json';
import type CLIRuntime from './CLIRuntime';

export default async function versionCommand(cliRuntime: CLIRuntime): Promise<void> {
  const reporter = cliRuntime.reporter;

  const {
    name,
    version,
    author,
    homepage,
  } = parseParcel(pkg);

  reporter.log(reporter.parse`${reporter.styles.white`${name && name.name}`} ${reporter.styles.dim`${version}`}`);
  reporter.log(reporter.parse`Built with ${reporter.styles.red`❤`} by ${author && author.name}`);
  reporter.log(reporter.parse`${reporter.styles.blue`${homepage}`}`);
}
