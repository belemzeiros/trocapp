const util = jest.genMockFromModule('../util', () => jest.fn());
export const getNome = jest.fn(() => 'Fulano');
export const getIdade = jest.fn(() => 28);

util.getNome = getNome;
util.getIdade = getIdade;

export default util;
