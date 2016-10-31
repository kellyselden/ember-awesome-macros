import { resolveKeys } from './utils';

export default function(...keys) {
  return resolveKeys(...keys, (condition, expr1, expr2) => {
    return condition ? expr1 : expr2;
  });
}
