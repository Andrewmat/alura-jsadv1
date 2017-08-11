
class Mensagem {
  constructor(texto = '', onUpdate = (() => {})) {
    this._texto = texto;
    this._onUpdate = onUpdate;
  }

  get texto() {
    return this._texto;
  }

  set texto(texto) {
    this._onUpdate(this);
    this._texto = texto
  }
}