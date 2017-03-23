/* @flow */

import 'source-map-support/register';
import yargs from 'yargs';
import { Bugsy } from 'bugsy';
import { version } from 'package.json';
import type { CLIRuntimeOptions } from './CLIRuntime';
import CLIRuntime from './CLIRuntime';
import showCommand from './showCommand';
import packCommand from './packCommand';
import deployCommand from './deployCommand';
import versionCommand from './versionCommand';

type Command = (runtime: CLIRuntime) => Promise<void>;

function yargsHandler(command: Command) {
  return (options: CLIRuntimeOptions) => {
    const cliRuntime = new CLIRuntime();
    const term = cliRuntime.term;
    cliRuntime.resolve(options).then(() => command(cliRuntime)).catch((err: Error | Bugsy) => {
      if (err instanceof Bugsy && err.code !== undefined) {
        term.log`${term.bold.red('Error')}: ${err.message}`;
      } else {
        term.log`${term.bold.red('Unexpected Error')}: ${err.stack}`;
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
      .option('ignore', { alias: 'i', array: true })
      .option('rc ', { alias: 'r' })
      ,
  })
  .command({
    command: 'pack',
    desc: 'Create an archive',
    handler: yargsHandler(packCommand),
    builder: (y: any): any => y
      .option('ignore', { alias: 'i', array: true })
      .option('archive', { alias: 'a' })
      .option('rc', { alias: 'r' })
      ,
  })
  .command({
    command: 'deploy',
    desc: 'Deploy an archive to an AWS Lambda',
    handler: yargsHandler(deployCommand),
    builder: (y: any): any => y
      .option('function-name', { alias: 'n' })
      .option('archive', { alias: 'a' })
      .option('rc', { alias: 'r' })
      ,
  })
  .command({
    command: 'version',
    desc: 'Show current version',
    handler: yargsHandler(versionCommand),
  })
  .argv;
