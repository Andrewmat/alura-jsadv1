
class NegociacaoController {

  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQtd = $('#quantidade');
    this._inputValor = $('#valor');
    this._negociacoes = new ListaNegociacoes();
    Object.freeze(this);
  }

  adiciona(event) {
    event.preventDefault();
    let negociacao = buildNegociacao();
    this._negociacoes.add(negociacao);
    this.resetar();
  }

  _buildNegociacao() {
    return new Negociacao(
      DateHelper.asDate(this._inputData.value),
      this._inputQtd.value,
      this._inputValor.value
    );
  }

  resetar() {
    this._inputData.value = '';
    this._inputQtd.value = 1
    this._inputValor.value = 0;
    this._inputData.focus();
  }
}