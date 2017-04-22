const exclude = [
  '__esModule',
  'default'
];

// helps prevent forgetting to test a new import
export default function(assert, obj) {
  assert.expect(Object.getOwnPropertyNames(obj).filter(p => exclude.indexOf(p) === -1).length);
}
