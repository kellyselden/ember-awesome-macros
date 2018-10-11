import not from './not';
import isEmpty from './is-empty';

export default function() {
  return not(isEmpty(...arguments));
}
