import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import createSaga, { END } from 'redux-saga';

import reducers from '@/api/reducers';
import rootSaga from '@/api/sagas';

export const runAllSagas = store => {
  store.dispatch(END);
  return store.saga;
};

export default () => {
  const saga = createSaga();
  const store = createStore(
    combineReducers(reducers),
    fromJS({}),
    applyMiddleware(saga)
  );

  store.saga = saga.run(rootSaga);

  return store;
};
