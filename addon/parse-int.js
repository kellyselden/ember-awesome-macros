import { curriedComputed } from 'ember-macro-helpers';
import { checkArgs } from './-utils';

export default curriedComputed(checkArgs(parseInt));
