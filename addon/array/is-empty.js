import eq from '../eq';
import length from './length';

export default function() {
  return eq(length(...arguments), 0);
}
