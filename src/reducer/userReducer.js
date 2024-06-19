import * as types from '../constants/user.constants';
const initialState = {
  loading: false,
  user: null,
  error: '',
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.REGISTER_USER_REQUEST:
      return { ...state, loading: true };
    case types.REGISTER_USER_FAIL:
      return { ...state, loading: false, error: payload };
    case types.RESET_ERROR:
      return {
        ...state,
        error: '',
      };
    default:
      return state;
  }
}

export default userReducer;
