/* @flow */

import aws from 'aws-sdk';

export type DeployArchiveOptions = {
  functionName: string;
  archiveBuffer: Buffer;
};

export default function deployArchive({
  functionName,
  archiveBuffer,
}: DeployArchiveOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    const client = new aws.Lambda();
    client.updateFunctionCode({
      FunctionName: functionName,
      Publish: true,
      ZipFile: archiveBuffer,
    }, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}
