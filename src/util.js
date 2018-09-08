const likes = [];

// Função nominal void
function naogostei() {
  likes.pop();
}

// função anônima void
const gostei = function () {
  likes.push(1);
};

const usuario = {
  nome: 'Charles',
  idade: 28,
  endereco: {
    logradouro: 'Avenida Industrial',
    numero: 1580,
    complemento: 'AP 17 Torre C',
  },
  gostei,
  naogostei,
  likes() {
    return likes.length;
  },
};

const getNome = () => usuario.nome;

const getIdade = () => usuario.idade;

module.exports = {
  likes,
  naogostei,
  gostei,
  usuario,
  getNome,
  getIdade,
};

// Precisa do babel configurado
// export default {
//   likes,
//   naogostei,
//   gostei,
//   usuario,
// };
