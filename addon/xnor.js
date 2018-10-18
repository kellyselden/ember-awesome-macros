import not from './not';
import xor from './xor';

export default function() {
  return not(xor(...arguments));
}
