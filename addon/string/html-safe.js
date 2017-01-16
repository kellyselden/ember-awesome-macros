import Ember from 'ember';
import { normalizeString } from './-utils';

const {
  String: { htmlSafe }
} = Ember;

export default normalizeString(htmlSafe);
