import { normalizeArray } from './utils';

export default function(...keys) {
  return normalizeArray(keys, {}, (array, key, value) => {
    return array.isAny(key, value);
  });
}
