import { normalizeArray } from '../utils';

export default function(...keys) {
  return normalizeArray(keys, {}, (array, callback, initialValue) => {
    return array.reduce(callback, initialValue);
  });
}
