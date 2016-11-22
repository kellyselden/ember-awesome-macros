import { normalizeArray } from '../utils';

export default function(...keys) {
  return normalizeArray(keys, {}, (array, key) => {
    if (key === undefined) {
      return array;
    }
    return array.uniqBy(key);
  });
}
