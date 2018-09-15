import { getNome, getIdade } from './util';

export const getUsuario = () => {
  console.log(`Nome: ${getNome()} \nIdade: ${getIdade()}`);
};

window.getUsuario = getUsuario;

export default {
  getUsuario,
};
