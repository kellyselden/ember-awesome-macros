import Ember from 'ember';
import { resolveKeys } from './utils';

const {
  RSVP: { all }
} = Ember;

export default function(...keys) {
  return resolveKeys(keys, all);
}
