import api from '../utils/api';
import * as types from '../constants/user.constants';
import { jwtDecode } from 'jwt-decode';

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

// const loginWithKakao = (code) => async (dispatch) => {
//   try {
//     dispatch({ type: types.KAKAO_LOGIN_REQUEST });
//     const response = await api.post('/auth/kakao', { code });
//     if (response.status !== 200) throw new Error(response.error);
//     localStorage.setItem('token', response.data.token);
//     dispatch({ type: types.KAKAO_LOGIN_SUCCESS, payload: response.data });
//   } catch (error) {
//     dispatch({ type: types.KAKAO_LOGIN_FAIL, payload: error.error });
//   }
// };

// const loginWithKakao = (code) => async (dispatch) => {
//   try {
//     dispatch({ type: types.KAKAO_LOGIN_REQUEST });

//     // 인가 코드를 백엔드로 전송
//     const response = await api.get(`/auth/kakao/callback?code=${code}`);

//     if (response.status !== 200) throw new Error(response.error);

//     localStorage.setItem('token', response.data.token);
//     dispatch({ type: types.KAKAO_LOGIN_SUCCESS, payload: response.data });

//     // 성공 상태를 전역 상태에 저장
//     // dispatch({ type: types.SET_LOGIN_SUCCESS });
//   } catch (error) {
//     dispatch({
//       type: types.KAKAO_LOGIN_FAIL,
//       payload: error.error,
//     });
//   }
// };

const setUserFromToken = (token) => (dispatch) => {
  const decoded = jwtDecode(token);
  dispatch({ type: types.LOGIN_SUCCESS, payload: { token, user: decoded } });
};

export const test = (token) => (dispatch) => {
  localStorage.setItem('token', token);
  dispatch({ type: types.LOGIN_SUCCESS, payload: token });
};

const loginWithKakao = (code) => async (dispatch) => {
  try {
    dispatch({ type: types.KAKAO_LOGIN_REQUEST });

    // 인가 코드를 백엔드로 전송
    console.log('안녕 액션 함수 시도한다 !!!');
    const response = await api.get(`/auth/kakao/callback?code=${code}`);

    if (response.status !== 200) throw new Error(response.error);

    localStorage.setItem('token', response.data.token);
    console.log('안녕 토큰 저장할게 !!!');
    dispatch({ type: types.KAKAO_LOGIN_SUCCESS, payload: response.data });

    // 성공 상태를 전역 상태에 저장
    // dispatch(setUserFromToken(response.data.token));
    // dispatch(test());
  } catch (error) {
    dispatch({
      type: types.KAKAO_LOGIN_FAIL,
      payload: error.error,
    });
  }
};

const loginWithNaver = (code, state) => async (dispatch) => {
  try {
    dispatch({ type: types.NAVER_LOGIN_REQUEST });
    // 네이버는 code, state를 보내주어야 함 !!
    const response = await api.get(
      `/auth/naver/callback?code=${code}&state=${state}`,
    );
    if (response.status !== 200) throw new Error(response.error);
    localStorage.setItem('token', response.data.token);
    dispatch({ type: types.NAVER_LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.NAVER_LOGIN_FAIL, payload: error.error });
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
      alert('새 비밀번호가 설정되었습니다!\n로그인 후 이용해 주세요.');
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      dispatch({ type: types.RESET_PASSWORD_FAIL, payload: errorMessage });
      alert('만료된 토큰입니다.\n비밀번호 재설정 링크를 다시 받아주세요.');
      navigate('/find-password');
    }
  };

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

// // 회원 정보 수정하기
// const editUser = (formData, navigate) => async (dispatch) => {
//   try {
//     dispatch({ type: types.EDIT_USER_REQUEST });
//     const response = await api.put('/user/me', formData);
//     if (response.status !== 200) throw new Error(response.error);
//     dispatch({
//       type: types.EDIT_USER_SUCCESS,
//       payload: response.data,
//     });
//     alert('회원 정보가 업데이트 되었습니다 !');
//     navigate('/mypage/edit-profile');
//   } catch (error) {
//     dispatch({ type: types.EDIT_USER_FAIL, payload: error.error });
//   }
// };

const editUser = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_USER_REQUEST });
    const response = await api.put('/user/me', formData);
    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.EDIT_USER_SUCCESS,
      payload: response.data,
    });
    alert('회원 정보가 수정 되었습니다.');
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

// 회원 비밀번호 확인
const verifyCurrentPassword =
  (currentPassword, navigate) => async (dispatch) => {
    try {
      dispatch({ type: types.VERIFY_CURRENT_PASSWORD_REQUEST });

      const response = await api.post('/password/verify-password', {
        currentPassword,
      });

      if (response.status !== 200) throw new Error(response.error);

      dispatch({ type: types.VERIFY_CURRENT_PASSWORD_SUCCESS });
      navigate('/mypage/change-password');
    } catch (error) {
      dispatch({
        type: types.VERIFY_CURRENT_PASSWORD_FAIL,
        payload: error.error,
      });
    }
  };
// 회원 비밀번호 변경
const changePassword = (newPassword, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.USER_CHANGE_PASSWORD_REQUEST });
    const response = await api.put('/password/change-password', {
      newPassword,
    });
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ type: types.USER_CHANGE_PASSWORD_SUCCESS });
    alert('비밀번호 변경이 완료되었습니다!\n재로그인 후 이용해주세요.');
    dispatch(logout());
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
  try {
    dispatch({ type: types.DELETE_USER_REQUEST });
    const response = await api.delete(`/user/me/${id}`);
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ type: types.DELETE_USER_SUCCESS });
    alert('회원탈퇴가 완료되었습니다.');
    navigate('/');
  } catch (error) {
    dispatch({ type: types.DELETE_USER_FAIL });
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
  getUser,
  editUser,
  loginWithKakao,
  setUserFromToken,
  updateUserLevel,
  forgotPassword,
  resetPassword,
  changePassword,
  deleteUser,
  verifyCurrentPassword,
  loginWithNaver,
};
