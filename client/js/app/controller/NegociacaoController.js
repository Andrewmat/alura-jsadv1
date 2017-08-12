
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
    const onError = (err) => { throw new Error(err) };
    Promise.all([
      negociacaoService.requestFromWeek(),
      negociacaoService.requestFrom1WeekBefore(),
      negociacaoService.requestFrom2WeekBefore()
    ]).then(resp => {
      resp
        .reduce((list, neg) => list.concat(neg), [])
        .forEach(n => this._negociacoes.add(n));
      this._mensagem.texto = 'Negociações importadas com sucesso';
    }).catch(err => {
      this._mensagem.texto = err.message;
    });
  }

  resetar() {
    this._inputData.value = '';
    this._inputQtd.value = 1
    this._inputValor.value = 0;
    this._inputData.focus();
  }
}