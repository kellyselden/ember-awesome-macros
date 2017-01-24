import { A as emberA } from 'ember-array/utils';
import curriedComputed from 'ember-macro-helpers/curried-computed';

export default curriedComputed((...values) => emberA(values));
