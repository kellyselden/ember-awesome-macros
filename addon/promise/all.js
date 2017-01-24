import RSVP from 'rsvp';
import curriedComputed from 'ember-macro-helpers/curried-computed';

const { all } = RSVP;

export default curriedComputed((...values) => all(values));
