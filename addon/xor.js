import and from './and';
import not from './not';
import or from './or';

export default function() {
  return and(
    or(...arguments),
    not(and(...arguments))
  );
}
