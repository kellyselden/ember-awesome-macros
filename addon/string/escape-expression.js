import Ember from 'ember';
import curriedComputed from 'ember-macro-helpers/curried-computed';

export default curriedComputed(Ember.Handlebars.Utils.escapeExpression);
