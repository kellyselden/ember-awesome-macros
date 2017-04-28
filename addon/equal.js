import lazyCurriedComputed from 'ember-macro-helpers/lazy-curried-computed';

export default lazyCurriedComputed((get, firstKey, ...keys) => {
  let firstVal = get(firstKey);
  for (let i in keys) {
    if (firstVal !== get(keys[i])) {
      return false;
    }
  }
  return true;
});
