import { get } from '@ember/object';
import { resolve } from 'rsvp';
import { lazyCurriedComputed } from 'ember-macro-helpers';

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
