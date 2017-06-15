import createClassComputed from 'ember-macro-helpers/create-class-computed';
import computed from 'ember-macro-helpers/computed';

export default createClassComputed(
  [false, true],
  (obj, key) => {
    return computed(`${obj}.${key}`, (value) => {
      return value;
    });
  }
);
