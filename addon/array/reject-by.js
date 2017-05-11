import createClassComputed from 'ember-macro-helpers/create-class-computed';
import computed from 'ember-macro-helpers/computed';
import normalizeArrayKey from 'ember-macro-helpers/normalize-array-key';

const defaultValue = [];

export default createClassComputed(
  [false, true, false],
  (array, key, value) => {
    return computed(normalizeArrayKey(array, [key]), value, (array, value) => {
      if (!array) {
        return defaultValue;
      }
      if (!key) {
        return array;
      }
      return array.rejectBy(key, value);
    });
  }
);
