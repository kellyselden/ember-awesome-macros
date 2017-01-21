import { resolveKeys } from './-utils';

export default resolveKeys((firstVal, ...values) => {
  return values.filter(value => {
    return value !== firstVal;
  }).length > 0;
});
