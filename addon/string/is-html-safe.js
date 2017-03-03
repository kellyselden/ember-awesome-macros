import Ember from 'ember';
import { normalizeString } from './-utils';

const { isHTMLSafe } = Ember.String;

export default normalizeString(isHTMLSafe);
