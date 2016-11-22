import { normalizeArray } from '../utils';

export default function(...keys) {
  return normalizeArray(keys, {}, (array, item) => {
    return array.without(item);
  });
}
