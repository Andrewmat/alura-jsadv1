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

  insert(negociacao) {
    return DBConnectionFactory.getInstance()
    .then(connection => new NegociacaoDAO(connection).insert(negociacao))
    .then(() => 'Negociação adicionada com sucesso')
    .catch(err => {
      console.error(err);
      throw new Error('Não foi possível adicionar negociação');
    });
  }

  list() {
    return DBConnectionFactory
      .getInstance()
      .then(connection => new NegociacaoDAO(connection).getAll())
      .catch(err => {
        console.error(err);
        throw new Error('Não foi possível obter negociações');
      })
  }

  erase() {
    return DBConnectionFactory
      .getInstance()
      .then(connection => new NegociacaoDAO(connection).clear())
      .then(() => 'Negociações limpas com sucesso')
      .catch(err => {
        console.error(err);
        throw new Error('Não foi possível limpar as negociações');
      });
  }

  import(currList) {
    return this.requestAll()
      .then(negImport =>
        negImport.filter(ni =>
          !currList.some(nl => nl.equals(ni))
        )
      )
      .then(list =>
        DBConnectionFactory.getInstance()
          .then(connection => new NegociacaoDAO(connection))
          .then(dao => Promise.all(list.map(n => dao.insert(n))))
      )
      .catch(err => {
        console.error(err);
        throw new Error('Não foi possível importar negociações');
      });
  }

  _request(endpoint) {
    return HttpService
      .get(endpoint)
      .then(response => response
        .map(obj => new Negociacao(
            new Date(obj.data),
            obj.quantidade,
            obj.valor
        ))
      )
      .catch(err => {
        console.error(err);
        throw new Error('Erro ao importar negociações');
      });
  }
}