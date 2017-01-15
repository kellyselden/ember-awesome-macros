import RSVP from 'rsvp';
import { resolveKeys } from '../-utils';

const { resolve } = RSVP;

export default function(...keys) {
  return resolveKeys(keys, resolve);
}
