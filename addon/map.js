import { normalizeArray } from './utils';

export default function(array, callback) {
  return normalizeArray(array, {}, array => {
    return array.map(callback);
  });
}
