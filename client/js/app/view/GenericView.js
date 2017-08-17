'use strict';

export class GenericView {

  constructor(elem) {
    this._elemento = elem;
  }
  update(model) {
    this._elemento.innerHTML = this.template(model);
  }

  template(model) {
    throw new Error('Metodo template deve ser implementado');
  }

  addEventListener(eventType, selector, listener) {
    this._elemento.addEventListener(eventType, e => {
      let trg = e.target;
      if (!selector || trg.matches(selector)) {
        listener(trg, e);
      }
    })
  }
}