import Ember from 'ember';
import { wrapPromiseProxy } from './utils';

const {
  ArrayProxy,
  PromiseProxyMixin
} = Ember;

const PromiseArray = ArrayProxy.extend(PromiseProxyMixin);

export default function(key) {
  return wrapPromiseProxy(key, PromiseArray);
}
