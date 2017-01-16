import { normalizeArray } from './-utils';

export default normalizeArray({ defaultValue: false }, (array, callback) => {
  return array.any(callback);
});
