import api from '../utils/api';
import * as types from '../constants/user.constants';

const registerUser =
  ({ email, name, password, contact }, navigate) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.REGISTER_USER_REQUEST });
      const response = await api.post('/user', {
        email,
        name,
        password,
        contact,
      });
      if (response.status !== 200) throw new Error(response.error);
      dispatch({ type: types.REGISTER_USER_SUCCESS });
      alert('회원가입을 완료하였습니다! ');
      navigate('/login');
    } catch (error) {
      dispatch({ type: types.REGISTER_USER_FAIL, payload: error.error });
      console.log('test', error);
      //   alert('회원가입에 실패하였습니다.');
    }
  };

const loginWithEmail =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.LOGIN_REQUEST });
      const response = await api.post('/auth/login', { email, password });
      if (response.status !== 200) throw new Error(response.error);
      localStorage.setItem('token', response.data.token);
      dispatch({ type: types.LOGIN_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: types.LOGIN_FAIL, payload: error.error });
    }
  };

const loginWithToken = () => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_WITH_TOKEN_REQUEST });
    const response = await api.get('/user/me');
    if (response.status !== 200) throw new Error(response.error);
    console.log('응답', response);
    dispatch({
      type: types.LOGIN_WITH_TOKEN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: types.LOGIN_WITH_TOKEN_FAIL });
    dispatch(logout());
  }
};

const loginWithGoogle = (accessToken) => async (dispatch) => {
  try {
    dispatch({ type: types.GOOGLE_LOGIN_REQUEST });
    const response = await api.post('/auth/google', { token: accessToken });
    if (response.status !== 200) throw new Error(response.error);
    localStorage.setItem('token', response.data.token);
    dispatch({ type: types.GOOGLE_LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.GOOGLE_LOGIN_FAIL, payload: error.error });
  }
};

const loginWithKakao = (token) => async (dispatch) => {
  try {
    dispatch({ type: types.KAKAO_LOGIN_REQUEST });
    console.log('test 1');
    const response = await api.post('/auth/kakao', { token });
    console.log('test 2');
    if (response.status !== 200) throw new Error(response.error);
    console.log('test 3');
    localStorage.setItem('token', response.data.token);
    dispatch({ type: types.KAKAO_LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: types.KAKAO_LOGIN_FAIL,
      payload: error.error,
    });
  }
};

const loginWithKakaoCode = (code, navigate) => async (dispatch) => {
  console.log('인가', code);
  try {
    dispatch({ type: types.KAKAO_LOGIN_REQUEST });
    console.log('testtttttttt');
    const response = await api.post('/auth/kakao/code', { code });
    console.log('testtttttttt', response);
    if (response.status !== 200) throw new Error(response.error);
    localStorage.setItem('token', response.data.token);
    dispatch({ type: types.KAKAO_LOGIN_SUCCESS, payload: response.data });
    console.log('testtttttttt');
    navigate('/');
  } catch (error) {
    dispatch({ type: types.KAKAO_LOGIN_FAIL, payload: error.error });
    console.log('testtttttttt');
  }
};

const logout = () => async (dispatch) => {
  dispatch({ type: types.LOGOUT });
  localStorage.removeItem('token');
};

// 회원 리스트 가져오기 (admin)
const getUserList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_USER_LIST_REQUEST });
    const params = { ...query };
    const response = await api.get('/user', { params });
    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.GET_USER_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_USER_LIST_FAIL, payload: error.error });
  }
};

// 회원 레벨 수정하기 (admin)
const updateUserLevel = (id, level, setSearchQuery) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_LEVEL_REQUEST });
    const response = await api.put(`/user/${id}`, { level });
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ type: types.UPDATE_LEVEL_SUCCESS });
    // 수정 반영 위해 다시 productList 전체 갖고 오기
    dispatch(getUserList({ page: 1, name: '' }));
    setSearchQuery({ page: 1, name: '' });
  } catch (error) {
    dispatch({ type: types.UPDATE_LEVEL_FAIL, payload: error.error });
  }
};

export const resetError = () => ({
  type: types.RESET_ERROR,
});

export const userActions = {
  registerUser,
  resetError,
  loginWithEmail,
  loginWithToken,
  loginWithGoogle,
  logout,
  getUserList,
  loginWithKakao,
  loginWithKakaoCode,
  updateUserLevel,
};
