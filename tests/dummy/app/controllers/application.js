import Ember from 'ember';
import { ceil } from 'ember-awesome-macros/math';
import floor from 'ember-awesome-macros/math/floor';

export default Ember.Controller.extend({
  ceil: ceil(0.5),
  floor: floor(1.5)
});
