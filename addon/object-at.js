import { normalizeArray } from './utils';

export default function(key1, key2) {
  return normalizeArray(key1, undefined, (key1, key2) => {
    return key1.objectAt(key2);
  }, key2);
}
