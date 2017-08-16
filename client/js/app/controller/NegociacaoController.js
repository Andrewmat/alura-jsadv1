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
    this._init();
  }

  _init() {
    new NegociacaoService()
      .list()
      .then(list => {
        list.forEach(n =>
          this._negociacoes.add(n)
        )
        this.resetar();
      });

    setInterval(() => {
      this.import();
    }, 5000);
  }

  adiciona(event) {
    event.preventDefault();
    let novaNegociacao = this._buildNegociacao();
    new NegociacaoService()
      .insert(novaNegociacao)
      .then(msg => {
        this._negociacoes.add(novaNegociacao);
        this._mensagem.texto = msg;
        this.resetar();
      })
      .catch(msg => this._mensagem.texto = msg);
  }

  _buildNegociacao() {
    return new Negociacao(
      DateHelper.asDate(this._inputData.value),
      this._inputQtd.value,
      this._inputValor.value
    );
  }

  import() {
    new NegociacaoService().import(this._negociacoes.negociacoes)
      .then(list => {
        list.forEach(n => {
          this._negociacoes.add(n);
        });
      })
      .catch(err => {
        this._mensagem.texto = err.message;
      });
  }

  erase() {
    new NegociacaoService()
      .erase()
      .then(msg => {
        this._negociacoes.erase();
        this._mensagem.texto = msg;
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