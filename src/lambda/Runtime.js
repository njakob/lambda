/* @flow */

import resolveRC from './resolveRC';

export type RuntimeOptions = {
  ignorePatterns: ?Array<string>;
  rcFileName: string;
  overrideIgnorePatterns: boolean;
};

export default class Runtime {
  ignoreFilePatterns: Array<string>;
  rcFileName: string;
  overrideIgnorePatterns: boolean;

  constructor({
    rcFileName,
    overrideIgnorePatterns,
    // $FlowFixMe
    ignorePatterns = [],
  }: RuntimeOptions) {
    // $FlowFixMe
    this.ignoreFilePatterns = ignorePatterns;
    this.rcFileName = rcFileName;
    this.overrideIgnorePatterns = overrideIgnorePatterns;
  }

  async load(): Promise<void> {
    const { ignore } = await resolveRC(this.rcFileName);
    if (!this.overrideIgnorePatterns) {
      this.ignoreFilePatterns = ignore;
    }
  }
}
