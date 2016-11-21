import { normalizeArray } from '../utils';

export default function(...keys) {
  return normalizeArray(keys, {}, (array, index) => {
    return array.objectAt(index);
  });
}
