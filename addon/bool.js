import lazyCurriedComputed from 'ember-macro-helpers/lazy-curried-computed';

export default lazyCurriedComputed((get, key) => !!get(key));
