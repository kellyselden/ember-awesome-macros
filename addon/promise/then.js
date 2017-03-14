import get from 'ember-metal/get';
import RSVP from 'rsvp';
import curriedComputed from 'ember-macro-helpers/curried-computed';

const { resolve } = RSVP;

export default curriedComputed((promise, property) => {
  if (promise === undefined) {
    return resolve();
  }
  return promise.then(x => {
    if (property !== undefined) {
      return get(x, property);
    }
  });
});
