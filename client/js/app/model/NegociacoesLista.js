
class NegociacoesLista {
  constructor() {
    this._negociacoes = [];
  }

  add(neg) {
    this._negociacoes.push(neg);
  }

  get negociacoes() {
    return [].concat(this._negociacoes);
  }

  erase() {
    this._negociacoes = [];
  }

  volumeTotal() {
    return this._negociacoes.reduce((s, n) => s + n.volume, 0);
  }
}
