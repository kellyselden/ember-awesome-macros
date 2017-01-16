import { A as emberA } from 'ember-array/utils';
import { resolveKeys } from './-utils';

export default resolveKeys((...values) => emberA(values));
