import Ember from 'ember';
import { get } from '@ember/object';
import { normalizeArray } from './-utils';

const { compare } = Ember;

function getComparable(a, prop) {
  const val = get(a, prop);

  return val && val._isAMomentObject ? val.unix() : val;
}

export default function(array, sortDefinition) {
  let computedCallback;

  if (sortDefinition === undefined) {
    computedCallback = array => array.slice().sort();
  } else {
    computedCallback = function(array, sortDefinition) {
      let sortCallback;

      if (typeof sortDefinition === 'function') {
        sortCallback = sortDefinition.bind(this);
      } else {
        sortCallback = (a, b) => {
          let result = 0;

          // https://kangax.github.io/compat-table/es6/#test-generators
          // for (let key of sortDefinition) {
          for (let i = 0; i < sortDefinition.length; i++) {
            let key = sortDefinition[i];
            let [prop, direction] = key.split(':');
            result = compare(getComparable(a, prop), getComparable(b, prop));
            if (result !== 0) {
              if (direction === 'desc') {
                result *= -1;
              }

              break;
            }
          }

          return result;
        };
      }

      return array.slice().sort(sortCallback);
    };
  }

  return normalizeArray({}, computedCallback)(array, sortDefinition);
}
