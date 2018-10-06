import { getNome, getIdade, getEndereco } from './util';

export const getUsuario = () => {
  const node = document.createElement('li');
  const textnode = document.createTextNode('Fulano, 28, Avenida Industrial 1580 AP 17 Torre C');
  node.appendChild(textnode);
  document.getElementById('mylist').appendChild(node);
};

window.getUsuario = getUsuario;

export default {
  getUsuario,
};
