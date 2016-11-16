import { resolveKeys } from './utils';

export default function(key) {
  return resolveKeys(key, value => !value);
}
