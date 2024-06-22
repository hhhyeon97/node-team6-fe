import React from 'react';
import KakaoLogin from 'react-kakao-login';
import { userActions } from '../action/userAction';
import { useDispatch } from 'react-redux';

const SocialKakao = () => {
  const dispatch = useDispatch();

  const KAKAO_JAVA_SCRIPT_KEY = process.env.REACT_APP_KAKAO_JAVA_SCRIPT_KEY;
  const kakaoOnSuccess = async (data) => {
    console.log('데이터!', data);
    const idToken = data.response.access_token; // 엑세스 토큰 백엔드로 전달
    dispatch(userActions.loginWithKakao(idToken));
  };
  const kakaoOnFailure = (error) => {
    console.log(error);
  };
  return (
    <>
      <KakaoLogin
        token={KAKAO_JAVA_SCRIPT_KEY}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
      />
    </>
  );
};

export default SocialKakao;
