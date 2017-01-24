import curriedComputed from 'ember-macro-helpers/curried-computed';

export default curriedComputed((object, constructor) => {
  if (constructor === undefined) {
    return undefined;
  }
  return object instanceof constructor;
});
