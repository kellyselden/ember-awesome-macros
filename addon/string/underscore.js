import Ember from 'ember';
import { normalizeString } from './-utils';

const {
  String: { underscore }
} = Ember;

export default normalizeString(underscore);
