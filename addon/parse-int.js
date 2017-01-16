import { resolveKeys, checkArgs } from './-utils';

export default resolveKeys(checkArgs(values => {
  return parseInt(...values);
}));
