import { resolveKeys } from './utils';

export default function(key1, key2) {
  return resolveKeys(key1, key2, (str, sep) => {
    if (!str) {
      return [];
    }
    return str.split(sep);
  });
}
