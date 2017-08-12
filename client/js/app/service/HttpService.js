
class HttpService {
  static get(url) {
    let xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      xhr.open('GET', url);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            let negociacoes = JSON.parse(xhr.responseText)
              .map(obj => new Negociacao(
                  new Date(obj.data),
                  obj.quantidade,
                  obj.valor
              ));
            resolve(xhr.responseText);
          } else {
            reject(xhr.responseText);
          }
        }
      }
      xhr.send();
    });
  }
}