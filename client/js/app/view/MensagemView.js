'use strict';
import { GenericView } from './GenericView';

export class MensagemView extends GenericView {

  template(model) {
    return `<p class="alert alert-info${model && model.texto ? '' : ' hide'}">
      ${model ? model.texto : ''}
    </p>`;
  }
}