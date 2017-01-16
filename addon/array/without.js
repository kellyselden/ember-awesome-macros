import { normalizeArray } from './-utils';

export default normalizeArray({}, (array, item) => {
  return array.without(item);
});
