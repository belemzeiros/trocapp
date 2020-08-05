import { fromJS } from 'immutable';

const initialState = fromJS({
  message: null,
});

export default (state, action) => {
  if (action.type.match(/ERROR/g)) {
    const { message, stack } = action.payload.error;
    return fromJS({ message, stack });
  }
  return state || initialState;
};
