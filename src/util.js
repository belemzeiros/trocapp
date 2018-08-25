const likes = [];

// Função nominal void
function naogostei () {
  likes.pop();
}

//função anônima void
const gostei = function() {
  likes.push(1);
};

exports.usuario = {
  nome: "Janderson",
  idade: 28,
  endereco: {
    logradouro: "Avenida Industrial",
    numero: 1580,
    complemento: "AP 17 Torre C"
  },
  gostei: gostei,
  naogostei: naogostei,
  likes: function () {
    return likes.length;
  }
}
