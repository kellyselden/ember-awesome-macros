import { resolveKeys } from '../-utils';

export default resolveKeys((str, sep) => {
  if (!str) {
    return [];
  }
  return str.split(sep);
});
