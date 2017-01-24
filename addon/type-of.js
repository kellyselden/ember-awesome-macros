import curriedComputed from 'ember-macro-helpers/curried-computed';

export default curriedComputed(object => {
  return typeof object;
});
