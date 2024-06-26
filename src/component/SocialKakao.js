import React, { useEffect } from 'react';
import KakaoLogin from 'react-kakao-login';
import { userActions } from '../action/userAction';
import { useDispatch } from 'react-redux';
import '../style/css/LoginPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const SocialKakao = () => {
  const dispatch = useDispatch();

  const KAKAO_JAVA_SCRIPT_KEY = process.env.REACT_APP_KAKAO_JAVA_SCRIPT_KEY;

  useEffect(() => {
    // Kakao SDK 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JAVA_SCRIPT_KEY);
    }
  }, [KAKAO_JAVA_SCRIPT_KEY]);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: function (authObj) {
        const idToken = authObj.access_token;
        dispatch(userActions.loginWithKakao(idToken));
      },
      fail: function (err) {
        console.error(err);
      },
    });
  };

  return (
    <button className="custom_kakao_btn" onClick={handleKakaoLogin}>
      <FontAwesomeIcon icon={faComment} className="kakao_icon" />
    </button>
  );
};

export default SocialKakao;
