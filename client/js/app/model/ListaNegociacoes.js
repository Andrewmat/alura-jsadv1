
class ListaNegociacoes {
  constructor() {
    this._negociacoes = [];
    Object.freeze(this);
  }

  add(neg) {
    this._negociacoes.push(neg);
  }

  get negociacoes() {
    return [].concat(this._negociacoes);
  }
}
