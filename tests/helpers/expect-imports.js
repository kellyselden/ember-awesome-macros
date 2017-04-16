// helps prevent forgetting to test a new import
export default function(assert, obj) {
  assert.expect(Object.getOwnPropertyNames(obj).filter(p => p !== 'default').length);
}
