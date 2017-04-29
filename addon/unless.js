import { conditional } from '.';

export default function(condition, expr1, expr2) {
  return conditional(condition, expr2, expr1);
}
