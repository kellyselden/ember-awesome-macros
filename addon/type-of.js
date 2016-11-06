import computed from './computed';

export default function(...keys) {
  return computed(...keys, object => {
    return typeof object;
  });
}
