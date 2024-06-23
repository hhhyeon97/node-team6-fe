import React from 'react';
const KakaoLogin = () => {
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const kakaoToken = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;
  const handleKakaoLogin = () => {
    window.location.href = kakaoToken;
  };
  return (
    <div>
      <a href={kakaoToken} onClick={handleKakaoLogin}>
        {/* 카카오 로그인 */}
      </a>
    </div>
  );
};

export default KakaoLogin;
