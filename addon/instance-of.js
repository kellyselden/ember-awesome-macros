import computed from './computed';

export default function(...keys) {
  return computed(...keys, (object, constructor) => {
    if (constructor === undefined) {
      return undefined;
    }
    return object instanceof constructor;
  });
}
