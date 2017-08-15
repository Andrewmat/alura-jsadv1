'use strict';

class Negociacao {
  constructor(data, quantidade, valor) {
    this._data = new Date(data);
    this._quantidade = parseInt(quantidade);
    this._valor = parseFloat(valor);
    Object.freeze(this);
  }

  get data() {
    return new Date(this._data.getTime());
  }

  get quantidade() {
    return  this._quantidade;
  }

  get valor() {
    return  this._valor;
  }

  get volume() {
    return this.quantidade * this.valor;
  }
}

const negociacao = (data, quantidade, valor) => {
  return {
    data,
    quantidade,
    valor,
    get volume() {
      return quantidade * valor;
    }
  };
}