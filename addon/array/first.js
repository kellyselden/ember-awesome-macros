import { normalizeArray } from './-utils';

export default normalizeArray({}, array => {
  return array.objectAt(0);
});
