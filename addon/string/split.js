import curriedComputed from 'ember-macro-helpers/curried-computed';

export default curriedComputed((str, sep) => {
  if (!str) {
    return [];
  }
  return str.split(sep);
});
