import { normalizeArray } from './-utils';

export default normalizeArray({}, function(array, callback) {
  return array.map((...args) => callback.apply(this, args));
});
