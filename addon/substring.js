import { resolveKeys } from './utils';

export default function(...keys) {
  return resolveKeys(...keys, (...values) => {
    let [string, start, length] = values;
    if (string === undefined ||
      values.length > 1 && start === undefined ||
      values.length > 2 && length === undefined) {
      return undefined;
    }
    return string.substring(...values.slice(1));
  });
}
