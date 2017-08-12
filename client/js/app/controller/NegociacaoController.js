
class NegociacaoController {

  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQtd = $('#quantidade');
    this._inputValor = $('#valor');

    this._negociacoes = new Bind(
        new NegociacoesLista(),
        new NegociacoesView($('#negociacoes-view')),
        'add', 'erase'
    );

    this._mensagem = new Bind(
      new Mensagem(''),
      new MensagemView($('#mensagem-view')),
      'texto'
    );

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

  import() {
    let negociacaoService = new NegociacaoService();
    negociacaoService.fromWeek((err, neg) => {
      if (err) {
        this._mensagem.texto = 'Erro ao importar negociações';
        console.error(err);
        return;
      }
      neg.forEach(n => this._negociacoes.add(n));
      this._mensagem.texto = 'Negociações importadas com sucesso';
    });
  }

  resetar() {
    this._inputData.value = '';
    this._inputQtd.value = 1
    this._inputValor.value = 0;
    this._inputData.focus();
  }
}