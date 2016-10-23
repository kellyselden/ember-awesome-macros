import { normalizeArray } from './utils';

export default function(array, callback) {
  return normalizeArray(array, { defaultValue: false }, array => {
    return array.any(callback);
  });
}
