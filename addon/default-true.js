import curriedComputed from 'ember-macro-helpers/curried-computed';

export default curriedComputed(val => {
  return val === undefined ? true : val;
});
