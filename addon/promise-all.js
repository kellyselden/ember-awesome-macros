import RSVP from 'rsvp';
import { resolveKeys } from './utils';

const { all } = RSVP;

export default function(...keys) {
  return resolveKeys(...keys, (...values) => all(values));
}
