/* @flow */

import { parseParcel } from '@njakob/parcel';
import pkg from 'package.json';
import type CLIRuntime from './CLIRuntime';

export default async function versionCommand(cliRuntime: CLIRuntime): Promise<void> {
  const {
    name,
    version,
    author,
    homepage,
  } = parseParcel(pkg);

  const term = cliRuntime.term;
  term.log`${term.white(name && name.name)} ${term.dim(version)}`;
  term.log`Built with ${term.red('❤')} by ${author && author.name}`;
  term.log`${term.blue(homepage)}`;
}
