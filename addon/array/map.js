import { normalizeArray } from './-utils';

export default normalizeArray({}, (array, callback) => {
  return array.map(callback);
});
