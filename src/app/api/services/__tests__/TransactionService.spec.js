import TransactionService from '../TransactionService';

describe('TransactionService', () => {
  const MathOld = Math;
  const DateOld = global.Date;

  beforeEach(() => {
    Math.random = jest.fn(() => 0.7949995693967171);
    Math.floor = jest.fn(() => 84232);
    global.Date = class MockDate extends DateOld {
      constructor(props) {
        super(props);
        this.mockTime = 1539297891730;
      }

      getTime() {
        return this.mockTime;
      }
    };
  });

  afterEach(() => {
    Math.random = MathOld.random;
    Math.floor = MathOld.floor;
    global.Date = DateOld;
  });

  describe('S4', () => {
    it('should return a randon string with length equal to 4', () => {
      expect(TransactionService.s4()).toEqual('4908');
    });
  });

  describe('NewGuid', () => {
    it('should return an unique identification', () => {
      const result = TransactionService.newGuid();
      expect(result).toEqual(
        '49084908-4908-4908-4908-490849084908-1539297891730'
      );
    });
  });

  describe('ToQueryString', () => {
    it('should convert an object to string with url query string pattern', () => {
      const result = TransactionService.toQueryString({
        chave: 'valor',
      });
      expect(result).toEqual('chave=valor');
    });
    it('when receive an empty param return an empty string', () => {
      const result = TransactionService.toQueryString({});
      expect(result).toEqual('');
    });
  });
});
