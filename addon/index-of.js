import Ember from 'ember';
import { isComputed, flattenKeys, getValue } from './utils';

const {
  computed
} = Ember;

export default function(key1, key2) {
  if (!isComputed(key1)) {
    key1 += '.[]';
  }
  return computed(...flattenKeys([key1, key2]), function() {
    let array = getValue(this, key1);
    if (!array) {
      return -1;
    }
    return array.indexOf(getValue(this, key2));
  });
}
