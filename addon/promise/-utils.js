import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';
import { resolve } from 'rsvp';
import { curriedComputed } from 'ember-macro-helpers';

export function wrapPromiseProxy(Proxy) {
  let PromiseProxy = Proxy.extend(PromiseProxyMixin);

  return curriedComputed(promise => {
    if (promise === undefined) {
      promise = resolve(undefined);
    }

    return PromiseProxy.create({
      promise
    });
  });
}
