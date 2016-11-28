/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-awesome-macros',

  included: function(app) {
    this._super.included.apply(this, arguments);

    var babel = app.options.babel;
    babel.plugins = babel.plugins || [];
    babel.plugins.push('babel-plugin-fake-import-specifiers');
    babel.extra = babel.extra || {};
    babel.extra['fake-import-specifiers'] = [
      'ember-awesome-macros/math'
    ];
  }
};
