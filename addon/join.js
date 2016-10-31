import { normalizeArray } from './utils';

export default function(...keys) {
  return normalizeArray(keys, { defaultValue: '' }, (array, separator) => {
    return array.join(separator);
  });
}
