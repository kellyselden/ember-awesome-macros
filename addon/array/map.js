import { normalizeArray } from '../utils';

export default function(...keys) {
  return normalizeArray(keys, {}, (array, callback) => {
    return array.map(callback);
  });
}
