/* @flow */

import yargs from 'yargs';
import { Bugsy } from 'bugsy';
import { version } from 'package.json';
import type { CLIRuntimeOptions } from './CLIRuntime';
import CLIRuntime from './CLIRuntime';
import showCommand from './showCommand';
import versionCommand from './versionCommand';

type Command = (runtime: CLIRuntime) => Promise<void>;

function yargsHandler(command: Command) {
  return (options: CLIRuntimeOptions) => {
    const runtime = new CLIRuntime(options);

    command(runtime).catch((err: Error | Bugsy) => {
      if (err instanceof Bugsy && err.code !== undefined) {
        runtime.term.log`${runtime.term.bold.red('Error')}: ${err.message}`;
      } else {
        runtime.term.log`${runtime.term.bold.red('Unexpected Error')}: ${err.stack}`;
      }
    });
  };
}

yargs
  .usage('Usage: $0 <command> [options]')
  .example('$0 status')
  .help('h')
  .alias('h', 'help')
  .alias('v', 'version')
  .version(version)
  .demandCommand(1)
  .command({
    command: 'show',
    desc: 'Show list of files that would be packed',
    handler: yargsHandler(showCommand),
    builder: (y: any): any => y
      .option('rc ', { alias: 'r' }),
  })
  .command({
    command: 'version',
    desc: 'Show current version',
    handler: yargsHandler(versionCommand),
  })
  .argv;
