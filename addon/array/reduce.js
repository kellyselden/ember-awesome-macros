import { normalizeArray } from './-utils';

export default normalizeArray({}, (array, callback, initialValue) => {
  if (typeof initialValue === 'function') {
    initialValue = initialValue();
  }
  return array.reduce(callback, initialValue);
});
