import { getUsuario } from '../index';
jest.mock('../util');

describe('GetUsuario', () => {
  test('Deveria chamar a funcao console.log', () => {
    console.log = jest.fn();
    expect(console.log).not.toBeCalled();
    getUsuario();
    expect(console.log).toHaveBeenCalledTimes(1);
  });
  test('Deveria passar os dados do usuário ao chamar a funcao console.log', () => {
    console.log = jest.fn();
    expect(console.log).not.toBeCalled();
    getUsuario();
    expect(console.log).toHaveBeenCalledWith('Nome: Fulano \nIdade: 28');
  });
});
