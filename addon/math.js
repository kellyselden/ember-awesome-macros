import { resolveKeys } from './-utils';

export default Object.getOwnPropertyNames(Math).reduce((obj, key) => {
  let func = Math[key];
  if (typeof func === 'function' && func.length) {
    obj[key] = resolveKeys(func);
  }
  return obj;
}, {});
