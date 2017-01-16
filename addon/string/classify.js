import Ember from 'ember';
import { normalizeString } from './-utils';

const {
  String: { classify }
} = Ember;

export default normalizeString(classify);
