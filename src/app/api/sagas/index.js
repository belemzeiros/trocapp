import { all, fork } from 'redux-saga/effects';
import watchProdutos from './fetchProdutos';

function* rootSaga() {
  yield all([fork(watchProdutos)]);
}

export default rootSaga;
