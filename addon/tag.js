import { resolveKeys } from './utils';

export default function(strings, ...values) {
  return resolveKeys(values, values => {
    return strings.reduce((total, cur, i) => {
      return total + values[i - 1] + cur;
    });
  });
}
