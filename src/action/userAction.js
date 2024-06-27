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

// 비밀번호 재발급 요청
const forgotPassword =
  ({ email }, navigate) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.FORGOT_PASSWORD_REQUEST });
      const response = await api.post('/password/forgot-password', { email });
      if (response.status !== 200) throw new Error(response.error);
      dispatch({ type: types.FORGOT_PASSWORD_SUCCESS });
      alert('비밀번호 재설정 이메일이 발송되었습니다 !');
      navigate('/');
    } catch (error) {
      dispatch({ type: types.FORGOT_PASSWORD_FAIL, payload: error.error });
    }
  };
const resetPassword =
  ({ password, token }, navigate) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.RESET_PASSWORD_REQUEST });
      const response = await api.post(`/password/reset-password/${token}`, {
        password,
      });
      if (response.status !== 200) throw new Error(response.error);
      dispatch({ type: types.RESET_PASSWORD_SUCCESS });
      alert('새 비밀번호가 설정되었습니다!');
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      dispatch({ type: types.RESET_PASSWORD_FAIL, payload: errorMessage });
      alert('토큰이 만료되었습니다.\n비밀번호 재설정 링크를 다시 받아주세요.');
      navigate('/find-password');
    }
  };

// 비밀번호 재설정 토큰 만료 체크
// const checkResetToken = (token) => async (dispatch) => {
//   try {
//     dispatch({ type: types.CHECK_RESET_TOKEN_REQUEST });
//     const response = await api.get(`/password/check-reset-token/${token}`);
//     if (response.status !== 200) throw new Error(response.error);
//     dispatch({ type: types.CHECK_RESET_TOKEN_SUCCESS });
//   } catch (error) {
//     const errorMessage = error.response?.data?.error || error.message;
//     dispatch({ type: types.CHECK_RESET_TOKEN_FAIL, payload: errorMessage });
//   }
// };

// 유저 정보 가져오기
const getUser = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_USER_REQUEST });
    const response = await api.get('/user/me');
    console.log('rrr', response.data);
    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.GET_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_USER_FAIL, payload: error.error });
  }
};

// 회원 정보 수정하기
const editUser = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_USER_REQUEST });
    const response = await api.put('/user/me', formData);
    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.EDIT_USER_SUCCESS,
      payload: response.data,
    });
    navigate('/mypage/reservations/by-date');
  } catch (error) {
    dispatch({ type: types.EDIT_USER_FAIL, payload: error.error });
  }
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

const changePassword =
  (currentPassword, newPassword, navigate) => async (dispatch) => {
    try {
      dispatch({ type: types.USER_CHANGE_PASSWORD_REQUEST });
      const response = await api.put('/password/change-password', {
        currentPassword,
        newPassword,
      });
      if (response.status !== 200) throw new Error(response.error);
      dispatch({ type: types.USER_CHANGE_PASSWORD_SUCCESS });
      alert('비밀번호 변경이 완료되었습니다!\n재로그인 후 이용해주세요.');
      navigate('/login');
    } catch (error) {
      dispatch({
        type: types.USER_CHANGE_PASSWORD_FAIL,
        payload: error.error,
      });
    }
  };

  // [ 회원 탈퇴 ]
  const deleteUser = (id, navigate) => async (dispatch) => {
    try{
      dispatch({ type: types.DELETE_USER_REQUEST });
      const response = await api.delete(`/user/me/${id}`);
      if (response.status !== 200) throw new Error(response.error);
      dispatch({ type: types.DELETE_USER_SUCCESS });
      alert('회원탈퇴가 완료되었습니다.');
      navigate('/');
    }catch(error){
      dispatch({ type: types.DELETE_USER_FAIL });
    }
  }

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
  getUser,
  editUser,
  loginWithKakao,
  loginWithKakaoCode,
  updateUserLevel,
  forgotPassword,
  resetPassword,
  changePassword,
  deleteUser
};
