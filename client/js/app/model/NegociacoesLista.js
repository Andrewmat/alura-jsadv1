
class NegociacoesLista {
  constructor(onUpdate = (() => {})) {
    this._negociacoes = [];
    this._onUpdate = onUpdate;
  }

  add(neg) {
    this._negociacoes.push(neg);
    this._onUpdate(this);
  }

  get negociacoes() {
    return [].concat(this._negociacoes);
  }

  erase() {
    this._negociacoes = [];
    this._onUpdate(this);
  }
}
