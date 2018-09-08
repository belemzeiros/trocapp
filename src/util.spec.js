const util = require('./util');
// O import from precisa do babel configurado
// import util from './util';
const { usuario, gostei, getNome } = util;
const { likes } = usuario;

describe('Util', () => {
  test('Deveria incrementar um like quando chamar a função gostei', () => {
    const likesAntes = likes();
    gostei();
    const likesDepois = likes();
    expect(likesDepois).toBe(likesAntes + 1);
  });
});

describe('Util', () => {
  test('Deve exiber o nome', () => {
    const nome = getNome();
    expect(nome).toBe('Charles');
  });
});
