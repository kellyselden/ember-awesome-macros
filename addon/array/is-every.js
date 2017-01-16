import { normalizeArray } from './-utils';

export default normalizeArray({}, (array, key, value) => {
  return array.isEvery(key, value);
});
