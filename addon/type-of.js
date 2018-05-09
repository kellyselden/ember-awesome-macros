import { curriedComputed } from 'ember-macro-helpers';

export default curriedComputed(object => {
  return typeof object;
});
