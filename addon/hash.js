import Ember from 'ember';
import { resolveKeys } from './utils';

const {
  Object: EmberObject
} = Ember;

export default function(hash) {
  let hashKeys = Object.getOwnPropertyNames(hash);
  let hashValues = hashKeys.map(key => hash[key]);
  return resolveKeys(hashValues, newValues => {
    return EmberObject.create(newValues.reduce((newHash, val, i) => {
      newHash[hashKeys[i]] = val;
      return newHash;
    }, {}));
  });
}
