import createClassComputed from 'ember-macro-helpers/create-class-computed';
import computed from 'ember-macro-helpers/computed';
import normalizeArrayKey from 'ember-macro-helpers/normalize-array-key';

export default createClassComputed(
  [false, true],
  (array, key, value) => {
    return computed(normalizeArrayKey(array, [key]), value, (array, value) => {
      if (!array || !key) {
        return undefined;
      }
      return array.findBy(key, value);
    });
  }
);
