import { curriedComputed } from 'ember-macro-helpers';

export default curriedComputed((val1, val2) => {
  return val1 < val2;
});
