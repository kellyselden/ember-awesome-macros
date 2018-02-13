import { curriedComputed } from 'ember-macro-helpers';

export default curriedComputed(val => !!val);
