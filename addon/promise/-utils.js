import Ember from 'ember';
import RSVP from 'rsvp';
import curriedComputed from 'ember-macro-helpers/curried-computed';

const { PromiseProxyMixin } = Ember;
const { resolve } = RSVP;

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
