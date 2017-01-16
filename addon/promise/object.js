import Ember from 'ember';
import { wrapPromiseProxy } from './-utils';

const {
  ObjectProxy,
  PromiseProxyMixin
} = Ember;

const PromiseObject = ObjectProxy.extend(PromiseProxyMixin);

export default wrapPromiseProxy(PromiseObject);
