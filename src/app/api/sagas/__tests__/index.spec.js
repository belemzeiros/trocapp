import { all } from 'redux-saga/effects';
import rootSaga from '../';

describe('rootSaga', () => {
  it('should import all sagas', () => {
    const iterator = rootSaga();
    expect(iterator.next().value).toEqual(all([]));
  });
});
