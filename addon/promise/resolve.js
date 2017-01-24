import RSVP from 'rsvp';
import curriedComputed from 'ember-macro-helpers/curried-computed';

const { resolve } = RSVP;

export default curriedComputed(resolve);
