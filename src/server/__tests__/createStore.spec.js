import { END } from 'redux-saga';
import createStore, { runAllSagas } from '../createStore';

describe('createStore', () => {
  it("should call redux's createStore", () => {
    const store = createStore();
    expect(store).toMatchSnapshot();
  });

  it('should call runAllSagas', () => {
    const store = {
      dispatch: jest.fn(),
      saga: jest.fn(),
    };
    const result = runAllSagas(store);
    expect(store.dispatch).toBeCalledWith(END);
    expect(result).toEqual(store.saga);
  });
});
