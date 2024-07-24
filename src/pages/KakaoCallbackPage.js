import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { userActions } from '../action/userAction';

const KakaoCallbackPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const loginSuccess = useSelector((state) => state.user.loading); // 로그인 성공 여부를 상태에서 가져옴

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');

    if (code) {
      dispatch(userActions.loginWithKakao(code));
    }
  }, [location.search, dispatch]);

  useEffect(() => {
    if (!loginSuccess) {
      // 로그인 성공 시 메인 페이지로 리다이렉트
      navigate('/');
    }
  }, [loginSuccess, navigate]);

  return <div>Loading...</div>;
};

export default KakaoCallbackPage;
