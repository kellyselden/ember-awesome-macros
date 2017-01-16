import { normalizeArray } from './-utils';

/* jshint -W080 */
const defaultValue = undefined;
/* jshint +W080 */

export default normalizeArray({ defaultValue }, (array, key, value) => {
  if (!key) {
    return defaultValue;
  }
  return array.findBy(key, value);
});
