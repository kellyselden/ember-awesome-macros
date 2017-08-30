import { A as emberA } from '@ember/array';
import { normalizeArray } from './-utils';

export default normalizeArray({}, (array, index) => {
  return emberA(array).objectAt(index);
});
