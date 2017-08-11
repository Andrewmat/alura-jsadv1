
class GenericView {

  constructor(elem) {
    this._elemento = elem;
  }
  update(model) {
    this._elemento.innerHTML = this.template(model);
  }

  template(model) {
    throw new Error('Metodo template deve ser implementado');
  }
}