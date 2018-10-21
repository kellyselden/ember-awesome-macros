import and from './and';
import nand from './nand';
import or from './or';

export default function() {
  return and(
    or(...arguments),
    nand(...arguments)
  );
}
