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

      dispatch({ type: types.LOGIN_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: types.LOGIN_FAIL, payload: error.error });
    }
  };

export const resetError = () => ({
  type: types.RESET_ERROR,
});

export const userActions = {
  registerUser,
  resetError,
  loginWithEmail,
};
