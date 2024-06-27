import * as types from '../constants/user.constants';
const initialState = {
  loading: false,
  user: null,
  error: '',
  userList: [],
  totalPageNum: 1,
  selectedUser: null,
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.REGISTER_USER_REQUEST:
    case types.LOGIN_REQUEST:
    case types.LOGIN_WITH_TOKEN_REQUEST:
    case types.GET_USER_LIST_REQUEST:
    case types.GET_USER_REQUEST:
    case types.GOOGLE_LOGIN_REQUEST:
    case types.KAKAO_LOGIN_REQUEST:
    case types.UPDATE_LEVEL_REQUEST:
    case types.EDIT_USER_REQUEST:
    case types.FORGOT_PASSWORD_REQUEST:
    case types.RESET_PASSWORD_REQUEST:
    case types.CHECK_RESET_TOKEN_REQUEST:
    case types.USER_CHANGE_PASSWORD_REQUEST:
    case types.DELETE_USER_REQUEST:
      return { ...state, loading: true };
    case types.LOGIN_SUCCESS:
    case types.LOGIN_WITH_TOKEN_SUCCESS:
    case types.GOOGLE_LOGIN_SUCCESS:
    case types.KAKAO_LOGIN_SUCCESS:
    case types.GET_USER_SUCCESS:
    case types.EDIT_USER_SUCCESS:
      return { ...state, loading: false, user: payload.user, error: '' };
    case types.USER_CHANGE_PASSWORD_SUCCESS:
    case types.DELETE_USER_SUCCESS:
      return { loading: false, success: true, error: '' };
    case types.GET_USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        userList: payload.data,
        totalPageNum: payload.totalPageNum,
      };
    case types.UPDATE_LEVEL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      };

    case types.REGISTER_USER_FAIL:
    case types.LOGIN_FAIL:
    case types.LOGIN_WITH_TOKEN_FAIL:
    case types.GET_USER_LIST_FAIL:
    case types.GET_USER_FAIL:
    case types.GOOGLE_LOGIN_FAIL:
    case types.KAKAO_LOGIN_FAIL:
    case types.EDIT_USER_FAIL:
    case types.FORGOT_PASSWORD_FAIL:
    case types.USER_CHANGE_PASSWORD_FAIL:
      return { ...state, loading: false, error: payload };
    case types.RESET_PASSWORD_FAIL:
    case types.CHECK_RESET_TOKEN_FAIL:
      return {
        ...state,
        loading: false,
        error:
          payload ||
          '토큰이 만료되었습니다.\n비밀번호 재설정 링크를 다시 받아주세요.',
      };
    case types.RESET_ERROR:
      return {
        ...state,
        error: '',
      };
    case types.LOGOUT:
      return { ...state, user: null };
    case types.DELETE_USER_FAIL:
      return { ...state, user: null, loading: false, error: '' };
    case types.SET_SELECTED_USER:
      return { ...state, selectedUser: payload };
    default:
      return state;
  }
}

export default userReducer;
