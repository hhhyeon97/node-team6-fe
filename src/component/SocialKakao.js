import React, { useEffect } from 'react';
import { userActions } from '../action/userAction';
import { useDispatch } from 'react-redux';
import '../style/css/LoginPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const SocialKakao = () => {
  const dispatch = useDispatch();

  const handleKakaoLogin = () => {
    // 백엔드로 로그인 요청을 보냄
    dispatch(userActions.loginWithKakao());
  };

  return (
    <button className="custom_kakao_btn" onClick={handleKakaoLogin}>
      <FontAwesomeIcon icon={faComment} className="kakao_icon" />
    </button>
  );
};

export default SocialKakao;
