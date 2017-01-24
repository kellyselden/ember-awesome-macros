import curriedComputed from 'ember-macro-helpers/curried-computed';

export default curriedComputed((firstVal, ...values) => {
  return values.filter(value => {
    return value !== firstVal;
  }).length === 0;
});
