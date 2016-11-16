import { resolveKeys } from './utils';

export default function(...keys) {
  return resolveKeys(...keys, (...values) => {
    let [string, start, end] = values;
    if (string === undefined ||
      values.length > 1 && start === undefined ||
      values.length > 2 && end === undefined) {
      return undefined;
    }
    return string.substr(...values.slice(1));
  });
}
