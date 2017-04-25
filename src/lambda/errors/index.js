/* @flow */

import * as bugsy from 'bugsy';
import * as codes from './codes';

export const assertionFailed = bugsy.createError(codes.ASSERTION_FAILED, 'Assertion failed');
export const configNotFound = bugsy.createError(codes.CONFIG_NOT_FOUND, 'Unable to find Lambda config file');
