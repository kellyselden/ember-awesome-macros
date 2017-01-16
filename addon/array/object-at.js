import { normalizeArray } from './-utils';

export default normalizeArray({}, (array, index) => {
  return array.objectAt(index);
});
