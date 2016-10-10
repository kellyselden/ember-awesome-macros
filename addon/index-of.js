import { normalizeArray } from './utils';

export default function(key1, key2) {
  return normalizeArray(key1, -1, function(key1, key2) {
    return key1.indexOf(key2);
  }, key2);
}
