/* @flow */

import yargs from 'yargs';
import { version } from 'package.json';
import type { CLIRuntimeOptions } from './CLIRuntime';
import CLIRuntime from './CLIRuntime';
import versionCommand from './versionCommand';

type Command = (runtime: CLIRuntime) => Promise<void>;

function yargsHandler(command: Command) {
  return (options: CLIRuntimeOptions) => {
    const runtime = new CLIRuntime(options);

    command(runtime).catch((err: Error) => {
      runtime.term.log`${runtime.term.bold.red('Error')}: ${err.message}`;
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
    command: 'version',
    desc: 'Show current version',
    handler: yargsHandler(versionCommand),
  })
  .argv;
