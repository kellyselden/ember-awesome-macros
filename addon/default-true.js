import { curriedComputed } from 'ember-macro-helpers';

export default curriedComputed(val => {
  return val === undefined ? true : val;
});
