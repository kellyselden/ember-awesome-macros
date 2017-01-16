import { normalizeArray } from './-utils';

export default normalizeArray({ defaultValue: '' }, (array, separator) => {
  return array.join(separator);
});
