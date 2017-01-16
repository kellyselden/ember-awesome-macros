import { normalizeArray } from './-utils';

export default normalizeArray({}, (array, key) => {
  if (key === undefined) {
    return array;
  }
  return array.uniqBy(key);
});
