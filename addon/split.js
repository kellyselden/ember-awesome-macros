import { resolveKeys } from './utils';

export default function(...keys) {
  return resolveKeys(...keys, (str, sep) => {
    if (!str) {
      return [];
    }
    return str.split(sep);
  });
}
