import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { userActions } from '../action/userAction';
import LoadingText from '../component/LoadingText';

const KakaoCallbackPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const loginSuccess = useSelector((state) => state.user.loading);

  useEffect(() => {
    console.log('하이이이이이이 나 콜백 페이지야 ');
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');

    if (code) {
      console.log('하이이이이이이 나 카카오 로그인 액션 부를게!!!! ');
      dispatch(userActions.loginWithKakao(code));
    }
  }, [location.search, dispatch]);

  useEffect(() => {
    if (!loginSuccess) {
      navigate('/');
    }
  }, [loginSuccess, navigate]);

  return (
    <div>
      <LoadingText />
    </div>
  );
};

export default KakaoCallbackPage;
