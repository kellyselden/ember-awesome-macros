import { resolveKeys, checkArgs } from './-utils';

export default resolveKeys((...values) => {
  return checkArgs(values, () => {
    return parseFloat(...values);
  });
});
