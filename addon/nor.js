import not from './not';
import or from './or';

export default function() {
  return not(or(...arguments));
}
