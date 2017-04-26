/* @flow */

import * as bugsy from 'bugsy';

export const ASSERTION_FAILED = 'assertion-failed';

export const CONFIG_NOT_FOUND = 'config-not-found';

export const assertionFailed = bugsy.createError(ASSERTION_FAILED, 'Assertion failed');
export const configNotFound = bugsy.createError(CONFIG_NOT_FOUND, 'Unable to find Lambda config file');
