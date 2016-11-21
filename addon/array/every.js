import { normalizeArray } from '../utils';

export default function(...keys) {
  return normalizeArray(keys, { defaultValue: false }, (array, callback) => {
    return array.every(callback);
  });
}
