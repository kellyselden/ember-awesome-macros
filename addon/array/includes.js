import { A as emberA } from '@ember/array';
import { normalizeArray } from './-utils';

export default normalizeArray({ defaultValue: () => false }, (array, item) => {
  return emberA(array).includes(item);
});
