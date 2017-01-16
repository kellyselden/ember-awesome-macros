import { normalizeArray } from './-utils';

export default normalizeArray({}, (array, key, value) => {
  return array.isAny(key, value);
});
