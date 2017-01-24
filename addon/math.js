import curriedComputed from 'ember-macro-helpers/curried-computed';

export default Object.getOwnPropertyNames(Math).reduce((obj, key) => {
  let func = Math[key];
  if (typeof func === 'function' && func.length) {
    obj[key] = curriedComputed(func);
  }
  return obj;
}, {});
