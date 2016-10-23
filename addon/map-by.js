import { normalizeArray } from './utils';

export default function(array, key) {
  return normalizeArray(array, { }, (array, key) => {
    if (!key) {
      return array;
    }
    return array.mapBy(key);
  }, key);
}
