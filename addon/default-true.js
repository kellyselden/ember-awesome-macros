import { resolveKeys } from './utils';

export default function(key) {
  return resolveKeys(key, val => {
    return val === undefined ? true : val;
  });
}
