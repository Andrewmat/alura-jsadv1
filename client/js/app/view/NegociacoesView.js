'use strict';
import { GenericView } from './GenericView';
import { DateHelper } from '../helper/DateHelper';
import { negociacaoController } from '../controller/NegociacaoController';

export class NegociacoesView extends GenericView {

  constructor(elem) {
    super(elem);
    this.addEventListener('click', '[data-sort]', e => {
      let sortAttr = e.getAttribute('data-sort');
      negociacaoController().sort(sortAttr);
    });
  }

  template(model) {
    return `
      <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th data-sort="data">DATA</th>
                <th data-sort="quantidade"">QUANTIDADE</th>
                <th data-sort="valor">VALOR</th>
                <th data-sort="volume">VOLUME</th>
            </tr>
        </thead>

        <tbody>
        </tbody>
          ${
            model.negociacoes.map(n => `
              <tr>
                <td>${DateHelper.asString(n.data)}</td>
                <td>${n.quantidade}</td>
                <td>${n.valor}</td>
                <td>${n.volume}</td>
              </tr>
            `).join('')
          }
        <tfoot>
          <tr>
            <td colspan="3">TOTAL</td>
            <td>${model.volumeTotal()}</td>
          </tr>
        </tfoot>
      </table>`;
  }
}