import { resolveKeys } from './utils';

export default function(condition, expr1, expr2) {
  return resolveKeys(condition, expr1, expr2, (condition, expr1, expr2) => {
    return condition ? expr1 : expr2;
  });
}
