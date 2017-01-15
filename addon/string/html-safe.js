import Ember from 'ember';
import { normalizeString } from './-utils';

const {
  String: { htmlSafe }
} = Ember;

export default function(key) {
  return normalizeString(key, htmlSafe);
}
