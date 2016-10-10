import Ember from 'ember';
import { wrapArray, flattenKeys, getValue } from './utils';

const {
  computed
} = Ember;

export default function(key1, key2) {
  key1 = wrapArray(key1);
  return computed(...flattenKeys([key1, key2]), function() {
    let array = getValue(this, key1);
    if (!array) {
      return false;
    }
    return array.indexOf(getValue(this, key2)) !== -1;
  });
}
