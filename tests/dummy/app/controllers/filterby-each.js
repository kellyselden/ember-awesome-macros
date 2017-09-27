import Controller from '@ember/controller';
import EmberObject from '@ember/object';
import raw from 'ember-macro-helpers/raw';
import { filterBy, first } from 'ember-awesome-macros/array';

export default Controller.extend({
  data: [
    EmberObject.create({ filter: 0, label: '1' }),
    EmberObject.create({ filter: 1, label: '2' }),
    EmberObject.create({ filter: 1, label: '3' })
  ],

  filteredData1: first(filterBy('data', raw('filter'), 1)),
  filteredData2: first(filterBy('data.@each.filter', raw('filter'), 1)),
  filter3: filterBy('data', raw('filter'), 1),
  filteredData3: first('filter3'),

  actions: {
    test() {
      this.data[0].set('filter', 1);
    }
  }
});
