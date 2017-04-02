/* @flow */

import 'source-map-support/register';
import dotenv from 'dotenv';
import yargs from 'yargs';
import { Bugsy } from 'bugsy';
import { version } from 'package.json';
import type { ResolveOptions } from './CLIRuntime';
import CLIRuntime from './CLIRuntime';
import deployCommand from './deployCommand';
import versionCommand from './versionCommand';

type Command = (runtime: CLIRuntime) => Promise<void>;

function yargsHandler(command: Command) {
  return (options: ResolveOptions) => {
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

dotenv.config();

yargs
  .usage('Usage: $0 <command> [options]')
  .example('$0 status')
  .help('h')
  .alias('h', 'help')
  .alias('v', 'version')
  .version(version)
  .demandCommand(1)
  .command({
    command: 'deploy',
    desc: 'Deploy an AWS Lambda function',
    handler: yargsHandler(deployCommand),
    builder: (y: any): any => y
      .option('config', { requiresArg: true, alias: 'c' })
      ,
  })
  .command({
    command: 'version',
    desc: 'Show current version',
    handler: yargsHandler(versionCommand),
  })
  .argv;
