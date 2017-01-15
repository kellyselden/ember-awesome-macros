import { resolveKeys, checkArgs } from './-utils';

export default function(...keys) {
  return resolveKeys(keys, (...values) => {
    return checkArgs(values, () => {
      return parseFloat(...values);
    });
  });
}
