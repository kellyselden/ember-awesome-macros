import createClassComputed from 'ember-macro-helpers/create-class-computed';
import computed from 'ember-macro-helpers/computed';
import normalizeArrayKey from 'ember-macro-helpers/normalize-array-key';
import { A as emberA } from 'ember-array/utils';

export default createClassComputed(
  [false, true, false],
  (array, methodName, args) => {
    return computed(normalizeArrayKey(array, [methodName]), args, (array, args) => {
      if (array) {
        return emberA(array).invoke(methodName, args);
      }
    });
  }
);
