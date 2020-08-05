import SanitizerService from '../SanitizerService';

describe('GetValue', () => {
  it('When element is an array', () => {
    const result = SanitizerService.getValue(['value']);
    expect(result).toEqual(['value']);
  });
  it('When element is an object', () => {
    const mockObject = {
      air: {},
    };
    const result = SanitizerService.getValue(mockObject);
    expect(result).toStrictEqual(mockObject);
  });
  it('When element is not an object or array', () => {
    expect(SanitizerService.getValue(1)).toEqual(1);
  });
});
describe('GetObject', () => {
  it('Should sanitize an ember object', () => {
    const emberObject = {
      _internalModel: {
        _data: {
          _parent: 'model',
          OWNER: true,
          chindren: [
            {
              ages: '30',
              rooms: '30',
            },
          ],
          national: true,
          selectedMonth: null,
          destinyObj: {
            id: 36,
            name: 'Rio de Janeiro - Rio de Janeiro - Brasil',
          },
          isNational: () => this.national,
        },
      },
    };
    const result = SanitizerService.getObject(emberObject);
    expect(result).toStrictEqual({
      chindren: {
        0: {
          ages: '30',
          rooms: '30',
        },
      },
      national: true,
      selectedMonth: {},
      destinyObj: {
        id: 36,
        name: 'Rio de Janeiro - Rio de Janeiro - Brasil',
      },
    });
  });
});
