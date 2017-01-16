import { resolveKeys } from './-utils';

export default resolveKeys((object, constructor) => {
  if (constructor === undefined) {
    return undefined;
  }
  return object instanceof constructor;
});
