import { resolveKeys } from './utils';

export default function(key) {
  return resolveKeys(key, val => {
    if (!val) {
      return val;
    }

    return val.toUpperCase();
  });
}
