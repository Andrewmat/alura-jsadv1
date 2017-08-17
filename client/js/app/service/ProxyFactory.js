'use strict';

export class ProxyFactory {
  static create(obj, {
      props: propsToIntercept,
      before = () => {},
      after = () => {}
  }) {
    const intercept = (customFunc) => {
      return (target) => {
        before(target);
        var ret = customFunc();
        after(target);
        return ret;
      }
    };
    return new Proxy(obj, {
      get(target, prop, proxy) {
        if (ProxyFactory._isFunction(target[prop]) && propsToIntercept.includes(prop)) {
          // if property is function and has to be intercepted
          return function() {
            return intercept(() => Reflect.apply(target[prop], target, arguments))(target);
            return ret;
          }
        } else if (propsToIntercept.includes(prop)) {
          // if property is not function but has to be intercepted
          return intercept(() => Reflect.get(target, prop, proxy))(target);
        } else {
          // if property should not be intercepted
          return Reflect.get(target, prop, proxy);
        }
      },
      set(target, prop, value, proxy) {
        const setFunc = () => Reflect.set(target, prop, value, proxy);
        if (propsToIntercept.includes(prop)) {
          // if property should be intercepted
          return intercept(setFunc)(target);
        } else {
          // if property should not be intercepted
          return setFunc();
        }
      }
    })
  }

  static _isFunction(value) {
    return typeof value === 'function';
  }
}