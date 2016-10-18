import Ember from 'ember';

const {
  RSVP: { hash },
  get,
  computed
} = Ember;

export default function(...keys) {
  return computed(...keys, function() {
    return hash(keys.reduce((promiseHash, key) => {
      promiseHash[key] = get(this, key);
      return promiseHash;
    }, {}));
  });
}
