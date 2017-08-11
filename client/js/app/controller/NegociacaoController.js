
class NegociacaoController {

  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQtd = $('#quantidade');
    this._inputValor = $('#valor');

    this._negociacoes = new NegociacoesLista(model => {
      this._negociacoesView.update(model);
    });
    this._mensagem = new Mensagem('', (model) => {
      this._mensagemView.update(model);
    });


    this._negociacoesView = new NegociacoesView($('#negociacoes-view'));
    this._mensagemView = new MensagemView($('#mensagem-view'));
    Object.freeze(this);
  }

  adiciona(event) {
    event.preventDefault();
    let negociacao = this._buildNegociacao();
    this._negociacoes.add(negociacao);
    this._mensagem.texto = 'Negociação adicionada com sucesso';

    this.resetar();
  }

  _buildNegociacao() {
    return new Negociacao(
      DateHelper.asDate(this._inputData.value),
      this._inputQtd.value,
      this._inputValor.value
    );
  }

  erase() {
    this._negociacoes.erase();
    this._mensagem.texto = 'Lista esvaziada';
  }

  resetar() {
    this._inputData.value = '';
    this._inputQtd.value = 1
    this._inputValor.value = 0;
    this._inputData.focus();
  }
}