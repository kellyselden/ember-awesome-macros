import computed from './computed';

export default Object.getOwnPropertyNames(Math).reduce((obj, key) => {
  let func = Math[key];
  if (typeof func === 'function' && func.length) {
    obj[key] = (...keys) => computed(...keys, Math[key]);
  }
  return obj;
}, {});
