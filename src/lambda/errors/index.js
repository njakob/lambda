/* @flow */

import { createError, convert } from 'bugsy';
import * as codes from './codes';

export { convert };

export const assertionFailed = createError(codes.ASSERTION_FAILED, 'Assertion failed');
export const rcNotFound = createError(codes.RC_NOT_FOUND, 'Unable to find Lambda RC file');
