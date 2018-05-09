import Ember from 'ember';
import { curriedComputed } from 'ember-macro-helpers';

export default curriedComputed(Ember.Handlebars.Utils.escapeExpression);
