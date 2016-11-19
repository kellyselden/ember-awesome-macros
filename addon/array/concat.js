import { normalizeArray2 } from '../utils';

export default function(...keys) {
  return normalizeArray2(keys, 'concat');
}
