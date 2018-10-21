import not from './not';
import and from './and';

export default function() {
  return not(and(...arguments));
}
