import not from './not';
import eq from './eq';

export default function() {
  return not(eq(...arguments));
}
