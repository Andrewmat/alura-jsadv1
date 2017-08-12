
class NegociacaoService {

  fromWeek(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/negociacoes/semana');
    xhr.onreadystatechange = (e) => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let negociacoes = JSON.parse(xhr.responseText)
            .map(obj => new Negociacao(
                new Date(obj.data),
                obj.quantidade,
                obj.valor
            ));
          callback(null, negociacoes);
        } else {
          callback(xhr.responseText);
        }
      }
    }
    xhr.send();
  }
}