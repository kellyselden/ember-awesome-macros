import { curriedComputed } from 'ember-macro-helpers';

export default curriedComputed((object, constructor) => {
  if (constructor === undefined) {
    return undefined;
  }
  return object instanceof constructor;
});
