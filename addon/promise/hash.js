import RSVP from 'rsvp';
import curriedComputed from 'ember-macro-helpers/curried-computed';
import { deconstructArgs, reduceValues } from '../hash';

const { hash } = RSVP;

export default function(...args) {
  let { hashKeys, hashValues } = deconstructArgs(args);
  return curriedComputed((...newValues) => {
    let newHash = reduceValues(hashKeys, newValues);
    return hash(newHash);
  })(...hashValues);
}
