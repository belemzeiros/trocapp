import { fromJS } from 'immutable';
import error from '../error';

describe('test error reducer', () => {
  const action = {
    payload: '',
    type: '@@react-rocks',
  };

  const errorAction = {
    payload: {
      error: {
        message: 'Um erro foi encontrado',
        stack: 'stack',
      },
    },
    type: 'CONNECTION_ERROR',
  };

  const initialState = fromJS({
    message: null,
  });

  const errorState = fromJS(errorAction.payload.error);

  it('error reducer should return a Immutable Map', () => {
    expect(error(undefined, action)).toEqualImmutable(initialState);
  });

  it('error reducer should return a Immutable Map when passed action.type with ERROR', () => {
    expect(error(undefined, errorAction)).toEqualImmutable(errorState);
  });
});
