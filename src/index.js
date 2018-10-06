import Automovel from './componentes/Automovel';

export const criarCarro = (automovel) => {
  const marca = document.createElement('li');
  const textnode = document.createTextNode(`Marcas: ${automovel.verModelo()} e ${automovel.verModelo()}`);
  marca.appendChild(textnode);

  document.getElementById('mylist').appendChild(marca);
};

export const imprirDados = (automovel) => {
  const textAutoLigado = `${automovel.verModelo()} está ligado? ${(automovel.estaLigado() ? 'Sim' : 'Não')}`;

  const elementoLi = document.createElement('li');
  const texto = document.createTextNode(textAutoLigado);
  elementoLi.appendChild(texto);
  document.getElementById('motorLigado').appendChild(elementoLi);
};

export const ligarCarro = (automovel, chave) => {
  automovel.ligarMotor(chave);
};

const modelos = ['Uno', 'HB20', 'Gol', 'Lifan', 'Civic'];

modelos.forEach((modelo, indice) => {
  const automovel = new Automovel(modelo, 'v2');
  automovel.ligarMotor({
    segredo: `v${indice}`,
  });
  imprirDados(automovel);
});

window.automovel = {
  criarCarro,
  ligarCarro,
};

export default {
  criarCarro,
  ligarCarro,
};
