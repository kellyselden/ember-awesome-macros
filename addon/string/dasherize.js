import Ember from 'ember';
import { normalizeString } from './-utils';

const {
  String: { dasherize }
} = Ember;

export default normalizeString(dasherize);
