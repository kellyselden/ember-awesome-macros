import { resolveKeys } from './utils';

export default function(...keys) {
  return resolveKeys(keys, val => {
    return val === undefined ? true : val;
  });
}
