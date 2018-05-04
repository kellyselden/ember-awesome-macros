'use strict';

const writeFile = require('broccoli-file-creator');
const mergeTrees = require('broccoli-merge-trees');
const dasherize = require('ember-cli-string-utils').dasherize;

function addMath(trees) {
  let index = '';

  Object.getOwnPropertyNames(Math).forEach(key => {
    let func = Math[key];
    if (typeof func === 'function' && func.length) {
      let dasherized = dasherize(key);
      index += `export { default as ${key} } from './${dasherized}';`;
      trees.push(writeFile(`math/${dasherized}.js`, `
        import curriedComputed from 'ember-macro-helpers/curried-computed';

        export default curriedComputed(Math.${key});
      `));
    }
  });

  trees.push(writeFile('math/index.js', index));
}

module.exports = {
  name: 'ember-awesome-macros',

  treeForAddon(tree) {
    let trees = [tree];

    addMath(trees);

    tree = mergeTrees(trees);

    return this._super.treeForAddon.call(this, tree);
  }
};
