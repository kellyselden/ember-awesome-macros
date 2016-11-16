import { resolveKeys } from './utils';

export default function(...keys) {
  return resolveKeys(keys, (val1, val2) => {
    return val1 >= val2;
  });
}
