import { normalizeArray } from './utils';

export default function(array, callback) {
  return normalizeArray(array, { defaultValue: [] }, array => {
    return array.filter(callback);
  });
}
