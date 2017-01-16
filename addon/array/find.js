import { normalizeArray } from './-utils';

export default normalizeArray({}, (array, callback) => {
  return array.find(callback);
});
