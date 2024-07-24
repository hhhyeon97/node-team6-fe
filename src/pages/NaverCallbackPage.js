import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingText from '../component/LoadingText';
import { userActions } from '../action/userAction';

const NaverCallbackPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const loginSuccess = useSelector((state) => state.user.loading);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && state) {
      dispatch(userActions.loginWithNaver(code, state));
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

export default NaverCallbackPage;
