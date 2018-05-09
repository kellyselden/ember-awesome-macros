import { lazyCurriedComputed } from 'ember-macro-helpers';

export default lazyCurriedComputed((get, condition, expr1, expr2) => {
  return get(condition) ? get(expr1) : get(expr2);
});
