import { normalizeArray } from './-utils';

export default normalizeArray({}, (array, callback, initialValue) => {
  return array.reduce(callback, initialValue);
});
