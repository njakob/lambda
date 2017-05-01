/* @flow */

import aws from 'aws-sdk';

export type InvokeOptions = {
  invocationType: string;
  functionName: string;
  payload?: ?(string | Buffer | Object);
  profile: string;
  region: string;
};

export type Invocation = {
  statusCode: number;
  functionError: string;
  logResult: string;
  payload: any;
};

export default async function invoke({
  invocationType,
  functionName,
  payload,
  profile,
  region,
}: InvokeOptions): Promise<Invocation> {
  const credentials = new aws.SharedIniFileCredentials({ profile });
  const config = new aws.Config({ credentials, region });
  const client = new aws.Lambda({ config });

  const result = await client.invoke({
    FunctionName: functionName,
    InvocationType: invocationType,
    Payload: payload,
    Qualifier: '$LATEST',
    LogType: 'Tail',
  }).promise();

  return {
    statusCode: result.StatusCode,
    functionError: result.functionError,
    logResult: result.LogResult,
    payload: result.Payload,
  };
}
