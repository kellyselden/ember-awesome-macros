import { normalizeArray } from './-utils';

const defaultValue = [];

export default function(...keys) {
  return normalizeArray(keys, { defaultValue }, (array, key, value) => {
    if (!key) {
      return defaultValue;
    }
    return array.filterBy(key, value);
  });
}
