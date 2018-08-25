// Fortemente tipado vs fracamente tipado
// O JavaScript é fracamente tipado, ou seja, define os tipos implicitamente
var camelCase;
let variavelES6 = 1;
const constanteES6 = 1;

// Array



//Booleano
//Numeros > 0 && numeros < 0 são verdadeiro
//Zero é falso
let verdadeiro = true;
verdadeiro = 'um texto qualquer';
verdadeiro = 123;
verdadeiro = -1;

let falso = false;
falso = '';
falso = 0;

let flutuante = 12.1;

console.log(!!falso)

// Operadores lógicos
// && => and, E, (condicao && condicao)
// Só é verdadeiro se todas condições forem verdadeiras

// || => or, OU, (condicao || condicao)
// Só falso se todas as condições forem falsas

// ! => not, Negação (!condicao)
// Inverte o valor booleando da condição

//Condicionais
//SE verdadeira ENTAO faz algo
//SENAO faz outra coisa
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

for (var i = 0; i < 15; i++) {
  console.log('I:',  i);
}

for (let i = 0; i < 15; i++) {
  console.log('I:',  i);
}

let j = 0;
while (j < 15) {
  console.log('while: ', j);
  j++;
}
