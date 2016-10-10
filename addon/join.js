import Ember from 'ember';
import { wrapArray } from './utils';

const {
  get,
  computed
} = Ember;

export default function(arrayKey, separator) {
  arrayKey = wrapArray(arrayKey);
  return computed(arrayKey, function() {
    let array = get(this, arrayKey);
    if (!array) {
      return '';
    }
    return array.join(separator);
  });
}
