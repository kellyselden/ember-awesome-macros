import { resolveKeys } from './utils';

export default function(...keys) {
  return resolveKeys(keys, string => {
    if (string === undefined) {
      return undefined;
    }
    return parseFloat(string);
  });
}
