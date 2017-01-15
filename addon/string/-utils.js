import { resolveKeys, safelyCreateComputed } from '../-utils';

export function normalizeString(key, func) {
  return resolveKeys(val => {
    if (!val) {
      return val;
    }

    return func(val);
  })(key);
}

export { safelyCreateComputed as normalizeString2 };
