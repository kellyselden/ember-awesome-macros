import { resolveKeys } from './-utils';

export default resolveKeys(val => {
  return val === undefined ? true : val;
});
