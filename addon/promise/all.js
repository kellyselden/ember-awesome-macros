import { all } from 'rsvp';
import { curriedComputed } from 'ember-macro-helpers';

export default curriedComputed((...values) => all(values));
