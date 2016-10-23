import { normalizeArray } from './utils';

const defaultValue = [];

export default function(array, key, value) {
  return normalizeArray(array, { defaultValue }, (array, key, value) => {
    if (!key) {
      return defaultValue;
    }
    return array.filterBy(key, value);
  }, key, value);
}
