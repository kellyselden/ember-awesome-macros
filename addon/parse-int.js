import curriedComputed from 'ember-macro-helpers/curried-computed';
import { checkArgs } from './-utils';

export default curriedComputed(checkArgs(parseInt));
