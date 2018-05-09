import { createClassComputed } from 'ember-macro-helpers';
import { readOnly } from '@ember/object/computed';

export default createClassComputed(
  [false, true],
  (obj, key) => readOnly(`${obj}.${key}`)
);
