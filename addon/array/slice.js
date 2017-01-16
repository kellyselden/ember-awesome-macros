import { normalizeArray } from './-utils';

export default normalizeArray({}, (array, begin, end) => {
  return array.slice(begin, end);
});
