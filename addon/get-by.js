import get from 'ember-metal/get';
import { resolveKeys } from './-utils';

export default function(...keys) {
  return resolveKeys(keys, (obj, key) => {
    if (obj && key) {
      return get(obj, key);
    }
  });
}
