/* @flow */

import aws from 'aws-sdk';

export type DeployS3ArchiveOptions = {
  functionName: string;
  s3Bucket: string;
  s3Key: string;
  s3ObjectVersion: string;
};

export default function deployS3Archive({
  functionName,
  s3Bucket,
  s3Key,
  s3ObjectVersion,
}: DeployS3ArchiveOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    const client = new aws.Lambda();
    client.updateFunctionCode({
      FunctionName: functionName,
      Publish: true,
      S3Bucket: s3Bucket,
      S3Key: s3Key,
      S3ObjectVersion: s3ObjectVersion,
    }, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}
