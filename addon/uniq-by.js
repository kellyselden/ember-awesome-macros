import { normalizeArray } from './utils';

export default function(array, key) {
  return normalizeArray(array, { defaultValue: undefined }, (array, key) => {
    if (key === undefined) {
      return array;
    }
    return array.uniqBy(key);
  }, key);
}
