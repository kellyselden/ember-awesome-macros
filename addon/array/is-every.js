import { A as emberA } from '@ember/array';
import createClassComputed from 'ember-macro-helpers/create-class-computed';
import computed from 'ember-macro-helpers/computed';
import normalizeArrayKey from 'ember-macro-helpers/normalize-array-key';

export default createClassComputed(
  [false, true],
  (array, key, value) => {
    let args = [normalizeArrayKey(array, [key])];
    if (value) {
      args.push(value);
    }
    return computed(...args, (array, ...args) => {
      if (Array.isArray(array) && typeof key === 'string') {
        return emberA(array).isEvery(key, ...args);
      }
    });
  }
);
