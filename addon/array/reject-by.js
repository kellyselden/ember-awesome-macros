import createClassComputed from 'ember-macro-helpers/create-class-computed';
import computed from 'ember-macro-helpers/computed';
import normalizeArrayKey from 'ember-macro-helpers/normalize-array-key';

export default createClassComputed(
  [false, true, false],
  (array, key, value) => {
    let args = [normalizeArrayKey(array, [key])];
    if (value) {
      args.push(value);
    }
    return computed(...args, (array, ...args) => {
      if (!array) {
        return [];
      }
      if (!key) {
        return array;
      }
      return array.rejectBy(key, ...args);
    });
  }
);
