import createClassComputed from 'ember-macro-helpers/create-class-computed';
import computed from 'ember-macro-helpers/computed';
import normalizeArrayKey from 'ember-macro-helpers/normalize-array-key';
import { A as emberA } from '@ember/array';
import { get } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default createClassComputed(
  [false, true],
  (array, key) => {
    return computed(normalizeArrayKey(array, [key]), array => {
      if (!Array.isArray(array)) {
        return [];
      }
      if (typeof key !== 'string') {
        return array;
      }

      if (!array.uniqBy) {
        // TODO: polyfill this
        // from https://github.com/emberjs/ember.js/blob/v2.11.0/packages/ember-runtime/lib/mixins/enumerable.js#L1094-L1105
        let ret = emberA();
        let seen = Object.create(null);

        array.forEach(item => {
          let guid = guidFor(get(item, key));
          if (!(guid in seen)) {
            seen[guid] = true;
            ret.push(item);
          }
        });

        return ret;
      }

      return array.uniqBy(key);
    });
  }
);
