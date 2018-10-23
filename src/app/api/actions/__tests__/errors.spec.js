import { actions, sagaErrors, mapDispatchToProps } from '../errors';

describe('test reducers', () => {
  it('test sagaErrors', () => {
    const expectedResult = {
      payload: {
        action: 'Error',
        error: 'Error',
      },
      type: 'TROCAPP_SAGA_ERROR',
    };
    const result = sagaErrors('Error', 'Error');
    expect(result).toEqual(expectedResult);
  });

  it('test mapDispatchToProps', () => {
    const dispatchParameters = {
      type: actions.react,
      payload: 'ERROR',
    };
    const spy = jest.fn();
    const { logErrorToStore } = mapDispatchToProps(spy);
    expect(logErrorToStore).toBeInstanceOf(Function);
    logErrorToStore('ERROR');
    expect(spy).toBeCalledWith(dispatchParameters);
  });
});
