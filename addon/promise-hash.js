import Ember from 'ember';
import get from 'ember-metal/get';
import RSVP from 'rsvp';

const {
  computed
} = Ember;

const { hash } = RSVP;

export default function(...keys) {
  return computed(...keys, function() {
    return hash(keys.reduce((promiseHash, key) => {
      promiseHash[key] = get(this, key);
      return promiseHash;
    }, {}));
  });
}
