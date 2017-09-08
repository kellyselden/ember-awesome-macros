import { get } from '@ember/object';
import { A as emberA } from '@ember/array';
import computed from 'ember-macro-helpers/computed';
import normalizeArrayKey from 'ember-macro-helpers/normalize-array-key';
import createClassComputed from 'ember-macro-helpers/create-class-computed';

function getCurrentGroup(groups, value, comparator) {
  if (comparator) {
    return groups.find(group => {
      return comparator(get(group, 'value'), value);
    });
  }

  return groups.findBy('value', value);
}

export default createClassComputed(
  [false, true],
  (array, key, comparator) => {
    return computed(
      normalizeArrayKey(array, [key]),
      comparator,
      (array, comparator) => {
        if (!Array.isArray(array)) {
          return [];
        }
        if (typeof key !== 'string') {
          return array;
        }

        let groups = emberA();
        array.forEach(item => {
          const value = get(item, key);
          let currentGroup = getCurrentGroup(groups, value, comparator);

          if (currentGroup) {
            currentGroup.items.push(item);
          } else {
            groups.push({
              key,
              value,
              items: [item]
            });
          }
        });

        return groups;
      }
    );
  }
);
