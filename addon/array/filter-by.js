import { normalizeArray } from './-utils';

const defaultValue = [];

export default normalizeArray({ defaultValue }, (array, key, value) => {
  if (!key) {
    return defaultValue;
  }
  return array.filterBy(key, value);
});
