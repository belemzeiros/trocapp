const util = require('./util');
// Precisa do babel configurado
// import util from './util';
// Fortemente tipado vs fracamente tipado
// O JavaScript é fracamente tipado, ou seja, define os tipos implicitamente
let indefinido; // undefined
let camelCase;
const variavelES6 = 1;
const constanteES6 = 1;

// Array
const arranjo = [1, 2, 10];
const arranjo2 = [variavelES6, 2, 10];

// Matriz
const matriz = [];
matriz[0] = ['Linha 1, Coluna 1', 'Linha 1, Coluna 2', 'Linha 1, Coluna 3'];
matriz[1] = ['Linha 2, Coluna 1', 'Linha 2, Coluna 2', 'Linha 2, Coluna 3'];

// Funções


/*
console.log(matriz[0][0]);
console.log(matriz[0][1]);
console.log(matriz[0][2]);
console.log(matriz[1][0]);
console.log(matriz[1][1]);
console.log(matriz[1][2]);

console.log(arranjo[0]);
console.log(arranjo[1]);
console.log(arranjo[2]);

console.log(arranjo2[0]);
console.log(arranjo2[1]);
console.log(arranjo2[2]);

console.log(arranjo.length)
console.log(arranjo2.length)
*/


// Booleano
// Numeros > 0 && numeros < 0 são verdadeiro
// Zero é falso
let verdadeiro = true;
verdadeiro = 'um texto qualquer';
verdadeiro = 123;
verdadeiro = -1;

let falso = false;
falso = '';
falso = 0;

const flutuante = 12.1;

console.log(!!falso);

// Operadores lógicos
// && => and, E, (condicao && condicao)
// Só é verdadeiro se todas condições forem verdadeiras

// || => or, OU, (condicao || condicao)
// Só falso se todas as condições forem falsas

// ! => not, Negação (!condicao)
// Inverte o valor booleando da condição

// Condicionais
// SE verdadeira ENTAO faz algo
// SENAO faz outra coisa
if (falso) {
  console.log(verdadeiro);
} else if (1 < 2) {
  console.log('outra coisa');
} else {
  console.log('outra coisa');
}

switch (variavelES6) {
  case 1:
    console.log('faz algo');
    break;
  case 2:
    console.log('faz algo');
    break;
  default:
    console.log('faz algo');
}

// Laços de repetição
// Executar uma instrução enquanto uma condição for verdadeira,

for (let indice = 0; indice < arranjo.length; indice++) {
  console.log('Arranjo na posição:', indice);
  console.log(arranjo[indice]);
}

for (let i = 0; i < 15; i++) {
  console.log('I:', i);
}

for (let linha = 0; linha < matriz.length; linha++) {
  const qtdColunas = matriz[linha].length;
  for (let coluna = 0; coluna < qtdColunas; coluna++) {
    console.log(
      'Linha ', linha, 'coluna ', coluna,
    );
  }
}

// Percorre e retorna as chaves
for (const valor in arranjo) {
  console.log('For In: ', valor);
}

// Percorre e retorna os valores
for (const valor of arranjo) {
  console.log('For Of: ', valor);
}

arranjo.forEach((valor, indice) => {
  console.log(
    'Arranjo ForEach: ', valor, ' Indice ', indice,
  );
});

// Função anônima
const percorreColunas = function (linha, indiceLinha) {
  // escopo/contexto da função está entre as chaves
  linha.forEach((coluna, indiceColuna) => {
    console.log(
      'Linha: ', indiceLinha, ' Coluna: ', indiceColuna,
    );
  });
};

matriz.forEach(percorreColunas);

let j = 0;
while (j < 15) {
  console.log('while: ', j);
  j++;
}

console.log(util.usuario.nome);

console.log(util.usuario.likes());
util.usuario.gostei();
console.log(util.usuario.likes());

const p1 = 'Parte 1';
console.log(`${p1} parte 2`);

console.log(`${p1}${' parte 2'}`);

// babel js: tradutor de código
// eslint: boas práticas de dev
// Jest: testes unitários

// Gerenciador de dependência
// NodeJS 10.9.0 || 8.x
// NPM
