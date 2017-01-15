import Ember from 'ember';
import { normalizeString } from './-utils';

const {
  String: { dasherize }
} = Ember;

export default function(key) {
  return normalizeString(key, dasherize);
}
