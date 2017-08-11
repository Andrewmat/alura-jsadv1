
const observe = (obj, {
    context,
    onBefore = () => {},
    onAfter = () => {},
    props: propsToIntercept
  }) => {
  return new Proxy(obj, {
    get(targetObj, accessedProp, proxy) {
      if (typeof targetObj[accessedProp] === 'function' && propsToIntercept.includes(accessedProp)) {
        return function() {
          onBefore.apply(context, [targetObj]);
          var ret = Reflect.apply(targetObj[accessedProp], targetObj, arguments);
          onAfter.apply(context, [targetObj]);
          return ret;
        }
      } else {
        return Reflect.get(targetObj, accessedProp, proxy)
      }
    }
  })
}

class NegociacaoController {

  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQtd = $('#quantidade');
    this._inputValor = $('#valor');

    this._negociacoes = observe(new NegociacoesLista(), {
      context: this,
      props: ['add', 'erase'],
      onAfter: model => {
        this._negociacoesView.update(model);
      }
    });

    this._mensagem = observe(new Mensagem(''), {
      context: this,
      props: ['texto'],
      onAfter: model => {
        this._mensagemView.update(model);
      }
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