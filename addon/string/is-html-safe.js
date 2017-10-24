import { isHTMLSafe } from '@ember/string';
import { normalizeString } from './-utils';

export default normalizeString(isHTMLSafe);
