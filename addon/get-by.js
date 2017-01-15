import get from 'ember-metal/get';
import { resolveKeys } from './-utils';

export default resolveKeys((obj, key) => {
  if (obj && key) {
    return get(obj, key);
  }
});
