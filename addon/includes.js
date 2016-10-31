import { normalizeArray } from './utils';

export default function(...keys) {
  return normalizeArray(keys, { defaultValue: false }, (array, item) => {
    return array.indexOf(item) !== -1;
  });
}
