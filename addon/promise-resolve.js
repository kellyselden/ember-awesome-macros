import RSVP from 'rsvp';
import { resolveKeys } from './utils';

const { resolve } = RSVP;

export default function(key) {
  return resolveKeys(key, resolve);
}
