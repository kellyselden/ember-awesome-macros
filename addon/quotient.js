import { normalizeArithmetic } from './utils';

export default function(...keys) {
  return normalizeArithmetic(keys, (total, value) => {
    return total / value;
  });
}
