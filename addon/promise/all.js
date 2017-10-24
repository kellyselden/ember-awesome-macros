import { all } from 'rsvp';
import curriedComputed from 'ember-macro-helpers/curried-computed';

export default curriedComputed((...values) => all(values));
