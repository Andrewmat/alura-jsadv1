'use strict';

const DB_NAME = 'aluraframe';
const DB_VERSION = 4;
const STORES = ['negociacoes'];

let connection = null;
let closeConnection = null;

export class DBConnectionFactory {
  constructor() {
    throw new Error('Não é permitido criar instâncias de DBConnectionFactory');
  }

  static getInstance() {
    return new Promise((resolve, reject) => {
      if (connection !== null) {
        resolve(connection);
        return;
      }
      DBConnectionFactory._createConnection(resolve, reject);

    });
  }

  static closeConnection() {
    if (connection) {
      closeConnection();
    }
    connection = null;
  }

  static _createConnection(resolve, reject) {
    let request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = e => {
      DBConnectionFactory._createStores(e.target.result);
    }
    request.onsuccess = e => {
      connection = e.target.result;
      closeConnection = connection.close.bind(connection);
      connection.close = function() {
        throw new Error('O objeto de conexão não pode ser fechado diretamente. Use DBConnectionFactory.closeConnection()');
      }
      resolve(connection);
    }
    request.onerror = e => {
      console.error(e.target.error);
      reject(e.target.error.message)
    }
  }

  static _createStores(connection) {
    STORES.forEach(store => {
      if (connection.objectStoreNames.contains(store)) {
        connection.deleteObjectStore(store);
      }
      connection.createObjectStore(store, {autoIncrement: true});
    });
  }
}