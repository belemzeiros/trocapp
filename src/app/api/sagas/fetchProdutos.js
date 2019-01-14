import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import actionsProdutos, {
  actionGetProdutosSuccess,
  actionGetProdutosFail,
} from '../actions/produtos';

export const getProdutos = () => axios.get('/produtos');

export function* fetchProdutos() {
  try {
    const { data } = yield call(getProdutos);
    yield put(actionGetProdutosSuccess(data));
  } catch (error) {
    yield put(actionGetProdutosFail(error.message));
  }
}

export default function* watch() {
  yield takeLatest(actionsProdutos.PRODUTOS_GET, fetchProdutos);
}
