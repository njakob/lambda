/* @flow */

import resolveRC from './resolveRC';

export default class Runtime {
  ignore: [];

  async load(): Promise<void> {
    const { ignore } = await resolveRC();
    this.ignore = ignore;
  }
}
