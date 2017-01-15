import RSVP from 'rsvp';
import { resolveKeys } from '../-utils';

const { resolve } = RSVP;

export function wrapPromiseProxy(key, PromiseProxy) {
  return resolveKeys(promise => {
    if (promise === undefined) {
      promise = resolve(undefined);
    }

    return PromiseProxy.create({
      promise
    });
  })(key);
}
