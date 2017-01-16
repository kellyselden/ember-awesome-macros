import { normalizeArray } from './-utils';

export default normalizeArray({ defaultValue: false }, (array, item) => {
  return array.indexOf(item) !== -1;
});
