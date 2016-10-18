import { normalizeArray } from './utils';

export default function(key) {
  return normalizeArray(key, undefined, val => {
    return val[val.length - 1];
  });
}
