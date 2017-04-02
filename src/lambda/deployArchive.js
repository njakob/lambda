/* @flow */

import aws from 'aws-sdk';

export type DeployArchiveOptions = {
  profile: string;
  region: string;
  functionName: string;
  buffer: Buffer;
};

export default function deployArchive({
  profile,
  region,
  functionName,
  buffer,
}: DeployArchiveOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    const credentials = new aws.SharedIniFileCredentials({ profile });
    const config = new aws.Config({ credentials, region });
    const client = new aws.Lambda({ config });
    client.updateFunctionCode({
      FunctionName: functionName,
      Publish: true,
      ZipFile: buffer,
    }, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}
