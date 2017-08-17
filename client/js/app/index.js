import { negociacaoController } from './controller/NegociacaoController';

let $ = document.querySelector.bind(document);

$('.form').addEventListener('submit', e => {
  negociacaoController().adiciona(e);
});
$('#btn-erase').addEventListener('click', e => {
  negociacaoController().erase(e);
});