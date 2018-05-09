import { resolve } from 'rsvp';
import { curriedComputed } from 'ember-macro-helpers';

export default curriedComputed(resolve);
