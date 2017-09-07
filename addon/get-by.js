import createClassComputed from 'ember-macro-helpers/create-class-computed';
import { readOnly } from '@ember/object/computed';

export default createClassComputed(
  [false, true],
  (obj, key) => readOnly(`${obj}.${key}`)
);
