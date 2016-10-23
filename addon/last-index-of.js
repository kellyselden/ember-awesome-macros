import { normalizeArray } from './utils';

export default function(array, value, fromIndex) {
  return normalizeArray(array, { defaultValue: -1 }, (array, value, fromIndex) => {
    return array.lastIndexOf(value, fromIndex);
  }, value, fromIndex);
}
