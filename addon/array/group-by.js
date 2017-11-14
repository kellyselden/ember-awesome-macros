import { get } from '@ember/object';
import { A as emberA } from '@ember/array';
import { normalizeArray3 } from './-utils';

function getCurrentGroup(groups, value, comparator) {
  if (comparator) {
    return groups.find(group => {
      return comparator(get(group, 'value'), value);
    });
  }

  return groups.findBy('value', value);
}

export default normalizeArray3({
  firstDefault: () => [],
  func(array, key, comparator) {
    let groups = emberA();
    array.forEach(item => {
      let value = get(item, key);
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
});
