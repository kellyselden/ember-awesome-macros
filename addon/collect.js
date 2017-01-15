import Ember from 'ember';
import { resolveKeys } from './-utils';

const {
  A: newArray
} = Ember;

export default resolveKeys((...values) => newArray(values));
