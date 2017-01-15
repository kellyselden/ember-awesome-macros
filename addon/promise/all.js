import RSVP from 'rsvp';
import { resolveKeys } from '../-utils';

const { all } = RSVP;

export default resolveKeys((...values) => all(values));
