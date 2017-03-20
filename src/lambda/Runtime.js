/* @flow */

import resolveRC from './resolveRC';

export type RuntimeOptions = {
  rcFileName: string;
};

export default class Runtime {
  ignore: Array<string>;
  rcFileName: string;

  constructor({ rcFileName }: RuntimeOptions) {
    this.ignore = [];
    this.rcFileName = rcFileName;
  }

  async load(): Promise<void> {
    const { ignore } = await resolveRC(this.rcFileName);
    this.ignore = ignore;
  }
}
