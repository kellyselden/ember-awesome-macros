import Ember from 'ember';
import { normalizeString } from '../utils';

let {
  String: { isHTMLSafe }
} = Ember;

// remove once 2.4 is dropped
if (!isHTMLSafe) {
  isHTMLSafe = val => val instanceof Ember.Handlebars.SafeString;
}

export default function(key) {
  return normalizeString(key, isHTMLSafe);
}
