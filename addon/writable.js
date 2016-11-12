import computed from './computed';

export default function(getter, setterCallback) {
  let newCallback = {
    get(val) { return val; }
  };

  if (setterCallback) {
    if (setterCallback.set) {
      newCallback.set = setterCallback.set;
    } else {
      newCallback.set = function() {
        return setterCallback.apply(this, arguments);
      };
    }
  }

  return computed(getter, newCallback);
}
