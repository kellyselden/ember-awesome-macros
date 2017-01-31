import { normalizeArray } from './-utils';
import { A as emberA } from 'ember-array/utils';

export default normalizeArray({}, (array, methodName, args) => {
  return emberA(array).invoke(methodName, args);
});
