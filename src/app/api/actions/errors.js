import { NAMESPACE } from '../constants';

const saga = `${NAMESPACE}_SAGA_ERROR`;
const react = `${NAMESPACE}_REACT_ERROR`;

export const actions = {
  saga,
  react,
};

export const sagaErrors = (error, action) => ({
  type: actions.saga,
  payload: {
    error,
    action,
  },
});

export const mapDispatchToProps = dispatch => ({
  logErrorToStore: payload =>
    dispatch({
      type: actions.react,
      payload,
    }),
});

export default actions;
