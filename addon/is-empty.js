import { isEmpty, typeOf } from '@ember/utils';
import { isArray } from '@ember/array';
import lazyComputed from 'ember-macro-helpers/lazy-computed';

export default function(key) {
  if (key === undefined || key === null) {
    return true;
  }
  if (isArray(key)) {
    return isEmpty(key);
  }
  if (typeOf(key) === 'string') {
    return lazyComputed(key, `${key}.{length,size}`, (get, key) => {
      return isEmpty(get(key));
    });
  }
  return lazyComputed(key, (get, key) => {
    return isEmpty(get(key));
  });
}
