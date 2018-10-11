import { curriedComputed } from 'ember-macro-helpers';

export default curriedComputed((val1, val2) => {
  let s = val1 + '';
  while (s.length < parseInt(val2)) {
    s = '0' + s;
  }
  return s;
});
