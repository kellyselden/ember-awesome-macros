import Ember from 'ember';
import RSVP from 'rsvp';
import { resolveKeys } from './utils';

const {
  ArrayProxy,
  PromiseProxyMixin
} = Ember;

const { resolve } = RSVP;

const PromiseArray = ArrayProxy.extend(PromiseProxyMixin);

export default function(key) {
  let shouldInvoke = typeof key === 'function';

  return resolveKeys(key, function(value) {
    let promise;
    if (shouldInvoke) {
      promise = key.call(this);
    } else {
      promise = value;
    }

    if (promise === undefined) {
      promise = resolve(undefined);
    }

    return PromiseArray.create({
      promise
    });
  });
}
