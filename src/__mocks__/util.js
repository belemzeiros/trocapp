const util = jest.genMockFromModule('../util', () => jest.fn());
export const getNome = jest.fn(() => 'Fulano');
export const getIdade = jest.fn(() => 28);
export const getEndereco = jest.fn(() => ({
  logradouro: 'Avenida Industrial',
  numero: 1580,
  complemento: 'AP 17 Torre C',
}));

util.getNome = getNome;
util.getIdade = getIdade;
util.getEndereco = getEndereco;

export default util;
