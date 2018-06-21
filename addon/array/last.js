import { normalizeArray } from './-utils';

export default normalizeArray({}, array => {
  return array.objectAt(array.length - 1);
});
