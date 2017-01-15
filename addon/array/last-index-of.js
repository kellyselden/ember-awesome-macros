import { normalizeArray } from './-utils';

export default function(...keys) {
  return normalizeArray(keys, { defaultValue: -1 }, (array, value, fromIndex) => {
    return array.lastIndexOf(value, fromIndex);
  });
}
