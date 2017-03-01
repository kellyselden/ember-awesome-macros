import createClassComputed from 'ember-macro-helpers/create-class-computed';
import computed from 'ember-macro-helpers/computed';
import normalizeArrayKey from 'ember-macro-helpers/normalize-array-key';

/* jshint -W080 */
const defaultValue = undefined;
/* jshint +W080 */

export default createClassComputed(
  [false, true, false],
  (array, key, value) => {
    return computed(normalizeArrayKey(array, [key]), value, (array, value) => {
      if (!array || !key) {
        return defaultValue;
      }
      return array.findBy(key, value);
    });
  }
);
