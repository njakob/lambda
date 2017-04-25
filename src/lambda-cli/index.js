/* @flow */

import * as sourceMapSupport from 'source-map-support';
import dotenv from 'dotenv';
import yargs from 'yargs';
import * as bugsy from 'bugsy';
import type { ResolveOptions } from './CLIRuntime';
import CLIRuntime from './CLIRuntime';
import deployCommand from './deployCommand';
import versionCommand from './versionCommand';

type Command = (options: ResolveOptions, runtime: CLIRuntime) => Promise<void>;

function yargsHandler(command: Command) {
  return (options: ResolveOptions) => {
    const cliRuntime = new CLIRuntime();
    const reporter = cliRuntime.reporter;

    command(options, cliRuntime).catch((err: Error | bugsy.Bugsy) => {
      if (err instanceof bugsy.Bugsy && err.code !== undefined) {
        reporter.error(reporter.parse`${reporter.styles.bold.red`Error`}: ${err.message}`);
      } else {
        reporter.error(reporter.parse`${reporter.styles.bold.red`Unexpected Error`}: ${err.stack}`);
      }
    });
  };
}

sourceMapSupport.install();
dotenv.config();

// eslint-disable-next-line no-unused-expressions
yargs
  .usage('Usage: $0 <command> [options]')
  .example('$0 status')
  .help('h')
  .alias('h', 'help')
  .alias('v', 'verbose')
  .count('verbose')
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
