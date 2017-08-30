import { A as emberA } from '@ember/array';
import { normalizeArray } from './-utils';

export default normalizeArray({}, (array, item) => {
  return emberA(array).without(item);
});
