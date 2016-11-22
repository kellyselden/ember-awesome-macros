import { normalizeArray } from '../utils';

export default function(...keys) {
  return normalizeArray(keys, {}, (array, begin, end) => {
    return array.slice(begin, end);
  });
}
