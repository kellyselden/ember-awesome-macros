import { resolveKeys, safelyCreateComputed } from '../-utils';

export function normalizeString(func) {
  return resolveKeys(val => {
    if (!val) {
      return val;
    }

    return func(val);
  });
}

export { safelyCreateComputed as normalizeString2 };
