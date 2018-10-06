import { getUsuario } from '../index';
jest.mock('../util');

describe('GetUsuario', () => {
  test('Deveria passar os dados do usuário', () => {
    getUsuario();
    expect(getUsuario()).toHaveBeenCalledWith('Nome: Fulano \nIdade: 28 \nEndereco: Avenida Industrial 1580 AP 17 Torre C');
  });
});
