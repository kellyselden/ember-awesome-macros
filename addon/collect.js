import { A as emberA } from '@ember/array';
import curriedComputed from 'ember-macro-helpers/curried-computed';

export default curriedComputed((...values) => emberA(values));
