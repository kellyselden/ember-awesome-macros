import Ember from 'ember';
import { wrapPromiseProxy } from './-utils';

const { ObjectProxy } = Ember;

export default wrapPromiseProxy(ObjectProxy);
