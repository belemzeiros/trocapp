// const util = require('../util');
// O import from precisa do babel configurado
import {
  usuario, gostei, getIdade, getNome, naogostei, getEndereco,
} from '../util';
const { likes } = usuario;

describe('Util', () => {
  test('Deveria incrementar um like quando chamar a função gostei', () => {
    const likesAntes = likes();
    gostei();
    const likesDepois = likes();
    expect(likesDepois).toBe(likesAntes + 1);
  });
  test('Deveria incrementar um like quando chamar a função gostei', () => {
    const likesAntes = likes();
    naogostei();
    const likesDepois = likes();
    expect(likesDepois).toBe(likesAntes - 1);
  });
  test('Deveria informar a idade correta', () => {
    const resultado = getIdade();
    expect(resultado).toBe(28);
  });
  test('Deve exibir o nome', () => {
    const nome = getNome();
    expect(nome).toBe('Charles');
  });
  test('Deve exibir o endereço do usuário', () => {
    const endereco = getEndereco();
    expect(endereco).toMatchObject({});
    expect(endereco).toStrictEqual({
      logradouro: 'Avenida Industrial',
      numero: 1580,
      complemento: 'AP 17 Torre C',
    });
  });
  test('Deve possuir os atributos obrigatorios', () => {
    const endereco = getEndereco();
    expect(endereco).toHaveProperty('logradouro');
    expect(endereco).toHaveProperty('numero');
    expect(endereco).toHaveProperty('complemento');
  });
});
