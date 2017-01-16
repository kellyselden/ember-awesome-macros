import { normalizeArray } from './-utils';

export default normalizeArray({}, array => {
  return array[array.length - 1];
});
