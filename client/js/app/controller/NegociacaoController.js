'use strict';

class NegociacaoController {

  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQtd = $('#quantidade');
    this._inputValor = $('#valor');

    this._negociacoes = new Bind(
        new NegociacoesLista(),
        new NegociacoesView($('#negociacoes-view')),
        'add', 'erase', 'sort'
    );

    this._mensagem = new Bind(
      new Mensagem(''),
      new MensagemView($('#mensagem-view')),
      'texto'
    );

    this._sortConfig = {
      prop: 'data',
      reverse: false
    };

    DBConnectionFactory
      .getInstance()
      .then(connection => new NegociacaoDAO(connection).getAll())
      .then(list =>
        list.forEach(n =>
          this._negociacoes.add(n)
        )
      );
  }

  adiciona(event) {
    event.preventDefault();
    let novaNegociacao = this._buildNegociacao();
    DBConnectionFactory.getInstance()
      .then(connection => new NegociacaoDAO(connection).insert(novaNegociacao))
      .then(() => {
        this._negociacoes.add(novaNegociacao);
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this.resetar();
      })
      .catch(err => this._mensagem.texto = err);
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
    negociacaoService.requestAll()
      .then(neg => {
        DBConnectionFactory.getInstance()
          .then(connection => new NegociacaoDAO(connection))
          .then(dao => {
            neg.forEach(n =>
              dao.insert(n)
                .then(() => this._negociacoes.add(n))
                .catch(e => {throw e})
            );
          })
      })
      .then(() => {
        this._mensagem.texto = 'Negociações importadas com sucesso';
      })
      .catch(err => {
        this._mensagem.texto = err.message;
      });
  }

  erase() {
    DBConnectionFactory
      .getInstance()
      .then(connection => new NegociacaoDAO(connection).clear())
      .then(message => {
        this._negociacoes.erase();
        this._mensagem.texto = message;
      })
      .catch(err => this._mensagem.texto = err);
  }

  sort(prop) {
    if (this._sortConfig.prop === prop) {
      this._sortConfig.reverse = !this._sortConfig.reverse;
    } else {
      this._sortConfig.prop = prop;
      this._sortConfig.reverse = false;
    }
    this._negociacoes.sort(this._sortConfig);
  }

  resetar() {
    this._inputData.value = '';
    this._inputQtd.value = 1
    this._inputValor.value = 0;
    this._inputData.focus();
  }
}