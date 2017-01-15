import { normalizeString } from './-utils';

export default function(key) {
  return normalizeString(key, string => string.length);
}
