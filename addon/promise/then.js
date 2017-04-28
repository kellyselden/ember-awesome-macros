import get from 'ember-metal/get';
import RSVP from 'rsvp';
import lazyCurriedComputed from 'ember-macro-helpers/lazy-curried-computed';

const { resolve } = RSVP;

export default lazyCurriedComputed((getValue, promise, property) => {
  promise = getValue(promise);
  if (promise === undefined) {
    return resolve();
  }
  return promise.then(x => {
    property = getValue(property);
    if (property !== undefined) {
      return get(x, property);
    }
  });
});
