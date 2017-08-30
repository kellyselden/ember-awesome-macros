import { A as emberA } from '@ember/array';
import createClassComputed from 'ember-macro-helpers/create-class-computed';
import computed from 'ember-macro-helpers/computed';
import normalizeArrayKey from 'ember-macro-helpers/normalize-array-key';

export default createClassComputed(
  [false, true],
  (array, key) => {
    return computed(normalizeArrayKey(array, [key]), array => {
      if (!array || !key) {
        return array;
      }
      return emberA(array).mapBy(key);
    });
  }
);
