
class NegociacoesView extends GenericView {

  template(model) {
    return `
      <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR</th>
                <th>VOLUME</th>
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
            <td>
              ${
                model.negociacoes
                  .reduce((attr, m) => attr += m.volume, 0.0)
              }
            </td>
          </tr>
        </tfoot>
      </table>`;
  }
}