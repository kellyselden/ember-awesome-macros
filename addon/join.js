import Ember from 'ember';
import { isComputed } from './utils';

const {
  get,
  computed
} = Ember;

export default function(arrayKey, separator) {
  if (!isComputed(arrayKey)) {
    arrayKey += '.[]';
  }
  return computed(arrayKey, function() {
    let array = get(this, arrayKey);
    if (!array) {
      return '';
    }
    return array.join(separator);
  });
}
