import get from 'ember-metal/get';
import curriedComputed from 'ember-macro-helpers/curried-computed';

export default curriedComputed((obj, key) => {
  if (obj && key) {
    return get(obj, key);
  }
});
