import Ember from 'ember';
import { resolveKeys } from './utils';

export default function(hash) {
  let hashKeys = Object.keys(hash);
  let hashValues = hashKeys.map(key => hash[key]);
  return resolveKeys(hashValues, newValues => {
    return Ember.Object.create(newValues.reduce((newHash, val, i) => {
      newHash[hashKeys[i]] = val;
      return newHash;
    }, {}));
  });
}
