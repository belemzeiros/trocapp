import { getNome, getIdade } from './util';

const getUsuario = () => {
  console.log(`Nome: ${getNome()} \nIdade: ${getIdade()}`);
};

window.getUsuario = getUsuario;
