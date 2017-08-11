
class Bind {
  constructor(obj, view, ...props) {
    let proxy = ProxyFactory.create(obj, {
      props,
      after: model => view.update(model)
    });
    view.update(obj);
    return proxy;
  }
}