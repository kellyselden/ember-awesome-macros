import computed from 'ember-computed';
import flattenKeys from 'ember-macro-helpers/flatten-keys';
import getValue from 'ember-macro-helpers/get-value';

const defaultValue = [];

export default function(array, callback) {
  let arrayKey = array;
  if (typeof array === 'string') {
    let i = array.indexOf('.@each');
    if (i !== -1) {
      array = array.substr(0, i);
    } else {
      arrayKey += `.[]`;
    }
  }

  return computed(...flattenKeys([arrayKey]), function() {
    let arrayValue = getValue(this, array);
    if (!arrayValue) {
      return defaultValue;
    }
    return arrayValue.filter(callback);
  }).readOnly();
}
