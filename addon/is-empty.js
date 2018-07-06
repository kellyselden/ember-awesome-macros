import { isEmpty, typeOf } from '@ember/utils';
import { computed } from 'ember-macro-helpers';

export default function(key) {
  if (typeOf(key) === 'string') {
    return computed(key, `${key}.{length,size}`, isEmpty);
  }
  return computed(key, isEmpty);
}
