import React, { useEffect } from 'react';
import { userActions } from '../action/userAction';
import { useDispatch } from 'react-redux';
import '../style/css/LoginPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const SocialKakao = () => {
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <button className="custom_kakao_btn" onClick={handleKakaoLogin}>
      <FontAwesomeIcon icon={faComment} className="kakao_icon" />
    </button>
  );
};

export default SocialKakao;
