import computed from 'ember-computed';
import { assert } from 'ember-metal/utils';
import flattenKeys from 'ember-macro-helpers/flatten-keys';
import getValue from 'ember-macro-helpers/get-value';

const defaultValue = [];

export default function(array, key, value) {
  assert('The object key must be a string to properly watch the array for value changes.', typeof key === 'string');

  let arrayKey = array;
  if (typeof array === 'string') {
    arrayKey += `.@each.${key}`;
  }

  return computed(...flattenKeys([arrayKey, value]), function() {
    let arrayValue = getValue(this, array);
    if (!arrayValue) {
      return defaultValue;
    }
    return arrayValue.filterBy(key, getValue(this, value));
  }).readOnly();
}
