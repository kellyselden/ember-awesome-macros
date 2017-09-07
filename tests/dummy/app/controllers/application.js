import Controller from '@ember/controller';
import EmberObject, { set } from '@ember/object';
import { A as emberA } from '@ember/array';
import { objectAt } from 'ember-awesome-macros/array';
import { getBy, raw } from 'ember-awesome-macros';

export default Controller.extend({
  model: emberA([
    EmberObject.create({
      testProp: 'test val 1'
    }),
    EmberObject.create({
      testProp: 'test val 2'
    })
  ]),
  index: 0,

  computed: getBy(
    objectAt('model', 'index'),
    raw('testProp')
  ),

  actions: {
    update() {
      set(this, 'index', 1);
    }
  }
});
