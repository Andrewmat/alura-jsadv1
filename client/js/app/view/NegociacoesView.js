'use strict';

class NegociacoesView extends GenericView {

  template(model) {
    return `
      <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th onclick="negociacaoController.sort('data')">DATA</th>
                <th onclick="negociacaoController.sort('quantidade')">QUANTIDADE</th>
                <th onclick="negociacaoController.sort('valor')">VALOR</th>
                <th onclick="negociacaoController.sort('volume')">VOLUME</th>
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