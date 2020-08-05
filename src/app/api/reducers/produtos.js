import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { fromJS } from 'immutable';
import { actions } from '../actions/produtos';

export const ProdutosPropTypes = ImmutablePropTypes.listOf(
  ImmutablePropTypes.contains({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  })
);

export const initialState = fromJS([]);

export default (state, action) => {
  if (action.type === actions.PRODUTOS_GET_SUCCESS) {
    const { produtos } = action.payload;
    return fromJS(produtos);
  }
  return state || initialState;
};
