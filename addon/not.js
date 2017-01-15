import { resolveKeys } from './-utils';

export default function(...keys) {
  return resolveKeys(keys, value => !value);
}
