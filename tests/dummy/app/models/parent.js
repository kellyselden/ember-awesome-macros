import DS from 'ember-data';

export default DS.Model.extend({
  children: DS.hasMany('child', { async: false })
});
