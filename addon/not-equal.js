import { not, eq } from '.';

export default function() {
  return not(eq(...arguments));
}
