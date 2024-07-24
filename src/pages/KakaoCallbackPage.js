import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { userActions } from '../action/userAction';
import LoadingText from '../component/LoadingText';

const KakaoCallbackPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      dispatch(userActions.loginWithToken());
    }
  }, [location.search, dispatch]);

  useEffect(() => {
    if (!loading && user) {
      navigate('/');
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (error) {
      console.error('로그인 에러:', error);
      navigate('/login');
    }
  }, [error, navigate]);

  return (
    <div>
      <LoadingText />
    </div>
  );
};

export default KakaoCallbackPage;
