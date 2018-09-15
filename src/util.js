export const likes = [];

// Função nominal void
export function naogostei() {
  likes.pop();
}

// função anônima void
export const gostei = () => {
  likes.push(1);
};

export const usuario = {
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

export const getNome = () => usuario.nome;

export const getIdade = () => usuario.idade;

// module.exports = {
//   likes,
//   naogostei,
//   gostei,
//   usuario,
//   getNome,
//   getIdade,
// };

// Precisa do babel configurado
export default {
  likes,
  naogostei,
  gostei,
  usuario,
  getNome,
  getIdade,
};
