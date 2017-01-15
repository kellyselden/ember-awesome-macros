import { resolveKeys } from './-utils';

export default resolveKeys((condition, expr1, expr2) => {
  return condition ? expr1 : expr2;
});
