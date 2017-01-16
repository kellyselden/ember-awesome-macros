import Ember from 'ember';
import { normalizeString } from './-utils';

const {
  String: { decamelize }
} = Ember;

export default normalizeString(decamelize);
