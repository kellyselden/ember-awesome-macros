import Ember from 'ember';
import ArrayProxy from 'ember-controller/proxy';
import { wrapPromiseProxy } from './-utils';

const { PromiseProxyMixin } = Ember;

const PromiseArray = ArrayProxy.extend(PromiseProxyMixin);

export default wrapPromiseProxy(PromiseArray);
