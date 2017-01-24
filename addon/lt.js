import curriedComputed from 'ember-macro-helpers/curried-computed';

export default curriedComputed((val1, val2) => {
  return val1 < val2;
});
