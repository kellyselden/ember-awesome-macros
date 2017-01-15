import { deprecate } from './utils';

import isHtmlSafe from './string/is-html-safe';

export default deprecate(isHtmlSafe, 'isHtmlSafe', 'string.isHtmlSafe');
