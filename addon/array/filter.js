import { normalizeArray } from './-utils';

export default normalizeArray({ defaultValue: [] }, (array, callback) => {
  return array.filter(callback);
});
