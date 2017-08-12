
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

  sort({prop, reverse}) {
    this._negociacoes = this._negociacoes.sort((n1, n2) => {
      if (isNaN(n1[prop] - n2[prop])) {
        return 0;
      }
      if (reverse) {
        return n1[prop] - n2[prop];
      } else {
        return n2[prop] - n1[prop];
      }
    });
    return this;
  }

  erase() {
    this._negociacoes = [];
    return this;
  }

  volumeTotal() {
    return this._negociacoes.reduce((s, n) => s + n.volume, 0);
  }
}
