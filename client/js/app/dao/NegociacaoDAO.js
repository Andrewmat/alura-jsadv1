'use strict';

class NegociacaoDAO {
  constructor(connection) {
    this._connection = connection;
    this._store = 'negociacoes';
  }

  insert(negociacao) {
    return new Promise((resolve, reject) => {
      let request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .add(negociacao);
      request.onsuccess = e => {
        resolve(negociacao);
      };
      request.onerror = e => {
        console.error(e.target.error);
        reject('Não foi possível adicionar negociação');
      };
    })
  }

  getAll() {
    return new Promise((resolve, reject) => {
      let negociacoes = [];

      let cursor = this._connection
        .transaction([this._store], 'readonly')
        .objectStore(this._store)
        .openCursor();

      cursor.onsuccess = e => {
        let pointer = e.target.result;
        if (pointer) {
          let obj = pointer.value;
          negociacoes.push(new Negociacao(obj._data, obj._quantidade, obj._valor));
          pointer.continue();
        } else {
          resolve(negociacoes);
        }
      }
      cursor.onerror = e => {
        console.error(e.target.error);
        reject('Não foi possível capturar a lista de negociações');
      }
    })
  }

  clear() {
    return new Promise((resolve, reject) => {
      let request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .clear();

      request.onsuccess = e => resolve('Negociações removidas com sucesso');
      request.onerror = e => {
        console.error(e.target.error);
        reject('Nõa foi possível remover as negociações');
      };
    });
  }

}