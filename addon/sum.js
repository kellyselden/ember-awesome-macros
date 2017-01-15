import { reduceKeys } from './-utils';

export default reduceKeys((total, value) => {
  return total + value;
});
