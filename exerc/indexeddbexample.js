var openRequest = indexedDB.open('aluraframe', 3);
var conn;
openRequest.onupgradeneeded = e => {
  conn = e.target.result;
  if (conn.objectStoreNames.contains('negociacoes')) {
    conn.deleteObjectStore('negociacoes');
  }
  conn.createObjectStore('negociacoes', {
    autoIncrement: true
  });
};
openRequest.onsuccess = e => {
  conn = e.target.result;
};
openRequest.onerror = e => {
  console.log(e.target.error.message);
};

const adiciona = () => {
  let transaction = conn.transaction(['negociacoes'], 'readwrite');
  let store = transaction.objectStore('negociacoes');
  let negociacao = new Negociacao(new Date(), 1, 200);
  let request = store.add(negociacao);
  request.onsuccess = () => {
    console.log('Negociação incluída com sucesso');
  }
  request.onerror = () => {
    console.error('Não foi possível incluir a negociação');
  }
}

const listar = () => {
  let transaction = conn.transaction(['negociacoes'], 'readwrite');
  let store = transaction.objectStore('negociacoes');
  let cursor = store.openCursor();

  let dbneg = [];
  cursor.onsuccess = e => {
    let atual = e.target.result;
    if (atual) {
      let dbdata = atual.value;
      dbneg.push(new Negociacao(
        dbdata._data,
        dbdata._quantidade,
        dbdata._valor
      ));
      atual.continue();
    } else {
      console.log(dbneg);
    }
  }
  cursor.onerror = e => {
    console.log('chegou2')
    console.error(e.target.error.message);
  }
};