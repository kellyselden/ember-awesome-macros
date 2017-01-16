import { normalizeArray } from './-utils';

export default normalizeArray({}, (array, key) => {
  if (!key) {
    return array;
  }
  return array.mapBy(key);
});
