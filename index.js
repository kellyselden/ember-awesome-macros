/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-awesome-macros',

  included(app) {
    this._super.included.apply(this, arguments);

    let plugin = require('babel-plugin-fake-import-specifiers');
    plugin.baseDir = function() {
      return __dirname;
    };

    let options = app.options = app.options || {};
    let babel = options.babel = options.babel || {};
    babel.plugins = babel.plugins || [];
    babel.plugins.push(plugin);
    babel.extra = babel.extra || {};
    babel.extra['fake-import-specifiers'] = [
      'ember-awesome-macros/math'
    ];
  }
};
