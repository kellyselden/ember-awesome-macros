import isHTMLSafe from 'ember-string-ishtmlsafe-polyfill';
import { normalizeString } from './-utils';

export default normalizeString(isHTMLSafe);
