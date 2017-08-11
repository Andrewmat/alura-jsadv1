class Codigo {
  constructor(cod) {
    if (validaCodigo(cod)) {
      this._valor = cod;
    } else {
      throw new Error('codigo invalido');
    }
  }

  validaCodigo(cod) {
    return /\D{3}-\D{2}-\d{2}/.test(cod);
  }

  get valor() {
    return this._valor;
  }
}