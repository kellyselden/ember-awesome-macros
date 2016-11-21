import { normalizeArray } from '../utils';

export default function(...keys) {
  return normalizeArray(keys, { defaultValue: [] }, (array, callback) => {
    return array.filter(callback);
  });
}
