import { normalizeArray } from '../utils';

export default function(...keys) {
  return normalizeArray(keys, {}, (array, key) => {
    if (!key) {
      return array;
    }
    return array.mapBy(key);
  });
}
