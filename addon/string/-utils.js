import curriedComputed from 'ember-macro-helpers/curried-computed';
import { safelyCreateComputed } from '../-utils';

export function normalizeString(func) {
  return curriedComputed(val => {
    if (!val) {
      return val;
    }

    return func(val);
  });
}

export { safelyCreateComputed as normalizeString2 };
