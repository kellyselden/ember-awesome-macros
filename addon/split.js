import Ember from 'ember';
import { flattenKeys, getValue } from './utils';

const {
  computed
} = Ember;

export default function(key1, key2) {
  return computed(...flattenKeys([key1, key2]), function() {
    let string = getValue(this, key1);
    if (!string) {
      return [];
    }
    return string.split(getValue(this, key2));
  });
}
