import Ember from 'ember';
import RSVP from 'rsvp';
import { resolveKeys } from '../-utils';

const { PromiseProxyMixin } = Ember;
const { resolve } = RSVP;

export function wrapPromiseProxy(Proxy) {
  let PromiseProxy = Proxy.extend(PromiseProxyMixin);

  return resolveKeys(promise => {
    if (promise === undefined) {
      promise = resolve(undefined);
    }

    return PromiseProxy.create({
      promise
    });
  });
}
