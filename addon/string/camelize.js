import Ember from 'ember';
import { normalizeString } from './-utils';

const {
  String: { camelize }
} = Ember;

export default function(key) {
  return normalizeString(key, camelize);
}
