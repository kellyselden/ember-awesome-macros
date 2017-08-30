import { A as emberA } from '@ember/array';
import { normalizeArray } from './-utils';

export default normalizeArray({ defaultValue: () => false }, (array, callback) => {
  return emberA(array).any(callback);
});
