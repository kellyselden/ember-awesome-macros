import { resolveKeys } from './utils';

export default function(key1, key2) {
  return resolveKeys(key1, key2, (val1, val2) => {
    return val1 < val2;
  });
}
