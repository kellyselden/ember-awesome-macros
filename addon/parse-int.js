import { resolveKeys } from './utils';

export default function(...keys) {
  return resolveKeys(keys, values => {
    let [string, radix] = values;
    if (string === undefined || values.length > 1 && radix === undefined) {
      return undefined;
    }
    return parseInt(...values);
  });
}
