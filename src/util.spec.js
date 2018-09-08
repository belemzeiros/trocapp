const util = require('./util');
// O import from precisa do babel configurado
// import util from './util';
const { usuario, gostei, getIdade } = util;
const { likes } = usuario;

describe('Util', () => {
  test('Deveria incrementar um like quando chamar a função gostei', () => {
    const likesAntes = likes();
    gostei();
    const likesDepois = likes();
    expect(likesDepois).toBe(likesAntes + 1);
  });
  test('Deveria informar a idade correta', () => {
    const resultado = getIdade();
    expect(resultado).toBe(28);
  });
});
