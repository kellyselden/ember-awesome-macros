import Ember from 'ember';
import { normalizeString } from './-utils';

const {
  String: { capitalize }
} = Ember;

export default normalizeString(capitalize);
