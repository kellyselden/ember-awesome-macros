import curriedComputed from 'ember-macro-helpers/curried-computed';

export default curriedComputed((condition, expr1, expr2) => {
  return condition ? expr2 : expr1;
});
