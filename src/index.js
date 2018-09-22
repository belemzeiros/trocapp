import { getNome, getIdade, getEndereco } from './util';

export const getUsuario = () => {
  const endereco = getEndereco();
  console.log(`Nome: ${getNome()} \nIdade: ${getIdade()} \nEndereco: ${endereco.logradouro} ${endereco.numero} ${endereco.complemento}`);
};

window.getUsuario = getUsuario;

export default {
  getUsuario,
};
