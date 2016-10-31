import { normalizeArray } from './utils';

export default function(array, callback, initialValue) {
  return normalizeArray(array, {}, array => {
    return array.reduce(callback, initialValue);
  });
}
