import { normalizeString } from './-utils';

export default normalizeString(value => {
  // borrowed from https://github.com/romulomachado/ember-cli-string-helpers/blob/master/addon/utils/titleize.js
  // also waiting on https://github.com/emberjs/rfcs/issues/224
  return value.toLowerCase().replace(/(?:^|\s|-|\/)\S/g, m => m.toUpperCase());
});
