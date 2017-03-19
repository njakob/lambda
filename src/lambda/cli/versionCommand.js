/* @flow */

import { parseParcel } from '@njakob/parcel';
import pkg from 'package.json';
import type CLIRuntime from './CLIRuntime';

export default async function versionCommand(runtime: CLIRuntime): Promise<void> {
  const {
    name,
    version,
    author,
    homepage,
  } = parseParcel(pkg);

  runtime.term.log`${runtime.term.white(name && name.name)} ${runtime.term.dim(version)}`;
  runtime.term.log`Built with ${runtime.term.red('❤')} by ${author && author.name}`;
  runtime.term.log`${runtime.term.blue(homepage)}`;
}
