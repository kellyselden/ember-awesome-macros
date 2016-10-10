import { normalizeArray } from './utils';

export default function(key1, key2) {
  return normalizeArray(key1, false, function(key1, key2) {
    return key1.indexOf(key2) !== -1;
  }, key2);
}
