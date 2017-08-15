'use strict';

class NegociacaoService {

  requestFromWeek() {
    return this._request('/negociacoes/semana');
  }

  requestFrom1WeekBefore() {
    return this._request('/negociacoes/anterior');
  }
  requestFrom2WeekBefore() {
    return this._request('/negociacoes/retrasada');
  }

  requestAll() {
    return Promise.all([
      this.requestFromWeek(),
      this.requestFrom1WeekBefore(),
      this.requestFrom2WeekBefore()
    ]).then(resp => {
      return resp.reduce((list, neg) => list.concat(neg), []);
    });
  }

  _request(endpoint) {
    return HttpService
      .get(endpoint)
      .then(response => {
        let negociacoes = JSON.parse(response)
        .map(obj => new Negociacao(
            new Date(obj.data),
            obj.quantidade,
            obj.valor
        ));
        return negociacoes;
      })
      .catch(err => {
        console.error(err);
        throw new Error('Erro ao importar negociações');
      });
  }
}