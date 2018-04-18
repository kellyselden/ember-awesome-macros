import curriedComputed from 'ember-macro-helpers/curried-computed';

export default curriedComputed(val => {
  return Number(val);
});
