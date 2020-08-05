import { NAMESPACE } from '../constants';

const PRODUTOS_GET = `${NAMESPACE}_PRODUTOS_GET`;
const PRODUTOS_GET_SUCCESS = `${NAMESPACE}_PRODUTOS_GET_SUCCESS`;
const PRODUTOS_GET_FAIL = `${NAMESPACE}_PRODUTOS_GET_FAIL`;

export const actions = {
  PRODUTOS_GET,
  PRODUTOS_GET_SUCCESS,
  PRODUTOS_GET_FAIL,
};

export const actionGetProdutos = () => ({
  type: actions.PRODUTOS_GET,
});

export const actionGetProdutosSuccess = produtos => ({
  type: actions.PRODUTOS_GET_SUCCESS,
  payload: {
    produtos,
  },
});

export const actionGetProdutosFail = error => ({
  type: actions.PRODUTOS_GET_FAIL,
  payload: {
    error,
  },
});

export default actions;
