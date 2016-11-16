import Ember from 'ember';
import { resolveKeys } from './utils';

const {
  A: newArray
} = Ember;

export default function(...keys) {
  return resolveKeys(...keys, (...values) => newArray(values));
}
