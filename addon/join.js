import { normalizeArray } from './utils';

export default function(key1, key2) {
  return normalizeArray(key1, '', (key1, key2) => {
    return key1.join(key2);
  }, key2);
}
