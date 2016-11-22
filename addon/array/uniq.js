import { normalizeArray } from '../utils';

export default function(...keys) {
  return normalizeArray(keys, {}, array => {
    return array.uniq();
  });
}
