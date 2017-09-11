import { A as emberA } from '@ember/array';
import { get } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { normalizeArray3 } from './-utils';

export default normalizeArray3({
  firstDefault: () => [],
  func(array, key) {
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
  }
});
