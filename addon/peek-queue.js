import { normalizeArray } from './utils';

export default function(key) {
  return normalizeArray(key, {}, val => {
    return val[0];
  });
}
