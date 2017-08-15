'use strict';

class MensagemView extends GenericView {

  template(model) {
    return `<p class="alert alert-info${model && model.texto ? '' : ' hide'}">
      ${model ? model.texto : ''}
    </p>`;
  }
}