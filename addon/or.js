import { reduceKeys } from './utils';

export default function(...keys) {
  return reduceKeys(keys, (total, value) => {
    return total || value;
  });
}
