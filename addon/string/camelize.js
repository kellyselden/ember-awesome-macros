import Ember from 'ember';
import { normalizeString } from './-utils';

const {
  String: { camelize }
} = Ember;

export default normalizeString(camelize);
