import { normalizeArray } from './-utils';

export default function(...keys) {
  return normalizeArray(keys, {}, (array, key, value) => {
    return array.isEvery(key, value);
  });
}
