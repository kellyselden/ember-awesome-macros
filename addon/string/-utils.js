import { resolveKeys, safelyCreateComputed } from '../-utils';

export function normalizeString(key, func) {
  return resolveKeys([key], val => {
    if (!val) {
      return val;
    }

    return func(val);
  });
}

export { safelyCreateComputed as normalizeString2 };
