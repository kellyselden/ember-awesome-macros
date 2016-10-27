import { normalizeArray } from './utils';

export default function(array) {
  return normalizeArray(array, { defaultValue: undefined }, array => {
    return array.uniq();
  });
}
