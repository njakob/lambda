/* @flow */

import { createError } from 'bugsy';
import * as codes from './codes';

export const assertionFailed = createError(codes.ASSERTION_FAILED, 'Assertion failed');
export const configNotFound = createError(codes.CONFIG_NOT_FOUND, 'Unable to find Lambda config file');
