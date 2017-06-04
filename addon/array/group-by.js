import get from 'ember-metal/get';
import { A as emberA } from 'ember-array/utils';
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
  [ false, true, false],
  ( array, key, comparator) => {
    return computed(normalizeArrayKey(array, [key]), comparator, (array, comparator) => {
      if (!array || !key) {
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
            value: value,
            items: [ item ]
          });
        }
      });

      return groups;
    });
  }
);

// export default normalizeArray({}, (array, comparator) => {
//   // let groupValues = emberA(array).mapBy(key).uniq();
//   // let groups = emberA();
//   // groupValues.forEach(groupValue => {
//   //   groups.push({
//   //     key,
//   //     value: groupValue,
//   //     items: emberA(array).filterBy(key, groupValue)
//   //   });
//   // });
//   //
//   // return groups;
//   let groups = emberA();
//   groups.push(createGroup());
//
//   for (let i = 1; i < array.length; i++) {
//     if (comparator(array[i-1]))
//   }
//
//   return groups;
// });
