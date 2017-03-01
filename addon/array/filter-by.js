import createClassComputed from 'ember-macro-helpers/create-class-computed';
import computed from 'ember-macro-helpers/computed';
import normalizeArrayKey from 'ember-macro-helpers/normalize-array-key';

const defaultValue = [];

export default createClassComputed(
  [false, true, false],
  (array, key, value) => {
    return computed(normalizeArrayKey(array, [key]), value, (array, value) => {
      if (!array || !key) {
        return defaultValue;
      }
      return array.filterBy(key, value);
    });
  }
);
