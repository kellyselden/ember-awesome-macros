import RSVP from 'rsvp';
import { resolveKeys } from '../utils';
import { deconstructArgs, reduceValues } from '../hash';

const { hash } = RSVP;

export default function(...args) {
  let { hashKeys, hashValues } = deconstructArgs(args);
  return resolveKeys(hashValues, (...newValues) => {
    let newHash = reduceValues(hashKeys, newValues);
    return hash(newHash);
  });
}
